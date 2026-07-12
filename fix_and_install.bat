@echo off
echo Installing dependencies...
npm install --legacy-peer-deps
echo.
echo Running development server...
npm run dev
pause
