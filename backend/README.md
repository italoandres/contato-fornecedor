# 🚀 Sistema de Rastreamento Meta Ads + WhatsApp

Sistema completo de rastreamento e atribuição de vendas para campanhas Meta Ads focadas em WhatsApp.

## 📋 Funcionalidades

✅ **Landing Page com Rastreamento**
- Captura automática de UTMs (source, medium, campaign, content)
- Captura de fbclid (Facebook Click ID)
- Geração automática de cookies fbp e fbc
- Envio automático de dados para o backend

✅ **Backend Node.js**
- API REST para receber leads
- Banco de dados SQLite para armazenar leads e vendas
- Integração com Meta Conversions API
- Retry automático em caso de falha

✅ **Painel Administrativo**
- Login protegido por senha
- Visualização de todos os leads
- Estatísticas em tempo real
- Botão para marcar vendas
- Envio automático de evento "Purchase" para o Facebook

✅ **Meta Conversions API**
- Envio de eventos Purchase
- Atribuição correta com fbp, fbc, IP e User Agent
- Retry automático (até 3 tentativas)
- Logs detalhados

---

## 🛠️ Instalação

### 1. Instalar Node.js

Se você não tem Node.js instalado:
- Baixe em: https://nodejs.org/
- Instale a versão LTS (recomendada)
- Verifique a instalação: `node --version`

### 2. Instalar dependências

Abra o terminal na pasta `backend` e execute:

```bash
npm install
```

### 3. Configurar variáveis de ambiente

1. Copie o arquivo `.env.example` para `.env`:
```bash
copy .env.example .env
```

2. Edite o arquivo `.env` e configure:

```env
# Meta (Facebook) Conversions API
META_PIXEL_ID=seu_pixel_id_aqui
META_ACCESS_TOKEN=seu_access_token_aqui

# Senha do painel admin (ALTERE!)
ADMIN_PASSWORD=sua_senha_forte_aqui

# Session Secret (gere uma string aleatória)
SESSION_SECRET=sua_chave_secreta_aleatoria
```

#### Como obter META_PIXEL_ID e META_ACCESS_TOKEN:

1. **Pixel ID:**
   - Acesse: https://business.facebook.com/events_manager
   - Selecione seu Pixel
   - O ID aparece no topo da página

2. **Access Token:**
   - Acesse: https://business.facebook.com/events_manager
   - Clique em "Configurações" do seu Pixel
   - Vá em "Conversions API"
   - Clique em "Gerar token de acesso"
   - Copie o token gerado

---

## 🚀 Como Usar

### 1. Iniciar o servidor

Na pasta `backend`, execute:

```bash
npm start
```

Você verá:
```
🚀 ========================================
🚀  Servidor Backend Iniciado!
🚀 ========================================
📡 Servidor rodando em: http://localhost:3000
🌍 Ambiente: development
📊 Painel Admin: http://localhost:3000/admin.html
🚀 ========================================
```

### 2. Testar a landing page

1. Abra a landing page: `src/index.html`
2. Adicione parâmetros UTM na URL para testar:
```
file:///C:/seu-caminho/src/index.html?utm_source=facebook&utm_medium=cpc&utm_campaign=teste&fbclid=123456
```

3. Abra o Console do navegador (F12) para ver os logs de rastreamento

### 3. Acessar o painel admin

1. Abra: http://localhost:3000/admin.html
2. Digite a senha configurada no `.env`
3. Você verá:
   - Estatísticas (leads, vendas, receita, conversão)
   - Lista de todos os leads
   - Botão para marcar vendas

### 4. Marcar uma venda

1. No painel admin, clique em "Marcar Venda" ao lado de um lead
2. Digite o valor da venda (ex: 997.00)
3. Clique em "Confirmar Venda"
4. O sistema irá:
   - Registrar a venda no banco
   - Enviar evento "Purchase" para o Facebook
   - Atualizar as estatísticas

---

## 📊 Fluxo Completo

```
1. Usuário clica no anúncio do Facebook
   ↓
2. Chega na landing page com UTMs e fbclid
   ↓
3. JavaScript captura dados e envia para backend
   ↓
4. Backend salva lead no banco de dados
   ↓
5. Usuário clica no botão WhatsApp (com lead_id)
   ↓
6. Conversa acontece no WhatsApp
   ↓
7. Admin marca venda no painel
   ↓
8. Backend envia evento "Purchase" para Meta API
   ↓
9. Facebook otimiza campanhas com base nas conversões
```

---

## 🔧 Estrutura de Arquivos

```
backend/
├── server.js              # Servidor principal
├── database.js            # Gerenciamento do banco SQLite
├── metaConversions.js     # Integração com Meta API
├── package.json           # Dependências
├── .env                   # Configurações (NÃO COMMITAR!)
├── .env.example           # Exemplo de configurações
├── leads.db               # Banco de dados (criado automaticamente)
├── public/
│   └── admin.html         # Painel administrativo
└── README.md              # Esta documentação

src/
├── index.html             # Landing page
├── styles.css             # Estilos
├── config.js              # Configurações da página
└── main.js                # Rastreamento e envio de dados
```

---

## 🔐 Segurança

⚠️ **IMPORTANTE:**

1. **Nunca commite o arquivo `.env`** com suas credenciais
2. **Altere a senha padrão** do painel admin
3. **Use HTTPS em produção** (não HTTP)
4. **Proteja o Access Token** do Facebook
5. **Configure CORS** adequadamente em produção

---

## 🐛 Troubleshooting

### Erro: "META_PIXEL_ID e META_ACCESS_TOKEN devem estar configurados"
- Verifique se o arquivo `.env` existe
- Verifique se as variáveis estão preenchidas corretamente

### Erro: "Erro ao conectar com Meta API"
- Verifique se o Pixel ID está correto
- Verifique se o Access Token está válido
- Teste a conexão: http://localhost:3000/api/test-meta

### Leads não aparecem no painel
- Verifique se o backend está rodando
- Abra o Console do navegador (F12) e veja se há erros
- Verifique se a URL do backend está correta em `src/main.js`

### Evento não chega no Facebook
- Verifique os logs do servidor
- Teste a conexão com Meta API
- Verifique se o Pixel está ativo no Events Manager

---

## 📈 Próximos Passos

1. **Deploy em produção:**
   - Use um serviço como Heroku, Railway, ou DigitalOcean
   - Configure domínio próprio
   - Ative HTTPS

2. **Melhorias:**
   - Adicionar mais eventos (ViewContent, AddToCart, InitiateCheckout)
   - Implementar webhook do WhatsApp Business API
   - Adicionar dashboard com gráficos
   - Exportar relatórios em CSV

3. **Otimização:**
   - Configurar campanhas de conversão no Facebook
   - Usar públicos personalizados baseados em eventos
   - Testar diferentes criativos e mensagens

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do servidor
2. Consulte a documentação da Meta Conversions API
3. Teste cada componente isoladamente

---

## 📄 Licença

MIT License - Livre para uso comercial e pessoal
