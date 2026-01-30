// Configuração de testes
const { TextEncoder, TextDecoder } = require('util');

// Polyfills para JSDOM
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
