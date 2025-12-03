@echo off
REM Script para setup e execução do cliente Python
REM Execute como: setup.bat

echo.
echo ================================================================================
echo  MUSIC STREAMING CLIENT - PYTHON SETUP
echo ================================================================================
echo.

REM Verificar Python
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python nao encontrado. Instale Python 3.8 ou superior.
    pause
    exit /b 1
)

echo [OK] Python encontrado
echo.

REM Menu
:menu
echo ================================================================================
echo  MENU - O que deseja fazer?
echo ================================================================================
echo.
echo 1. Instalar dependencias (pip install -r requirements.txt)
echo 2. Compilar proto files (grpc_tools.protoc)
echo 3. Setup completo (1 + 2)
echo 4. Executar exemplos (python examples.py)
echo 5. Executar teste de carga (python load_test.py)
echo 6. Usar interface interativa (python cli.py)
echo 0. Sair
echo.

set /p choice="Escolha uma opcao [0-6]: "

if "%choice%"=="1" goto install_deps
if "%choice%"=="2" goto compile_proto
if "%choice%"=="3" goto full_setup
if "%choice%"=="4" goto run_examples
if "%choice%"=="5" goto run_load_test
if "%choice%"=="6" goto run_cli
if "%choice%"=="0" goto exit
echo Invalid option
goto menu

:install_deps
echo.
echo [Installing] Dependencias...
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Falha ao instalar dependencias
    pause
    goto menu
)
echo [OK] Dependencias instaladas
pause
goto menu

:compile_proto
echo.
echo [Compiling] Proto files...
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
if %errorlevel% neq 0 (
    echo [ERROR] Falha ao compilar proto files
    pause
    goto menu
)
echo [OK] Proto files compilados
pause
goto menu

:full_setup
echo.
echo [Installing] Dependencias...
python -m pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo [ERROR] Falha ao instalar dependencias
    pause
    goto menu
)
echo [OK] Dependencias instaladas
echo.
echo [Compiling] Proto files...
python -m grpc_tools.protoc -I../../proto --python_out=. --pyi_out=. --grpc_python_out=. ../../proto/*.proto
if %errorlevel% neq 0 (
    echo [WARNING] Falha ao compilar proto files (opcional)
)
echo [OK] Setup completo
pause
goto menu

:run_examples
echo.
python examples.py
pause
goto menu

:run_load_test
echo.
python load_test.py
pause
goto menu

:run_cli
echo.
python cli.py
pause
goto menu

:exit
echo.
echo Ate logo!
exit /b 0
