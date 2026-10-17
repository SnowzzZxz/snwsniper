<p align="center">
  <img src="https://raw.githubusercontent.com/SnowzzZxz/snwsniper/refs/heads/main/assets/SnowzzZxz.jpg" alt="SNWSNIPER Banner"/>
</p>

# SNWSNIPER

Snow Sniper (snwsniper) é uma ferramenta de linha de comando (CLI) para gerar e verificar nicknames disponíveis no Minecraft de forma rápida e fácil.

## Índice

- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Opções da CLI](#opções-da-cli)
- [Como funciona a verificação](#como-funciona-a-verificação)
- [Desenvolvimento](#desenvolvimento)
- [Estrutura de arquivos](#estrutura-de-arquivos)
- [Autor](#autor)
- [Licença](#licença)

## Funcionalidades

- Gera nicknames aleatórios com tamanho e prefixo personalizados.
- Opção de permitir ou não números no nickname.
- Verifica a disponibilidade em tempo real usando a API oficial da Mojang.
- Evita gerar nicknames duplicados na mesma pesquisa.
- Interface no terminal com saída colorida.

## Instalação

Instale o snwsniper globalmente via npm:

    npm install -g snwsniper

Ou use como dependência local no seu projeto:

    npm install snwsniper

## Uso

Para usar globalmente, rode o comando no seu terminal:

    snwsniper

A ferramenta vai te fazer algumas perguntas:

1. Tamanho do nickname (3 a 16 caracteres).
2. Prefixo (opcional).
3. Permitir números? (s/n).
4. Quantos nicknames gerar.

O programa exibirá os nicks em verde (disponíveis) e vermelho (indisponíveis). Ao final, ele mostra a lista completa de nomes disponíveis encontrados.

Você pode interromper o processo a qualquer momento com `Ctrl+C`.

## Opções da CLI

| Pergunta | O que faz | Exemplo |
|----------|-----------|---------|
| Tamanho | Define a quantidade de caracteres do nick | `5` |
| Prefixo | Força o nick a começar com essa palavra | `snow` |
| Números? | Define se pode usar números | `s` ou `n` |
| Quantidade | Quantos nicks serão testados | `50` |

## Como funciona a verificação

A ferramenta consulta a API pública da Mojang em tempo real:

- **404:** O nick não existe e está disponível (verde).
- **200:** O nick já existe e está ocupado (vermelho).
- **429:** A API bloqueou por excesso de requisições. A ferramenta aguarda e tenta novamente de forma automática.

## Desenvolvimento

Para rodar o projeto localmente:

1. Clone o repositório:
    git clone https://github.com/SnowzzZxz/snwsniper.git
    cd snwsniper

2. Instale as dependências:
    npm install

3. Rode em modo de desenvolvimento:
    npm run dev

4. Para compilar:
    npm run build

## Estrutura de arquivos

    snwsniper/
    ├── assets/
    │   └── SnowzzZxz.jpg       # Banner do projeto
    ├── src/
    │   └── index.ts            # Código fonte principal
    ├── .gitignore
    ├── LICENSE
    ├── README.md
    ├── package.json
    └── tsconfig.json

## Autor

**SnowzzZxz** — [github.com/SnowzzZxz](https://github.com/SnowzzZxz)

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
