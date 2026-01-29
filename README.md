# Landing Page - Fabricante de Camisas Polo

Landing page para venda de acesso direto a fabricante brasileiro de camisas polo.

## Como visualizar localmente

1. Instale as dependências (apenas se quiser rodar os testes):
```bash
npm install
```

2. Abra o arquivo diretamente no navegador:
   - Navegue até a pasta `src`
   - Abra o arquivo `index.html` no seu navegador

OU use um servidor local:
```bash
npm run serve
```

Isso abrirá automaticamente a página em `http://localhost:8080`

## Como testar

Execute os testes:
```bash
npm test
```

## Estrutura do projeto

```
├── src/
│   ├── index.html      # Página principal
│   ├── styles.css      # Estilos CSS
│   ├── config.js       # Configurações da página
│   └── main.js         # JavaScript principal
├── tests/              # Testes automatizados
├── package.json        # Dependências do projeto
└── jest.config.js      # Configuração de testes
```

## Tecnologias

- HTML5
- CSS3
- JavaScript Vanilla (sem frameworks)
- Jest + fast-check (para testes)
