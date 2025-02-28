import { useState } from 'react';
import { SecurityScanner, ScanReport, ScanConfig } from '../services/SecurityScanner';

export const useSecurityScan = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<ScanReport | null>(null);

  const startScan = async (url: string, scanType: string, config?: ScanConfig) => {
    try {
      setScanning(true);
      setError(null);
      
      const scanner = new SecurityScanner(url, scanType, config);
      const scanReport = await scanner.performScan();
      
      setReport(scanReport);
      return scanReport;
    } catch (err: any) {
      setError(err.message || 'Failed to complete security scan');
      throw err;
    } finally {
      setScanning(false);
    }
  };

  return {
    scanning,
    error,
    report,
    startScan
  };
};