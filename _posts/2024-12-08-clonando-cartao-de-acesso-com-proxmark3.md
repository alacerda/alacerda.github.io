---
title: Clonando Cartão de Acesso com o ProxMark3
author: Alan Lacerda
date: 2024-12-08 00:00:00 -0300
categories: [RedTeam, RFID]
tags: [rfid, redteam]
math: true
---

## Instruções Gerais
Tudo começou quando eu precisei de mais de um cartão de acesso ao meu prédio pois somos em
dois, mas recebi apenas um cartão. Meu primeiro passou foi clonar com o `Flipper Zero` e usá-lo
quando necessário. Mas ficar carregando o `Flipper Zero` para cima e para baixo no bolso da calça
não é tão prático por isso decidir clonar para um cartão mesmo que é mais fácil de carregar.

Aprender a usar o ProxMark3 e clonar foi mais difícil do que possa parecer nesse breve post.
O primeiro passo é ler o conteúdo da origem que, em meu caso, foi um fob e nao um cartão,
em seguida garantir que o cartao de destino esteja vazio e, só depois, gravar o conteúdo
para o destino.

Deixo o passo-a-passo abaixo mais como um lembrete/notas para quando eu precisar fazer isso novamente.

## Passos a passo
 - Colocar o fob em cima do ProxMark3
 - Ler o conteúdo do cartão com o comando ```lf search```
 - Copie a resposta em um bloco de notas pois iremos precisar dele para escrever no outro cartao.
   - Copie principalmente os dados de: `Len`, `FC` e `Card`
 - Remova o fob de sob o ProxMark3 e coloque o cartão que irá receber os dados clonados.
 - Certifique-se de que o cartão é detectado pelo ProxMark3 com o comando: ```lf t55xx detect```
 - Limpe qualquer dado contido no cartão de destino com o comando: ```lf t55xx wipe```
 - Escreva os dados no cartão de destino com o comando: ```lf [awid|hid] clone --fmt <LEN> --fc <FC> --cn <Card>```

Em meu caso, o fob original me retornou dados como o abaixo:

`[+] AWID - len: 50 FC: 2349 Card: 321123 - Wiegand: 1f4000901636, Raw: 0blablabla121bal`

Por isso usei o comando ```lf awid clone```


