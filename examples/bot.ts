//BASE CODADA PELO ClassicX-O-BRABO - TODOS OS DIREITOS RESERVADOS!
//AVISO: ESTA BASE ESTÁ DESCRIPTOGRAFADA MAS AINDA SIM NÃO FOI CRIADA PRA SER EDITAVEL,SÓ EDITE SE SOUBER O QUE ESTÁ FAZENDO!
//QUALQUER ALTERAÇÃO NESTE ARQUIVO PODE QUEBRAR O BOT!
import { text } from 'stream/consumers';
import { BaileysClass } from '../lib/baileys.js';
import { Console } from 'console';
const puppeteer = require('puppeteer');

const botBaileys = new BaileysClass({});

botBaileys.on('auth_failure', async (error) => console.log("ERRO BOT: ", error));
botBaileys.on('qr', (qr) => console.log("UTILIZE O QR CODE ABAIXO PARA SE CONECTAR AO BOT\n: ", qr));
botBaileys.on('ready', async () => console.log('WANTED CC STORE BOT v1 - By ClassicX-O-BRABO\n\nBOT CONECTADO COM SUCESSO!'))

let awaitingResponse = false;

botBaileys.on('message', async (message) => {
    const useratual = `${(message.from.split('@'))[0]}`;
    const parametros = message.body.split(' ');
    const logsender = 'Usuário: ' + useratual;
    const logcomando = 'Comando: ' + parametros;
    const comandoprinc = parametros[0];
    const valorcomand = parametros[1];
    console.log(comandoprinc)
    console.log(valorcomand)
    console.log('Novo Comando!\n')
    console.log(logsender)
    console.log(logcomando)
// Função para verificar se o usuário existe no banco de dados
const verificarUsuario = async (logado) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navega até a URL desejada
    await page.goto('https://wanted-store.42web.io/dados/usuariosbot.json');

    // Obtém o conteúdo da página como JSON
    const content = await page.evaluate(() => {
        return fetch('https://wanted-store.42web.io/dados/usuariosbot.json')
            .then(response => response.json())
            .then(data => data);
    });

    let usuarioEncontrado = false;
    let usuarioInfo;

    // Itera pelos blocos no JSON
    for (const bloco in content) {
        if (content.hasOwnProperty(bloco)) {
            if (content[bloco].numero === logado) {
                usuarioInfo = content[bloco];
                usuarioEncontrado = true;
                break;
            }
        }
    }

    return { usuarioEncontrado, usuarioInfo };
};

// Função para enviar o menu
const enviarMenu = async (message, usuarioInfo) => {
    console.log(`Enviando Menu!\nUsuário: ${message.from}\n`);
    
    const saldoAtual = usuarioInfo ? usuarioInfo.saldo : "Não Cadastrado";
    
    const menuText = `Wanted Store\n\n◆ ━━━━❪✪❫━━━━ ◆\n❖ Seu número: ${(message.from.split('@'))[0]}\n❖ Saldo Atual: R$: ${saldoAtual}\n◆ ━━━━❪✪❫━━━━ ◆\n\nATENDIMENTO ON 24 HRS⏰\nGARANTIMOS LIVE E MELHOR PREÇO✅\nTODAS AS INFO SÃO TESTADAS✅\n\n🤖WANTED STORE A MELHOR STORE DA ATUALIDADE🤖\nQUALIDADE,PREÇO JUSTO E AGILIDADE`;

    await botBaileys.sendPoll(message.from, menuText, {
        options: ['🤑ADICIONAR SALDO🤑', '💳COMPRAR INFO💳', '📞FALAR COM O SUPORTE📞', '👨SOBRE O BOT👨'],
        multiselect: false
    });

    awaitingResponse = true;
};

if (comandoprinc === 'pix') {
    const valorkk = valorcomand;
    if (valorkk === undefined) {
        await botBaileys.sendText(message.from, '*⚠️INSIRA O VALOR DO PIX!⚠️*\n\nExemplo: *pix 10*');
    } else {
        const pixtext = `Comando Recebido!\n Comando ${comandoprinc} ${valorkk}\n\nValor do Pix a Ser Adicionado: ${valorkk}`;
        await botBaileys.sendText(message.from, pixtext);
    }
}

// Verifique se a mensagem é 'menu' e envie o menu se o usuário existir no banco de dados
if (message.body === 'menu') {
    console.log("Menu Acionado!")
    const usuario = message.from;
    const logado = usuario.split('@s.whatsapp.net')[0];

    // Verifica se o usuário existe no banco de dados
    const { usuarioEncontrado, usuarioInfo } = await verificarUsuario(logado);

    if (usuarioEncontrado) {
        await enviarMenu(message, usuarioInfo);
    } else {
        // Se o usuário não existe, envia mensagem de erro
        await botBaileys.sendText(message.from, '❌Você não está cadastrado. Por favor, registre-se\n\nApenas Digite *registrar*');
    }
}
    if (message.body === '❌VOLTAR AO MENU❌') {
        const usuario = message.from;
        const logado = usuario.split('@s.whatsapp.net')[0];
    
        // Verifica se o usuário existe no banco de dados
        const { usuarioEncontrado, usuarioInfo } = await verificarUsuario(logado);
    
        if (usuarioEncontrado) {
            await enviarMenu(message, usuarioInfo);
        } else {
            // Se o usuário não existe, envia mensagem de erro
            await botBaileys.sendText(message.from, '❌Você não está cadastrado. Por favor, registre-se\n\nApenas Digite *registrar*');
        }
    }   
    if (message.body === '🤑ADICIONAR SALDO🤑') {
        console.log(`Indo ao menu de Adicionar Saldo...\nUsuário: ${message.from}\n`);
        const menuText = `💰COMO ADICIONAR SALDO VIA PIX💰\n\nUtilize "pix" Seguido do Valor Desejado no Formato 0.00\n\nExemplo:\n\n*pix 15*\n\n*pix 22.70* `;
        await botBaileys.sendText(message.from, menuText);    
        awaitingResponse = true;
    }
    if (message.body === '💳COMPRAR INFO💳') {
        console.log(`Indo ao menu de Escolher Info...\nUsuário: ${message.from}\n`);
        const menuText = `💳MENU DE DE CARTÕES💳\n\nTODAS AS INFOS ACOMPANHAM NOME E CPF!\n\nESCOLHA ABAIXO O TIPO DESEJADO`;
    
        await botBaileys.sendPoll(message.from, menuText, {
            options: ['💳CARTÕES POR NÍVEL', '💳CARTÕES POR BANCO', '💳CARTÕES POR BIN', '💳PACOTES MIX', '❌VOLTAR AO MENU❌'],
            multiselect: false
        });
    
        awaitingResponse = true;
    }
    if (message.body === '💳CARTÕES POR NÍVEL') {
        (async () => {
            const usuario = message.from;
            const logado = usuario.split('@s.whatsapp.net')[0];
            const { usuarioEncontrado, usuarioInfo } = await verificarUsuario(logado);
            const email_do_usuario = usuarioInfo.numero;
            const senha_do_usuario = usuarioInfo.senha;
            if (usuarioEncontrado) {
                console.log("Dados de Usuário Capturados!")
            } else {
                // Se o usuário não existe, envia mensagem de erro
                await botBaileys.sendText(message.from, '❌Você não está cadastrado. Por favor, registre-se\n\nApenas Digite *registrar*');
            }
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
          
            // Configurar os dados do POST
            const postData = {
              email: email_do_usuario,
              senha: senha_do_usuario
            };
          
            // Fazer a solicitação POST
            await page.goto('https://wanted-store.42web.io/func/logarbotapi.php', {
              waitUntil: 'networkidle0',
            });
          
            const response = await page.evaluate(async (postData) => {
              const formData = new FormData();
              formData.append('email', postData.email);
              formData.append('senha', postData.senha);
          
              const fetchOptions = {
                method: 'POST',
                body: formData,
              };
          
              const response = await fetch('https://wanted-store.42web.io/func/logarbotapi.php', fetchOptions);
              const text = await response.text();
          
              return text;
            }, postData);
    
            if (response.includes('Login Efetuado Com Sucesso! Cookies Salvos!')) {
              console.log('Login bem-sucedido');
              // Redirecionar para https://wanted-store.42web.io/loja/listalogins.php
              //await botBaileys.sendText(message.from, response);
    
              // Crie um novo PageContext na mesma instância do navegador
              const page2 = await browser.newPage();
              await page2.goto('https://wanted-store.42web.io/loja/listalogins.php');
              const response2 = await page2.content();
    
              // Extrair elementos do tipo <option> da resposta da segunda página
              const options = response2.match(/<option[^>]*>.*?<\/option>/g);
              
              if (options) {
                const pollOptions = options.map((option) => {
                  // Extrair o texto dentro da tag <option>
                  const text = option.replace(/<[^>]*>/g, '');
                  return text;
                });
    
                // Enviar enquete para o usuário
                await botBaileys.sendPoll(message.from, 'Escolha uma opção:', {
                  options: pollOptions,
                  multiselect: false
                });
              } else {
                await botBaileys.sendText(message.from, 'Nenhuma opção encontrada na resposta.');
              }
            } else {
              await botBaileys.sendText(message.from, 'Erro ao fazer login');
              // Aqui você pode enviar uma mensagem de erro
            }
            await browser.close();
        })();
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
                case 'testezz':
                    const usuario = message.from;
                    const logado = usuario.split('@s.whatsapp.net')[0];
                    //const logado = '5521997208858';
                    (async () => {
                        const browser = await puppeteer.launch();
                        const page = await browser.newPage();
                
                        // Navega até a URL desejada
                        await page.goto('https://wanted-store.42web.io/dados/usuariosbot.json');
                
                        // Obtém o conteúdo da página como JSON
                        const content = await page.evaluate(() => {
                            return fetch('https://wanted-store.42web.io/dados/usuariosbot.json')
                                .then(response => response.json())
                                .then(data => data);
                        });
                
                        let usuarioEncontrado = false;
                
                        // Itera pelos blocos no JSON
                        for (const bloco in content) {
                            if (content.hasOwnProperty(bloco)) {
                                if (content[bloco].numero === logado) {
                                    const usuarioInfo = content[bloco];
                                    usuarioEncontrado = true;
                
                                    // Armazena as informações em variáveis
                                    const numero = usuarioInfo.numero;
                                    const senha = usuarioInfo.senha;
                                    const saldo = usuarioInfo.saldo;
                                    const codigoDeConvite = usuarioInfo.codigo_de_convite;
                                    const convidadoPor = usuarioInfo.convidado_por;
                
                                    // Envia as informações via WhatsApp
                                    await botBaileys.sendText(message.from, `Logado Como: ${logado}`);
                                    await botBaileys.sendText(message.from, `Número: ${numero}`);
                                    await botBaileys.sendText(message.from, `Senha: ${senha}`);
                                    await botBaileys.sendText(message.from, `Saldo: ${saldo}`);
                                    await botBaileys.sendText(message.from, `Código de Convite: ${codigoDeConvite}`);
                                    await botBaileys.sendText(message.from, `Convidado Por: ${convidadoPor}`);
                                    break;
                                }
                            }
                        }
                
                        if (!usuarioEncontrado) {
                            console.log(content);
                            // Usuário não encontrado no JSON
                            await botBaileys.sendText(message.from, `BEM VINDO A WANTED STORE\n\n⚠️Usuário ${logado} Não Cadastrado!⚠️\n\nUtilize registrar Para Se Registrar No Bot!\n\nExemplo:\n\n*registrar*\n\n✅Nosso Bot é Integrado Também Com Nossa Store Via Site,Seu Numero(com o 55) e Senha Gerada Após o Registro Podem também ser Usados para login no nosso Site!`);
                        }
                
                        await browser.close();
                    })();
                
                    break;
                    case 'registrar':
                        if (command === 'registrar') {
                            const usuario = message.from;
                            const logado = usuario.split('@s.whatsapp.net')[0];
                    
                            async function realizarRegistro() {
                                const browser = await puppeteer.launch();
                                const page = await browser.newPage();
                    
                                // Navega até a URL desejada
                                await page.goto('https://wanted-store.42web.io/dados/usuariosbot.json');
                    
                                // Obtém o conteúdo da página como JSON
                                const content = await page.evaluate(() => {
                                    return fetch('https://wanted-store.42web.io/dados/usuariosbot.json')
                                        .then(response => response.json())
                                        .then(data => data);
                                });
                    
                                let usuarioEncontrado = false;
                    
                                // Itera pelos blocos no JSON
                                for (const bloco in content) {
                                    if (content.hasOwnProperty(bloco)) {
                                        if (content[bloco].numero === logado) {
                                            const usuarioInfo = content[bloco];
                                            usuarioEncontrado = true;
                    
                                            // Armazena as informações em variáveis
                                            const numero = usuarioInfo.numero;
                                            const senha = usuarioInfo.senha;
                                            const saldo = usuarioInfo.saldo;
                                            const codigoDeConvite = usuarioInfo.codigo_de_convite;
                                            const convidadoPor = usuarioInfo.convidado_por;
                    
                                            // Envia as informações via WhatsApp
                                            await botBaileys.sendText(message.from, `*⚠️Usuário ${logado} Já Existe No Banco de Dados!⚠️*\n\nDigite *menu*`);
                                            break;
                                        }
                                    }
                                }
                    
                                await browser.close();
                    
                                // Verifica se o usuário foi encontrado antes de continuar
                                if (!usuarioEncontrado) {
                                    // SEGUNDA ETAPA DO PUPPETEER ABAIXO
                                    const useratual = `${(message.from.split('@'))[0]}`;
                    
                                    const browser2 = await puppeteer.launch();
                                    const page2 = await browser2.newPage();
                    
                                    // Preencher o formulário
                                    await page2.goto('https://wanted-store.42web.io/formbotusr.php', {
                                        waitUntil: 'domcontentloaded',
                                    });
                    
                                    await page2.type('#email', useratual);
                                    await page2.type('#senha', '55asdsad55');
                                    await page2.type('#convidado', '44444');
                    
                                    // Enviar o formulário
                                    await Promise.all([
                                        page2.waitForNavigation(), // Aguardar o redirecionamento
                                        page2.click('button[name="enviarCadastro"]'), // Clicar no botão de envio
                                    ]);
                    
                                    // Capturar o código-fonte da página redirecionada
                                    const response = await page2.content();
                    
                                    // Fechar o navegador
                                    await browser2.close();
                    
                                    // Enviar a resposta ao usuário
                                    await botBaileys.sendText(message.from, 'Retorno Do Registro:');
                                    await botBaileys.sendText(message.from, response);
                                }
                            }
                    
                            realizarRegistro().catch((error) => {
                                console.error('Erro:', error);
                                botBaileys.sendText(message.from, 'Erro ao realizar o registro.');
                            });
                        } else {
                            await botBaileys.sendText(message.from, 'Erro:Erro Inesperado!');
                        }
                        break;
                    }                    
        awaitingResponse = false;
    }
});



