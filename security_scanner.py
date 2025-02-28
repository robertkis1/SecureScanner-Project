import requests
import re
import ssl
import socket
from urllib.parse import urlparse, urljoin
from concurrent.futures import ThreadPoolExecutor
from typing import List, Dict, Any

class SecurityScanner:
    def __init__(self, target_url: str):
        self.target_url = target_url
        self.results = []
        self.session = requests.Session()
        # Use a custom User-Agent to identify our scanner
        self.session.headers = {
            'User-Agent': 'SecurityScanner/1.0 (Security Testing)'
        }

    def run_scan(self) -> List[Dict[str, Any]]:
        """Run all security checks and return results"""
        try:
            # Run all security checks
            self.check_ssl_tls()
            self.check_security_headers()
            self.check_xss_vulnerabilities()
            self.check_sql_injection()
            self.check_open_ports()
            self.check_information_disclosure()
            
            return self.results
        except Exception as e:
            self.add_result(
                'Error',
                'critical',
                f'Scan failed: {str(e)}',
                'Verify target accessibility and try again'
            )
            return self.results

    def add_result(self, check_type: str, severity: str, description: str, recommendation: str):
        """Add a result to the findings list"""
        self.results.append({
            'type': check_type,
            'severity': severity,
            'description': description,
            'recommendation': recommendation
        })

    def check_ssl_tls(self):
        """Check SSL/TLS configuration"""
        try:
            hostname = urlparse(self.target_url).hostname
            context = ssl.create_default_context()
            with socket.create_connection((hostname, 443)) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    cert = ssock.getpeercert()
                    
                    # Check SSL version
                    if ssock.version() < ssl.TLSVersion.TLSv1_2:
                        self.add_result(
                            'SSL/TLS',
                            'high',
                            'Outdated SSL/TLS version detected',
                            'Upgrade to TLS 1.2 or higher'
                        )
                    
                    # Check certificate expiration
                    if not cert.get('notAfter'):
                        self.add_result(
                            'SSL/TLS',
                            'high',
                            'Invalid SSL certificate',
                            'Install a valid SSL certificate'
                        )

        except ssl.SSLError:
            self.add_result(
                'SSL/TLS',
                'critical',
                'SSL/TLS configuration error',
                'Verify SSL/TLS configuration and certificate validity'
            )
        except Exception as e:
            self.add_result(
                'SSL/TLS',
                'high',
                f'SSL/TLS check failed: {str(e)}',
                'Enable HTTPS with proper configuration'
            )

    def check_security_headers(self):
        """Check for security headers"""
        try:
            response = self.session.get(self.target_url)
            headers = response.headers

            security_headers = {
                'Strict-Transport-Security': 'Missing HSTS header',
                'X-Frame-Options': 'Missing clickjacking protection',
                'X-Content-Type-Options': 'Missing MIME-type protection',
                'Content-Security-Policy': 'Missing CSP header',
                'X-XSS-Protection': 'Missing XSS protection header'
            }

            for header, message in security_headers.items():
                if header not in headers:
                    self.add_result(
                        'Security Headers',
                        'medium',
                        message,
                        f'Add the {header} security header'
                    )

        except Exception as e:
            self.add_result(
                'Security Headers',
                'medium',
                f'Header check failed: {str(e)}',
                'Verify server configuration'
            )

    def check_xss_vulnerabilities(self):
        """Check for XSS vulnerabilities"""
        xss_payloads = [
            '<script>alert(1)</script>',
            '"><script>alert(1)</script>',
            '"><img src=x onerror=alert(1)>'
        ]

        try:
            # Test URL parameters
            parsed_url = urlparse(self.target_url)
            if parsed_url.query:
                params = dict(pair.split('=') for pair in parsed_url.query.split('&'))
                
                for param in params:
                    for payload in xss_payloads:
                        test_params = params.copy()
                        test_params[param] = payload
                        
                        response = self.session.get(self.target_url, params=test_params)
                        if payload in response.text:
                            self.add_result(
                                'XSS',
                                'high',
                                f'Potential XSS vulnerability in parameter: {param}',
                                'Implement input validation and output encoding'
                            )

        except Exception as e:
            self.add_result(
                'XSS',
                'medium',
                f'XSS check failed: {str(e)}',
                'Manually verify XSS protections'
            )

    def check_sql_injection(self):
        """Check for SQL injection vulnerabilities"""
        sql_payloads = [
            "' OR '1'='1",
            "1' OR '1'='1",
            "1; DROP TABLE users--"
        ]

        try:
            parsed_url = urlparse(self.target_url)
            if parsed_url.query:
                params = dict(pair.split('=') for pair in parsed_url.query.split('&'))
                
                for param in params:
                    for payload in sql_payloads:
                        test_params = params.copy()
                        test_params[param] = payload
                        
                        response = self.session.get(self.target_url, params=test_params)
                        
                        # Look for SQL error messages
                        sql_errors = [
                            'sql syntax',
                            'mysql_fetch',
                            'ORA-',
                            'SQL Server',
                            'PostgreSQL'
                        ]
                        
                        for error in sql_errors:
                            if error.lower() in response.text.lower():
                                self.add_result(
                                    'SQL Injection',
                                    'critical',
                                    f'Potential SQL injection in parameter: {param}',
                                    'Use parameterized queries and input validation'
                                )

        except Exception as e:
            self.add_result(
                'SQL Injection',
                'medium',
                f'SQL injection check failed: {str(e)}',
                'Manually verify SQL injection protections'
            )

    def check_open_ports(self):
        """Check for open ports"""
        common_ports = [21, 22, 23, 25, 53, 80, 443, 445, 3306, 3389, 5432, 8080]
        
        try:
            hostname = urlparse(self.target_url).hostname
            open_ports = []
            
            def check_port(port):
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(1)
                result = sock.connect_ex((hostname, port))
                sock.close()
                if result == 0:
                    open_ports.append(port)

            # Use ThreadPoolExecutor for faster port scanning
            with ThreadPoolExecutor(max_workers=10) as executor:
                executor.map(check_port, common_ports)

            if open_ports:
                self.add_result(
                    'Open Ports',
                    'medium',
                    f'Open ports detected: {", ".join(map(str, open_ports))}',
                    'Close unnecessary ports and restrict access'
                )

        except Exception as e:
            self.add_result(
                'Open Ports',
                'low',
                f'Port scan failed: {str(e)}',
                'Manually verify open ports'
            )

    def check_information_disclosure(self):
        """Check for information disclosure"""
        try:
            response = self.session.get(self.target_url)
            
            # Check for version information in headers
            server_header = response.headers.get('Server', '')
            powered_by = response.headers.get('X-Powered-By', '')
            
            if server_header:
                self.add_result(
                    'Information Disclosure',
                    'low',
                    f'Server information disclosed: {server_header}',
                    'Remove or modify server version headers'
                )
            
            if powered_by:
                self.add_result(
                    'Information Disclosure',
                    'low',
                    f'Technology stack disclosed: {powered_by}',
                    'Remove X-Powered-By header'
                )
            
            # Check for common sensitive patterns
            patterns = {
                r'\b[\w\.-]+@[\w\.-]+\.\w{2,}\b': 'email addresses',
                r'\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b': 'credit card numbers',
                r'\b\d{3}[-.]?\d{3}[-.]?\d{4}\b': 'social security numbers'
            }
            
            for pattern, data_type in patterns.items():
                if re.search(pattern, response.text):
                    self.add_result(
                        'Information Disclosure',
                        'high',
                        f'Potential {data_type} exposed',
                        'Remove or mask sensitive data'
                    )

        except Exception as e:
            self.add_result(
                'Information Disclosure',
                'low',
                f'Information disclosure check failed: {str(e)}',
                'Manually verify information disclosure'
            )

def main():
    """Main function to run the scanner"""
    import sys
    import json
    
    if len(sys.argv) != 2:
        print("Usage: python security_scanner.py <target_url>")
        sys.exit(1)
    
    target_url = sys.argv[1]
    scanner = SecurityScanner(target_url)
    results = scanner.run_scan()
    
    # Print results in JSON format
    print(json.dumps(results, indent=2))

if __name__ == "__main__":
    main()