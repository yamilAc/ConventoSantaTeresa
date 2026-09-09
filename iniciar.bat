@echo off
echo ======================================
echo   Convento Santa Teresa - Web App
echo ======================================
echo.
echo Iniciando Backend (puerto 3001)...
start "Backend - Convento Santa Teresa" cmd /k "cd /d "%~dp0backend" && npm run dev"
timeout /t 2 /nobreak > nul

echo Iniciando Frontend (puerto 3000)...
start "Frontend - Convento Santa Teresa" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 /nobreak > nul

echo.
echo ======================================
echo  Sitio publico:  http://localhost:3000
echo  Panel admin:    http://localhost:3000/admin/login
echo ======================================
echo.
pause
