# Jogo de Damas

# Introdução

Este é um jogo muito famoso, conhecido por diversas pessoas. Apesar de ser um jogo simples, implementar este jogo não é uma tarefa trivial.
Neste projeto estou fazendo um experimento para testar meus conhecimentos de programação, que consistirá em duas partes:
1) **Sem arquitetura:** Implementarei o jogo pensando em sua arquitetura enquanto programo.
2) **Com arquitetura:** Pensarei na arquitetura antes e depois farei os códigos.

# Executar

Execute o programa no estado atual neste [link](edupinhata.github.io/proj/programandoemminutos/07.damas/damas-completo.html).

# Análise da implementação

## 1. Sem arquitetura

A princípio a ideia foi criar um classe tabuleiro, em que eu teria uma matrix que guardaria instâncias de objetos da classe TabuleiroSquare, os quais definem o tamanho e cor dos quadrados que vão compor os tabuleiros.
A classe Tabuleiro também é responsável por desenhar as peças. A cada momento, instâncias de objetos da classe Peca são criadas. Tanto a classe TabuleiroSquare e Peca tem funções `draw()`, que vão constantemente desehar as peças nos estados presentes.

## 2. Com arquitetura


