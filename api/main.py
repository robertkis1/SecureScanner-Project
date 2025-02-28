from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, HttpUrl
from typing import Dict, List, Optional, Any
from security_scanner import SecurityScanner

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScanConfig(BaseModel):
    checks: Dict[str, bool]
    options: Dict[str, Any]

class ScanRequest(BaseModel):
    url: HttpUrl
    scan_type: str
    config: Optional[ScanConfig] = None

@app.post("/api/scan")
async def perform_scan(request: ScanRequest):
    try:
        scanner = SecurityScanner(str(request.url))
        
        if request.scan_type == "custom" and request.config:
            # Configure scanner based on custom settings
            scanner.configure(request.config.dict())
            
        results = scanner.run_scan()
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)