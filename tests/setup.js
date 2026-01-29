// Configuração de testes
const { JSDOM } = require('jsdom');

// Função helper para renderizar a landing page em testes
global.renderLandingPage = (config) => {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
      <body></body>
    </html>
  `);
  
  global.document = dom.window.document;
  global.window = dom.window;
  
  return dom.window.document;
};
