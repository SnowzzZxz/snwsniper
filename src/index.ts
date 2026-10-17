#!/usr/bin/env node
// Este arquivo faz parte do projeto Snow Sniper.

import readline from 'readline';
import colors from 'colors/safe';

const MAX_RETRIES = 5;

const getNickname = async (nickname: string, attempt = 0): Promise<'valid' | 'invalid' | 'error'> => {
    const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${nickname}`, {
        method: 'GET'
    });

    if (response.status === 404) {
        console.log(colors.green(`✔ ${nickname}`));
        return 'valid';
    }

    if (response.ok) {
        console.log(colors.red(`✖ ${nickname}`));
        return 'invalid';
    }

    if (response.status === 429 && attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000 * 2 ** attempt));
        return getNickname(nickname, attempt + 1);
    }

    console.log(colors.yellow(`⚠ ${nickname} — HTTP ${response.status}`));
    return 'error';
};

const randomCharacter = (length: number, allowNumber: boolean) => {
    const characters = !allowNumber ? 'abcdefghijklmnopqrstuvwxyz_' : 'abcdefghijklmnopqrstuvwxyz0123456789_';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    return result;
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(colors.red(`

███████╗███╗   ██╗██╗    ██╗    ███████╗███╗   ██╗██╗██████╗ ███████╗██████╗ 
██╔════╝████╗  ██║██║    ██║    ██╔════╝████╗  ██║██║██╔══██╗██╔════╝██╔══██╗
███████╗██╔██╗ ██║██║ █╗ ██║    ███████╗██╔██╗ ██║██║██████╔╝█████╗  ██████╔╝
╚════██║██║╚██╗██║██║███╗██║    ╚════██║██║╚██╗██║██║██╔═══╝ ██╔══╝  ██╔══██╗
███████║██║ ╚████║╚███╔███╔╝    ███████║██║ ╚████║██║██║     ███████╗██║  ██║
╚══════╝╚═╝  ╚═══╝ ╚══╝╚══╝     ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝

`));
console.log(colors.bold(colors.red('Desenvolvido por SnowzzZxz | https://github.com/SnowzzZxz \n')));

function askLength() {
    rl.question(colors.red('❖ Insira a quantidade de caracteres do nickname: \n'), (input: string) => {
        const length = Number(input);
        if (!Number.isInteger(length) || length < 3 || length > 16) {
            console.log('Por favor, insira um número válido maior ou igual a 3 e menor ou igual a 16.');
            askLength();
            return;
        }
        askPrefix(length);
    });
}

function askPrefix(length: number) {
    rl.question(colors.red('❖ Insira o prefixo do nickname (deixe vazio se não houver): \n'), (prefix: string) => {
        if (prefix.length >= length) {
            console.log('O prefixo não pode ser maior ou igual que o comprimento total do nickname.');
            askPrefix(length);
            return;
        }
        askAllowNumbers(length, prefix);
    });
}

function askAllowNumbers(length: number, prefix: string) {
    rl.question(colors.red('❖ Deseja permitir números no nickname? (s/n): \n'), (answer: string) => {
        if (answer.toLowerCase() !== 's' && answer.toLowerCase() !== 'n') {
            console.log('Por favor, responda com "s" para sim ou "n" para não.');
            askAllowNumbers(length, prefix);
            return;
        }
        const allowNumbers = answer.toLowerCase() === 's';
        askCount(length, prefix, allowNumbers);
    });
}

function askCount(length: number, prefix: string, allowNumbers: boolean) {
    rl.question(colors.red('❖ Quantidade de nicknames a serem gerados: \n'), async (countInput: string) => {
        const count = Number(countInput);
        const charsAllowed = allowNumbers ? 'abcdefghijklmnopqrstuvwxyz0123456789_' : 'abcdefghijklmnopqrstuvwxyz_';

        if (!Number.isInteger(count) || count <= 0) {
            console.log('Por favor, insira um número válido maior que zero.');
            askCount(length, prefix, allowNumbers);
            return;
        }

        const remainingLength = length - prefix.length;
        const total = Math.pow(charsAllowed.length, remainingLength);

        if (count > total) {
            console.log(colors.red(`Impossível gerar ${count} nicknames únicos com essas configurações.`));
            console.log(colors.yellow(`Máximo de combinações possíveis: ${total}`));
            rl.close();
            return;
        }

        const validNicknames: string[] = [];
        const nicknameSet = new Set<string>();

        while (nicknameSet.size < count) {
            const suffix = randomCharacter(remainingLength, allowNumbers);
            const nickname = prefix + suffix;
            if (nicknameSet.has(nickname)) continue;
            nicknameSet.add(nickname);

            const response = await getNickname(nickname)
                .catch(error => {
                    console.error(`Erro ao verificar o nickname ${nickname}:`, error);
                    return 'error' as const;
                });
            if (response === 'valid') validNicknames.push(nickname);
        }

        console.log(colors.bold(colors.yellow(`\nNicknames disponíveis encontrados (${validNicknames.length}):`)));
        if (validNicknames.length > 0) console.log(colors.green(validNicknames.join(', ')));
        rl.close();
    });
}

askLength();

rl.on('SIGINT', () => {
    rl.close();
    process.exit(0);
});
