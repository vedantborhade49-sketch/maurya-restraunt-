@echo off
echo Moving static assets to public directory...
mkdir public 2>nul
move "hero video.mp4" public\
move "morya-logo.png" public\
echo Done.
pause
