@echo off
echo ========================================
echo Building Next.js Production Bundle
echo ========================================
echo.

cd /d "C:\Users\NgocTV11\Desktop\AI_pp\kids-memories\source\frontend\kids-memories-web"

echo Current directory: %CD%
echo.

echo Running: npm run build
echo.

call npm run build

echo.
echo ========================================
echo Build Complete!
echo ========================================
echo.

if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Build completed without errors
    echo.
    echo Next steps:
    echo 1. Run: npm run start
    echo 2. Open: http://localhost:3000
    echo 3. Verify page load times ^<1 second
) else (
    echo FAILED: Build encountered errors
    echo Check the output above for details
)

pause
