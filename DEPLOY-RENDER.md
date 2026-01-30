# 🚀 Deploy no Render + Netlify

## ✅ Status

- [x] Código no GitHub: https://github.com/italoandres/contato-fornecedor
- [x] WhatsApp: 5518996969640
- [x] Senha admin: @DeusePai7

---

## 🖥️ Parte 1: Deploy do Backend (Render)

### 1.1 Criar Conta no Render

1. Acesse: https://render.com/
2. Clique em **"Get Started"**
3. Escolha **"Sign in with GitHub"**
4. Autorize o Render

### 1.2 Criar Web Service

1. No dashboard, clique em **"New +"**
2. Selecione **"Web Service"**
3. Conecte seu repositório: **italoandres/contato-fornecedor**
4. Clique em **"Connect"**

### 1.3 Configurar o Serviço

Preencha os campos:

**Name:** `contato-fornecedor-backend`

**Region:** `Oregon (US West)` (ou o mais próximo)

**Branch:** `main`

**Root Directory:** `backend`

**Runtime:** `Node`

**Build Command:** `npm install`

**Start Command:** `npm start`

**Instance Type:** `Free`

### 1.4 Adicionar Variáveis de Ambiente

Role para baixo até **"Environment Variables"**

Clique em **"Add Environment Variable"** e adicione:

```
META_PIXEL_ID=883207941199352
META_ACCESS_TOKEN=EAAOAzbyBYVwBQtUrDMpZCkfr8B3Fzv5vq2GEJ3CKZCBlos80BbDOCIQwoZCX75LdiOtDDfRcog38pm4eDgq72JJQSDUM9nKZByWZBZCQLddvxZBLumke6QcrRNvwHwOT2NQcgUkZAE4fiI4WA1SfppTjjbEqjaGLo5t16ZC8YZCmcWEXfxRpe8uZBTIcqDVImdwcKZAIHwZDZD
PORT=3000
NODE_ENV=production
ADMIN_PASSWORD=@DeusePai7
SESSION_SECRET=minha-chave-secreta-super-aleatoria-12345
```

### 1.5 Deploy

1. Clique em **"Create Web Service"**
2. Aguarde 3-5 minutos (Render vai instalar dependências e iniciar)
3. Quando terminar, você verá: **"Your service is live 🎉"**
4. **COPIE A URL** (ex: `contato-fornecedor-backend.onrender.com`)

### 1.6 Testar Backend

Acesse no navegador:
```
https://contato-fornecedor-backend.onrender.com/api/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"...","environment":"production"}
```

✅ **Backend funcionando!**

---

## 🌐 Parte 2: Deploy do Frontend (Netlify)

### 2.1 Criar Conta no Netlify

1. Acesse: https://app.netlify.com/signup
2. Clique em **"Sign up with GitHub"**
3. Autorize o Netlify

### 2.2 Criar Site

1. Clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Selecione: **italoandres/contato-fornecedor**
4. Configure:
   - **Base directory:** `src`
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.` (apenas um ponto)
5. Clique em **"Deploy site"**

### 2.3 Copiar URL do Netlify

Após o deploy (1-2 minutos), copie a URL (ex: `contato-fornecedor.netlify.app`)

---

## 🔧 Parte 3: Conectar Frontend com Backend

### 3.1 Atualizar URL do Backend no Frontend

**Edite o arquivo:** `src/main.js`

Procure esta linha (linha 10):
```javascript
const BACKEND_URL = 'http://localhost:3000';
```

Mude para (use a URL do Render):
```javascript
const BACKEND_URL = 'https://contato-fornecedor-backend.onrender.com';
```

### 3.2 Atualizar CORS no Backend

**Edite o arquivo:** `backend/server.js`

Procure esta linha (linha 18):
```javascript
app.use(cors());
```

Mude para (use a URL do Netlify):
```javascript
app.use(cors({
  origin: [
    'https://contato-fornecedor.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 3.3 Commit e Push

```bash
git add .
git commit -m "Configurado URLs de produção - Render + Netlify"
git push
```

**Aguarde 3-5 minutos:**
- Render vai fazer redeploy do backend
- Netlify vai fazer redeploy do frontend

---

## ✅ Parte 4: Testar Tudo em Produção

### 4.1 Testar Landing Page

1. Acesse: `https://contato-fornecedor.netlify.app`
2. Pressione **F12** (abrir Console)
3. Recarregue a página
4. Veja os logs:
   ```
   📊 Dados de rastreamento capturados
   ✅ Lead registrado com sucesso!
   Lead ID: xxxxx
   ```

### 4.2 Testar Admin Panel

1. Acesse: `https://contato-fornecedor-backend.onrender.com/admin.html`
2. Login: **@DeusePai7**
3. Veja os leads capturados
4. Clique em **"🧪 Enviar Evento Teste"**
5. Verifique no Facebook Events Manager (Test Events)

### 4.3 Testar Venda

1. No admin, clique em **"Marcar Venda"** em um lead
2. Digite: 597
3. Confirme
4. Veja no Facebook Events Manager (aba Overview)
5. Deve aparecer evento "Purchase" de R$ 597,00

---

## 🎯 Parte 5: Adicionar Meta Pixel na Landing Page

**Edite:** `src/index.html`

Adicione este código dentro do `<head>`, logo após a linha do `<title>`:

```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '883207941199352');
fbq('track', 'PageView');
</script>
<noscript>
<img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=883207941199352&ev=PageView&noscript=1"/>
</noscript>
<!-- End Meta Pixel Code -->
```

**Commit e push:**
```bash
git add src/index.html
git commit -m "Adicionado Meta Pixel para rastreamento de PageView"
git push
```

---

## 🎉 PRONTO! Sistema 100% em Produção

**URLs finais:**
- **Landing Page:** `https://contato-fornecedor.netlify.app`
- **Admin Panel:** `https://contato-fornecedor-backend.onrender.com/admin.html`
- **Senha Admin:** `@DeusePai7`
- **WhatsApp:** 5518996969640

---

## 📊 Próximos Passos

### 1. Criar Campanha no Facebook Ads

1. Acesse: https://business.facebook.com/adsmanager
2. Clique em **"Criar"**
3. Objetivo: **"Vendas"**
4. Evento de conversão: **"Purchase"**
5. Pixel: 883207941199352
6. Orçamento: R$ 20-50/dia (teste)
7. Público: Brasil, 25-55 anos, interessados em empreendedorismo/negócios
8. Criativo: Imagem + texto direto e objetivo
9. **URL da landing page:**
   ```
   https://contato-fornecedor.netlify.app?utm_source=facebook&utm_medium=cpc&utm_campaign=teste_inicial
   ```

### 2. Monitorar Resultados

**No Painel Admin:**
- Total de leads
- Taxa de conversão
- Receita total

**No Facebook Events Manager:**
- Eventos Purchase recebidos
- Event Match Quality (EMQ) - objetivo: 6.0+
- Atribuição por campanha

**No Facebook Ads Manager:**
- CPM (Custo por mil impressões)
- CPC (Custo por clique)
- CPA (Custo por aquisição)
- ROAS (Retorno sobre investimento)

---

## ⚠️ Importante sobre Render (Plano Free)

**Limitações do plano gratuito:**
- Após 15 minutos de inatividade, o serviço "dorme"
- Primeira requisição após dormir demora 30-60 segundos
- 750 horas/mês gratuitas (suficiente para testes)

**Solução:**
- Para produção séria, considere upgrade para plano pago ($7/mês)
- Ou use Railway (500 horas/mês, mas não dorme)

**Para manter ativo (opcional):**
- Use um serviço de "ping" como UptimeRobot
- Faz requisição a cada 5 minutos para manter acordado

---

## 🆘 Troubleshooting

### Backend demora para responder
- Normal no plano free do Render (serviço dormindo)
- Aguarde 30-60 segundos na primeira requisição
- Depois fica rápido por 15 minutos

### Erro: "Failed to fetch"
- Verifique se atualizou BACKEND_URL no main.js
- Verifique CORS no backend/server.js
- Veja logs no Render: Dashboard > Logs

### Eventos não aparecem no Facebook
- Aguarde 5-10 minutos
- Verifique Access Token nas variáveis de ambiente
- Veja logs do backend no Render

### Admin panel não carrega
- Acesse: https://contato-fornecedor-backend.onrender.com/api/health
- Se retornar erro, veja logs no Render
- Verifique se todas as variáveis de ambiente foram adicionadas

---

## 📞 Links Úteis

- **Render Dashboard:** https://dashboard.render.com/
- **Netlify Dashboard:** https://app.netlify.com/
- **GitHub Repo:** https://github.com/italoandres/contato-fornecedor
- **Facebook Events Manager:** https://business.facebook.com/events_manager2/list/pixel/883207941199352
- **Facebook Ads Manager:** https://business.facebook.com/adsmanager

---

## 🔒 Segurança

✅ **Implementado:**
- Senha forte no admin
- Variáveis de ambiente no Render (não no código)
- HTTPS automático (Render + Netlify)
- CORS configurado
- .gitignore protegendo .env

---

**Tudo pronto! Agora é só criar suas campanhas e começar a vender! 🚀💰**
