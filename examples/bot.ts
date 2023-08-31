import { BaileysClass } from '../lib/baileys.js';

const botBaileys = new BaileysClass({});

botBaileys.on('auth_failure', async (error) => console.log("ERROR BOT: ", error));
botBaileys.on('qr', (qr) => console.log("NEW QR CODE: ", qr));
botBaileys.on('ready', async () => console.log('BOT PRONTO AMOR'))

let awaitingResponse = false;

botBaileys.on('message', async (message) => {
    if (message.body === 'menu') {
        console.log(message)
        await botBaileys.sendPoll(message.from, 'ClassicX é Lindo e Maravilhoso ?', {
            options: ['obvio', 'deus grego', 'claro', 'aiaiai'],
            multiselect: false
        });
        awaitingResponse = true;
    } else {
        const command = message.body.toLowerCase().trim();
        switch (command) {
            case 'obvio':
                await botBaileys.sendText(message.from, 'Obvio que é obvio ?');
                break;
            case 'comandokk':
                await botBaileys.sendText(message.from, 'Agora Sim é Um Comando ?');
                break;    
            case 'deus grego':
                await botBaileys.sendMedia(message.from, 'https://www.w3schools.com/w3css/img_lights.jpg', 'Deus Mesopotameo');
                break;
            case 'file':
                await botBaileys.sendFile(message.from, 'https://github.com/pedrazadixon/sample-files/raw/main/sample_pdf.pdf');
                break;
            case 'sticker':
                await botBaileys.sendSticker(message.from, 'https://gifimgs.com/animations/anime/dragon-ball-z/Goku/goku_34.gif', { pack: 'User', author: 'Me' });
                break;
            default:
                await botBaileys.sendText(message.from, 'Sorry, I did not understand that command. Please select an option from the poll.');
                break;
        }
        awaitingResponse = false;
    }
});



