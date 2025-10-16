@echo off
echo ========================================
echo DEPLOY PREPARATION - Frontend
echo ========================================
echo.

cd /d "C:\Users\NgocTV11\Desktop\AI_pp\kids-memories\source\frontend\kids-memories-web"

echo STEP 1: Running linter...
call npm run lint
echo [OK] Lint check complete
echo.

echo STEP 2: Building production...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed!
    pause
    exit /b 1
)
echo [OK] Build successful
echo.

echo STEP 3: Checking bundle size...
echo Build output in .next folder
dir .next /s
echo.

echo ========================================
echo Frontend Ready for Deploy!
echo ========================================
echo.
echo Next steps:
echo 1. Push to GitHub: git push origin main
echo 2. Deploy on Vercel
echo 3. Set environment variables:
echo    - NEXT_PUBLIC_API_URL
echo    - NEXT_PUBLIC_GOOGLE_CLIENT_ID
echo.

pause
