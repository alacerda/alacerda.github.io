---
title: Descobrindo a Versão do Powershell
author: Alan Lacerda
date: 2020-08-31 00:00:00 -0300
categories: [Pentest,Tricks]
tags: [powershell]
math: true
---

Apresento aqui duas opções:

## 1. Lendo variável

```terminal
$PSVersionTable
```

### 2. Get-Host 
***
```terminal
Get-Host | Select-Object Version
```

Veja abaixo o resultado de ambos os comandos:

![Versao do Powershell](/assets/img/powershell_version.png)