import { BaileysClass } from '../lib/baileys.js';

const botBaileys = new BaileysClass({});

botBaileys.on('auth_failure', async (error) => console.log("ERRO BOT: ", error));
botBaileys.on('qr', (qr) => console.log("UTILIZE O QR CODE ABAIXO PARA SE CONECTAR AO BOT\n: ", qr));
botBaileys.on('ready', async () => console.log('WANTED CC STORE BOT v1 - By ClassicX-O-BRABO\n\nBOT CONECTADO COM SUCESSO!'))

let awaitingResponse = false;

botBaileys.on('message', async (message) => {
    if (message.body === 'menu') {
        console.log(`Enviando Menu!\nUsuário: ${message.from}\n`);
    
        const saldoAtual = 0.00; // Defina o saldo atual conforme necessário
    
        const menuText = `Wanted Store\n\n◆ ━━━━❪✪❫━━━━ ◆\n❖ Seu número: ${(message.from.split('@'))[0]}\n❖ Saldo Atual: R$: ${saldoAtual}\n◆ ━━━━❪✪❫━━━━ ◆\n\nATENDIMENTO ON 24 HRS⏰\nGARANTIMOS LIVE E MELHOR PREÇO✅\nTODAS AS INFO SÃO TESTADAS✅\n\n🤖WANTED STORE A MELHOR STORE DA ATUALIDADE🤖\nQUALIDADE,PREÇO JUSTO E AGILIDADE`;
    
        await botBaileys.sendPoll(message.from, menuText, {
            options: ['ADICIONAR SALDO', 'COMPRAR INFO', 'FALAR COM O SUPORTE', 'SOBRE O BOT'],
            multiselect: false
        });
    
        awaitingResponse = true;
    }
    if (message.body === 'VOLTAR AO MENU') {
        console.log(`Voltando Ao menu...\nUsuário: ${message.from}\n`);
    
        const saldoAtual = 0.00; // Defina o saldo atual conforme necessário
    
        const menuText = `Wanted Store\n\n◆ ━━━━❪✪❫━━━━ ◆\n❖ Seu número: ${message.from}\n❖ Saldo Atual: R$: ${saldoAtual}\n◆ ━━━━❪✪❫━━━━ ◆\n\nATENDIMENTO ON 24 HRS⏰\nGARANTIMOS LIVE E MELHOR PREÇO✅\nTODAS AS INFO SÃO TESTADAS✅\n\n🤖WANTED STORE A MELHOR STORE DA ATUALIDADE🤖\nQUALIDADE,PREÇO JUSTO E AGILIDADE`;
    
        await botBaileys.sendPoll(message.from, menuText, {
            options: ['ADICIONAR SALDO', 'COMPRAR INFO', 'FALAR COM O SUPORTE', 'SOBRE O BOT'],
            multiselect: false
        });
    
        awaitingResponse = true;
    }    
    if (message.body === 'ADICIONAR SALDO') {
        console.log(`Indo ao menu de Adicionar Saldo...\nUsuário: ${message.from}\n`);
        const menuText = `MENU DE OPÇÕES DE PIX\n\nEscolha o valor do pix desejado para recarregar sua conta, ou digite um valor personalizado ao escolher a opção "Digite outro valor".`;
    
        await botBaileys.sendPoll(message.from, menuText, {
            options: ['ADICIONAR SALDO', 'COMPRAR INFO', 'FALAR COM O SUPORTE', 'SOBRE O BOT'],
            multiselect: false
        });
    
        awaitingResponse = true;
    } else {
        const command = message.body.toLowerCase().trim();
        //console.log(command)
        switch (command) {
            case 'adicionar pix00':
                await botBaileys.sendText(message.from, 'Obvio que é obvio ?');
                break;
            case 'comprar info':
                await botBaileys.sendText(message.from, 'Agora Sim é Um Comando ?');
                break;    
            case 'falar com o suporte':
                await botBaileys.sendMedia(message.from, 'https://www.w3schools.com/w3css/img_lights.jpg', 'Deus Mesopotameo');
                break;
            case 'sobre o bot':
                await botBaileys.sendFile(message.from, 'https://github.com/pedrazadixon/sample-files/raw/main/sample_pdf.pdf');
                break;
            case 'sticker':
                await botBaileys.sendSticker(message.from, 'https://gifimgs.com/animations/anime/dragon-ball-z/Goku/goku_34.gif', { pack: 'User', author: 'Me' });
                break;
        }
        awaitingResponse = false;
    }
});



