<p align="center">
  <img src="https://raw.githubusercontent.com/SnowzzZxz/snwsniper/refs/heads/main/assets/SnowzzZxz.jpg" alt="SNWSNIPER Banner"/>
</p>

# 🏹 SNWSNIPER — Gerador e Verificador de Nicknames

O **SNWSNIPER** é uma ferramenta de linha de comando (CLI) desenvolvida para facilitar a busca por nicknames disponíveis no Minecraft. Ele gera nomes aleatórios com base nas suas preferências e consulta a API oficial da Mojang em tempo real para verificar se o nick está livre ou já foi registrado.

---

## 📋 Índice

- [Funcionalidades](#-funcionalidades)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Como usar](#-como-usar)
- [Opções da CLI](#-opções-da-cli)
- [Como funciona a verificação](#-como-funciona-a-verificação)
- [Como rodar localmente (Desenvolvimento)](#-como-rodar-localmente-desenvolvimento)
- [Estrutura de arquivos](#-estrutura-de-arquivos)
- [Solução de problemas](#-solução-de-problemas)

---

## ✨ Funcionalidades

- **Geração Aleatória:** Cria nicknames aleatórios com o tamanho que você escolher (de 3 a 16 caracteres).
- **Prefixo Personalizado:** Você pode definir uma palavra inicial para o nick (ex: `Snow_`).
- **Opção de Números:** Escolha se os nicknames podem ou não conter números.
- **Verificação em Tempo Real:** Consulta a API oficial da Mojang para checar a disponibilidade.
- **Sem Duplicados:** O sistema garante que o mesmo nick não será gerado duas vezes na mesma busca.
- **Interface Colorida:** Saída no terminal amigável, com cores verde (disponível) e vermelho (indisponível).

---

## 🛠️ Pré-requisitos

Para usar o projeto, você precisará ter instalado na sua máquina:
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- NPM (já vem instalado com o Node.js)

---

## 📦 Instalação

Você pode instalar o SNWSNIPER globalmente no seu computador usando o NPM:

    npm install -g snwsniper

---

## 🚀 Como usar

Se você instalou globalmente, basta abrir o seu terminal (Prompt de Comando, PowerShell ou Terminal do Linux/Mac) e digitar:

    snwsniper

O programa fará algumas perguntas no terminal. Basta ir respondendo para gerar e checar os nicknames:
1. **Tamanho do nickname:** Digite um número de 3 a 16.
2. **Prefixo:** Digite algo (ex: `snow`) ou apenas aperte `Enter` se não quiser prefixo.
3. **Permitir números?** Digite `s` para sim ou `n` para não.
4. **Quantidade:** Quantos nicknames você deseja gerar e verificar?

O programa vai listar todos os nicks gerados e pintar de **verde** os que estão disponíveis, e de **vermelho** os que já estão em uso. No final, ele mostra a lista completa de nicks disponíveis que ele encontrou.

---

## ⚙️ Opções da CLI

O fluxo de perguntas segue a seguinte ordem:

| Pergunta | O que faz | Exemplo |
|----------|-----------|---------|
| Tamanho | Define quantas letras/números o nick terá | `5` |
| Prefixo | Força o nick a começar com essa palavra | `snow` |
| Números? | Define se pode usar `0-9` | `s` ou `n` |
| Quantidade | Quantos nicks o bot vai testar | `50` |

Você pode interromper o processo a qualquer momento pressionando `Ctrl + C`.

---

## 🔍 Como funciona a verificação

O SNWSNIPER não usa banco de dados local. Ele faz requisições em tempo real para a API pública da Mojang:

- **Requisição:** `GET https://api.mojang.com/users/profiles/minecraft/{nickname}`
- **Se retornar 404:** O nick **não existe** e está **disponível**. (Fica verde ✔)
- **Se retornar 200:** O nick **já existe** e está **ocupado**. (Fica vermelho ✖)
- **Se retornar 429:** A API da Mojang bloqueou por excesso de requisições. O bot aguarda um tempo e tenta novamente de forma automática.

---

## 💻 Como rodar localmente (Desenvolvimento)

Se você baixou o código fonte e quer rodar no seu computador para alterar algo:

1. Clone o repositório:
    git clone https://github.com/SnowzzZxz/snwsniper.git
    cd snwsniper

2. Instale as dependências:
    npm install

3. Rode em modo de desenvolvimento:
    npm run dev

4. Para compilar para a versão final (gerando a pasta `dist`):
    npm run build

---

## 📁 Estrutura de arquivos

    📦 snwsniper/
    ├── assets/
    │   └── SnowzzZxz.jpg       → Banner do projeto
    ├── src/
    │   └── index.ts            → Código fonte principal
    ├── .gitignore              → Arquivos ignorados pelo Git
    ├── LICENSE                 → Licença MIT
    ├── README.md               → Este arquivo
    ├── package.json            → Dependências e scripts
    └── tsconfig.json           → Configurações do TypeScript

---

## ❓ Solução de problemas

**Erro: "O nome do comando snwsniper não é reconhecido"**
Certifique-se de que a instalação global funcionou e que a pasta de binários do NPM está nas variáveis de ambiente do seu sistema. Tente rodar `npm install -g snwsniper` novamente.

**Muitos erros no terminal (HTTP 429)**
A API da Mojang tem um limite de requisições. Se você tentar gerar muitos nicknames (ex: mais de 200) de uma vez, a API pode bloquear temporariamente. Tente gerar menos quantidades por vez.

---

## 👤 Autor

**SnowzzZxz** 
- GitHub: [@SnowzzZxz](https://github.com/SnowzzZxz)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
