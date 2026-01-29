# Como Testar a Landing Page Localmente

## Método 1: Abrir diretamente no navegador (MAIS FÁCIL)

1. Abra o Windows Explorer (Explorador de Arquivos)
2. Navegue até a pasta do projeto
3. Entre na pasta `src`
4. Clique duas vezes no arquivo `index.html`
5. A página abrirá no seu navegador padrão

## Método 2: Arrastar e soltar

1. Abra seu navegador (Chrome, Firefox, Edge, etc.)
2. Abra o Windows Explorer
3. Navegue até a pasta `src` do projeto
4. Arraste o arquivo `index.html` para dentro da janela do navegador

## O que você verá

A landing page completa com:

✅ **Header** - Título principal e subtítulo
✅ **Bloco de Qualificação** - Aviso amarelo para filtrar curiosos
✅ **Descrição da Oferta** - Lista do que está incluído
✅ **Bloco de Transparência** - O que NÃO está incluído
✅ **Escassez** - Disponibilidade limitada
✅ **Prova Social** - Informações sobre o fabricante
✅ **Bloco de Preço** - R$ 997,00 destacado
✅ **Botão CTA** - "Tenho interesse e aceito o valor"

## Testando o botão do WhatsApp

Quando você clicar no botão verde, ele abrirá o WhatsApp Web com uma mensagem pré-preenchida.

**IMPORTANTE:** O número de telefone no botão é de exemplo (5511999999999). 
Para usar seu número real:

1. Abra o arquivo `src/index.html` em um editor de texto (Bloco de Notas)
2. Procure por `5511999999999`
3. Substitua pelo seu número no formato: `55` + `DDD` + `número`
   - Exemplo: `5521987654321` (Rio de Janeiro)
   - Exemplo: `5511987654321` (São Paulo)
4. Salve o arquivo
5. Atualize a página no navegador (F5)

## Testando em diferentes dispositivos

### No computador:
- Abra a página normalmente
- Redimensione a janela do navegador para ver a responsividade

### No celular:
1. Copie a pasta `src` para o seu celular (via cabo USB, email, etc.)
2. Abra o arquivo `index.html` no navegador do celular

OU

1. Use o Chrome DevTools:
   - Abra a página no Chrome
   - Pressione F12
   - Clique no ícone de celular (canto superior esquerdo)
   - Escolha diferentes tamanhos de tela

## Personalizando o conteúdo

Para alterar textos, preços ou informações:

1. Abra `src/config.js` em um editor de texto
2. Modifique os valores desejados
3. Salve o arquivo
4. Atualize a página no navegador

## Problemas comuns

**A página não abre:**
- Certifique-se de que está abrindo o arquivo `index.html` dentro da pasta `src`
- Tente com outro navegador

**O botão do WhatsApp não funciona:**
- Verifique se você tem o WhatsApp instalado ou acesse WhatsApp Web
- Confirme que o número está no formato correto

**Os estilos não aparecem:**
- Verifique se os arquivos `styles.css`, `config.js` e `main.js` estão na mesma pasta que `index.html`
