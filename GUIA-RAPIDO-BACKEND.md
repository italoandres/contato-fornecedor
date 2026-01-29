# 🚀 Guia Rápido - Sistema de Rastreamento Meta Ads

## ⚡ Início Rápido (5 minutos)

### Passo 1: Instalar Node.js
1. Baixe em: https://nodejs.org/
2. Instale a versão LTS
3. Reinicie o computador se necessário

### Passo 2: Instalar dependências
Abra o terminal (CMD ou PowerShell) na pasta `backend`:

```bash
cd backend
npm install
```

Aguarde a instalação (pode demorar 1-2 minutos).

### Passo 3: Configurar credenciais do Facebook

1. Abra o arquivo `backend/.env` no Bloco de Notas

2. Substitua os valores:
```env
META_PIXEL_ID=seu_pixel_id_aqui
META_ACCESS_TOKEN=seu_access_token_aqui
ADMIN_PASSWORD=sua_senha_forte
```

**Como obter as credenciais:**

#### Pixel ID:
1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu Pixel
3. O ID aparece no topo (ex: 123456789012345)

#### Access Token:
1. No Events Manager, clique em "Configurações"
2. Vá em "Conversions API"
3. Clique em "Gerar token de acesso"
4. Copie o token (começa com EAA...)

### Passo 4: Iniciar o servidor

No terminal, dentro da pasta `backend`:

```bash
npm start
```

Você verá:
```
🚀 Servidor Backend Iniciado!
📡 Servidor rodando em: http://localhost:3000
📊 Painel Admin: http://localhost:3000/admin.html
```

✅ **Pronto! O backend está rodando!**

---

## 🧪 Testando o Sistema

### Teste 1: Verificar se o servidor está funcionando

Abra no navegador:
```
http://localhost:3000/api/health
```

Deve aparecer:
```json
{"status":"ok","timestamp":"..."}
```

### Teste 2: Testar conexão com Facebook

1. Acesse: http://localhost:3000/admin.html
2. Faça login com a senha do `.env`
3. O painel deve abrir normalmente

### Teste 3: Testar a landing page

1. Abra o arquivo `src/index.html` no navegador
2. Abra o Console (F12)
3. Você deve ver:
```
🚀 Sistema de rastreamento iniciado
📊 Dados de rastreamento capturados: {...}
📤 Enviando lead para o backend...
✅ Lead registrado com sucesso!
```

4. Volte ao painel admin e atualize - o lead deve aparecer!

---

## 📱 Testando com UTMs do Facebook

Para simular um clique real de anúncio, adicione parâmetros na URL:

```
file:///C:/seu-caminho/src/index.html?utm_source=facebook&utm_medium=cpc&utm_campaign=teste-polo&utm_content=anuncio1&fbclid=IwAR123456789
```

Isso vai:
- Capturar os UTMs
- Gerar cookies fbp e fbc
- Enviar tudo para o backend
- Aparecer no painel admin

---

## 💰 Registrando uma Venda

1. Acesse o painel: http://localhost:3000/admin.html
2. Veja a lista de leads
3. Clique em "Marcar Venda" ao lado de um lead
4. Digite o valor: `997.00`
5. Clique em "Confirmar Venda"

O sistema irá:
- ✅ Salvar a venda no banco
- ✅ Enviar evento "Purchase" para o Facebook
- ✅ Atualizar as estatísticas

Verifique no Console do servidor se apareceu:
```
📤 Enviando evento Purchase para Meta...
✅ Evento enviado com sucesso!
```

---

## 🔧 Configurações Importantes

### Alterar a URL do backend (para produção)

Edite o arquivo `src/main.js`, linha 8:

```javascript
const BACKEND_URL = 'http://localhost:3000'; // Desenvolvimento
// const BACKEND_URL = 'https://seu-dominio.com'; // Produção
```

### Alterar o número do WhatsApp

Edite o arquivo `src/index.html`, procure por:
```html
https://wa.me/5511999999999
```

Troque por seu número no formato: `55` + DDD + número

---

## ❌ Problemas Comuns

### "npm não é reconhecido como comando"
- Node.js não está instalado ou não está no PATH
- Reinstale o Node.js e reinicie o computador

### "Erro ao conectar com Meta API"
- Verifique se o Pixel ID está correto
- Verifique se o Access Token está válido
- Teste em: http://localhost:3000/api/test-meta

### "Senha incorreta" no painel
- Verifique a senha no arquivo `.env`
- Certifique-se de não ter espaços extras

### Leads não aparecem no painel
- Verifique se o backend está rodando
- Abra o Console do navegador (F12) e veja os erros
- Verifique se a URL em `main.js` está correta

---

## 📊 Próximos Passos

1. **Teste com anúncios reais:**
   - Crie uma campanha no Facebook
   - Use a landing page como destino
   - Adicione UTMs na URL do anúncio

2. **Deploy em produção:**
   - Use Heroku, Railway ou DigitalOcean
   - Configure domínio próprio
   - Ative HTTPS

3. **Monitore os resultados:**
   - Acompanhe no painel admin
   - Verifique no Events Manager do Facebook
   - Otimize campanhas baseado nas conversões

---

## 🎯 Checklist de Configuração

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env` configurado
- [ ] Pixel ID do Facebook adicionado
- [ ] Access Token do Facebook adicionado
- [ ] Senha do admin alterada
- [ ] Servidor iniciado (`npm start`)
- [ ] Teste de health check OK
- [ ] Landing page testada
- [ ] Lead apareceu no painel
- [ ] Venda teste registrada
- [ ] Evento chegou no Facebook

---

## 📞 Precisa de Ajuda?

1. Verifique os logs do servidor no terminal
2. Abra o Console do navegador (F12) para ver erros
3. Consulte o arquivo `backend/README.md` para mais detalhes
4. Teste cada componente isoladamente

**Boa sorte com suas campanhas! 🚀**
