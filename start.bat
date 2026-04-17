@echo off
echo ================================================
echo      🏋️  TEAMBANKS - Servidor Local
echo ================================================
echo.

REM Verifica se o Python está instalado
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python não encontrado! Instale o Python para continuar.
    pause
    exit /b 1
)

echo ✅ Python encontrado
echo 🚀 Iniciando servidor...
echo.

REM Executa o main.py
python main.py

echo.
echo ================================================
echo      👋 Servidor encerrado!
echo ================================================
pause