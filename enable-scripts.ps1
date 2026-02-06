# Enable PowerShell Script Execution
# Run this command in PowerShell as Administrator

Write-Host "PowerShell Execution Policy Helper" -ForegroundColor Cyan
Write-Host "=" * 50 -ForegroundColor Cyan
Write-Host ""

# Check current policy
$currentPolicy = Get-ExecutionPolicy
Write-Host "Current execution policy: $currentPolicy" -ForegroundColor Yellow
Write-Host ""

Write-Host "To enable script execution, choose one of these options:" -ForegroundColor White
Write-Host ""
Write-Host "Option 1: Bypass for current session only (safest)" -ForegroundColor Green
Write-Host "  Run: Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process" -ForegroundColor Gray
Write-Host "  Then run: .\init-git.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 2: Allow scripts for current user (recommended)" -ForegroundColor Green
Write-Host "  Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser" -ForegroundColor Gray
Write-Host "  Then run: .\init-git.ps1" -ForegroundColor Gray
Write-Host ""
Write-Host "Option 3: Use manual commands (no script needed)" -ForegroundColor Green
Write-Host "  See: setup-git-manual.md" -ForegroundColor Gray
Write-Host ""
Write-Host "=" * 50 -ForegroundColor Cyan
