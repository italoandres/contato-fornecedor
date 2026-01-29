# 🚀 Deploy Rápido - Railway + Netlify

## ✅ Pré-requisitos

- [x] Código no GitHub: https://github.com/italoandres/contato-fornecedor.git
- [x] WhatsApp atualizado: 5518996969640
- [x] Senha admin: @DeusePai7
- [x] Imagens adicionadas

---

## 📦 Passo 1: Subir para GitHub

No terminal (na pasta do projeto):

```bash
# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Preparado para deploy em produção"

# Adicionar repositório remoto
git remote add origin https://github.com/italoandres/contato-fornecedor.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

Se der erro de "remote already exists":
```bash
git remote set-url origin https://github.com/italoandres/contato-fornecedor.git
git push -u origin main
```

---

## 🖥️ Passo 2: Deploy do Backend (Railway)

### 2.1 Criar Conta

1. Acesse: https://railway.app/
2. Clique em **"Login"**
3. Escolha **"Login with GitHub"**
4. Autorize o Railway

### 2.2 Criar Projeto

1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha: **italoandres/contato-fornecedor**
4. Railway vai começar o deploy automaticamente

### 2.3 Configurar Root Directory

1. Clique no seu serviço (vai aparecer "contato-fornecedor")
2. Vá na aba **"Settings"**
3. Procure **"Root Directory"**
4. Digite: `backend`
5. Clique em **"Update"**

### 2.4 Adicionar Variáveis de Ambiente

1. Vá na aba **"Variables"**
2. Clique em **"New Variable"**
3. Adicione uma por uma:

```
META_PIXEL_ID=883207941199352
META_ACCESS_TOKEN=EAAOAzbyBYVwBQtUrDMpZCkfr8B3Fzv5vq2GEJ3CKZCBlos80BbDOCIQwoZCX75LdiOtDDfRcog38pm4eDgq72JJQSDUM9nKZByWZBZCQLddvxZBLumke6QcrRNvwHwOT2NQcgUkZAE4fiI4WA1SfppTjjbEqjaGLo5t16ZC8YZCmcWEXfxRpe8uZBTIcqDVImdwcKZAIHwZDZD
PORT=3000
NODE_ENV=production
ADMIN_PASSWORD=@DeusePai7
SESSION_SECRET=minha-chave-secreta-super-aleatoria-12345
```

4. Clique em **"Add"** para cada uma

### 2.5 Gerar Domínio

1. Vá na aba **"Settings"**
2. Procure **"Networking"**
3. Clique em **"Generate Domain"**
4. **COPIE A URL** (ex: `contato-fornecedor-production.up.railway.app`)

### 2.6 Testar Backend

Acesse no navegador:
```
https://SEU-DOMINIO.railway.app/api/health
```

Deve retornar:
```json
{"status":"ok","timestamp":"...","environment":"production"}
```

✅ **Backend funcionando!**

---

## 🌐 Passo 3: Deploy do Frontend (Netlify)

### 3.1 Criar Conta

1. Acesse: https://app.netlify.com/signup
2. Clique em **"Sign up with GitHub"**
3. Autorize o Netlify

### 3.2 Criar Site

1. Clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Selecione: **italoandres/contato-fornecedor**
4. Configure:
   - **Base directory:** `src`
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.` (apenas um ponto)
5. Clique em **"Deploy site"**

### 3.3 Copiar URL do Netlify

Após o deploy, copie a URL (ex: `contato-fornecedor.netlify.app`)

---

## 🔧 Passo 4: Conectar Frontend com Backend

Agora você precisa atualizar o código para o frontend falar com o backend.

### 4.1 Atualizar URL do Backend

**Edite o arquivo:** `src/main.js`

Procure esta linha (linha 10):
```javascript
const BACKEND_URL = 'http://localhost:3000';
```

Mude para (use a URL do Railway):
```javascript
const BACKEND_URL = 'https://SEU-DOMINIO.railway.app';
```

Exemplo:
```javascript
const BACKEND_URL = 'https://contato-fornecedor-production.up.railway.app';
```

### 4.2 Atualizar CORS no Backend

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

### 4.3 Commit e Push

```bash
git add .
git commit -m "Configurado URLs de produção"
git push
```

**Aguarde 2-3 minutos:**
- Railway vai fazer redeploy do backend
- Netlify vai fazer redeploy do frontend

---

## ✅ Passo 5: Testar Tudo

### 5.1 Testar Landing Page

1. Acesse: `https://contato-fornecedor.netlify.app`
2. Pressione **F12** (abrir Console)
3. Recarregue a página
4. Veja os logs:
   ```
   📊 Dados de rastreamento capturados
   ✅ Lead registrado com sucesso!
   ```

### 5.2 Testar Admin Panel

1. Acesse: `https://SEU-DOMINIO.railway.app/admin.html`
2. Login: **@DeusePai7**
3. Veja os leads capturados
4. Clique em **"🧪 Enviar Evento Teste"**
5. Verifique no Facebook Events Manager

### 5.3 Testar Venda

1. No admin, clique em **"Marcar Venda"** em um lead
2. Digite: 597
3. Confirme
4. Veja no Facebook Events Manager (aba Overview)

---

## 🎯 Passo 6: Adicionar Pixel do Facebook na Landing Page

**Edite:** `src/index.html`

Adicione este código dentro do `<head>`, logo após o `<title>`:

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
git commit -m "Adicionado Meta Pixel"
git push
```

---

## 🎉 PRONTO!

Seu sistema está 100% em produção!

**URLs finais:**
- Landing Page: `https://contato-fornecedor.netlify.app`
- Admin Panel: `https://SEU-DOMINIO.railway.app/admin.html`
- Senha Admin: `@DeusePai7`

**Próximos passos:**
1. Criar campanha no Facebook Ads
2. Usar URL: `https://contato-fornecedor.netlify.app?utm_source=facebook&utm_medium=cpc&utm_campaign=teste`
3. Monitorar leads no painel admin
4. Marcar vendas conforme fecham no WhatsApp
5. Ver eventos no Facebook Events Manager

---

## 🆘 Problemas Comuns

### Backend não funciona
- Veja logs no Railway: Deployments > View Logs
- Verifique se Root Directory está como `backend`
- Verifique se todas as variáveis de ambiente foram adicionadas

### Frontend não captura leads
- Verifique se atualizou BACKEND_URL no main.js
- Veja console do navegador (F12)
- Verifique CORS no backend

### Eventos não aparecem no Facebook
- Aguarde 5-10 minutos
- Verifique se Access Token está correto
- Veja logs do backend no Railway

---

## 📞 Links Úteis

- **Railway Dashboard:** https://railway.app/dashboard
- **Netlify Dashboard:** https://app.netlify.com/
- **Facebook Events Manager:** https://business.facebook.com/events_manager2/list/pixel/883207941199352
- **GitHub Repo:** https://github.com/italoandres/contato-fornecedor

---

**Boa sorte com suas vendas! 🚀💰**
