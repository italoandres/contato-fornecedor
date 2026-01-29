# 🚀 Guia de Deploy - Subir para Produção

## 📋 Checklist Pré-Deploy

Antes de fazer o deploy, certifique-se:

- [x] Sistema funcionando localmente
- [x] Eventos de teste aparecendo no Facebook
- [x] Pixel ID e Access Token configurados
- [ ] Imagens adicionadas (Captura-1.png, Captura-2.png, Captura-3.png)
- [ ] Imagens de produtos adicionadas (modelo1-4.png)
- [ ] Número do WhatsApp atualizado
- [ ] Senha do admin alterada (recomendado)

---

## 🎯 Arquitetura de Deploy

```
┌─────────────────────────────────────────────────────────┐
│  NETLIFY (Frontend)                                     │
│  - Landing Page (src/)                                  │
│  - Domínio: seu-dominio.netlify.app                     │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│  RAILWAY/RENDER (Backend)                               │
│  - API + Admin Panel (backend/)                         │
│  - Domínio: seu-app.railway.app                         │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│  META CONVERSIONS API                                   │
│  - Recebe eventos Purchase                              │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Parte 1: Preparar Repositório GitHub

### 1.1 Criar Repositório no GitHub

1. Acesse: https://github.com/new
2. Nome: `landing-page-fabricante`
3. Privado ou Público (sua escolha)
4. **NÃO** adicione README, .gitignore ou licença
5. Clique em **"Create repository"**

### 1.2 Subir Código para GitHub

No terminal (na pasta do projeto):

```bash
# Inicializar Git (se ainda não foi)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Landing page + Backend"

# Adicionar repositório remoto (substitua SEU_USUARIO)
git remote add origin https://github.com/SEU_USUARIO/landing-page-fabricante.git

# Enviar para GitHub
git branch -M main
git push -u origin main
```

---

## 🖥️ Parte 2: Deploy do Backend (Railway)

### Por que Railway?
- ✅ Gratuito (500 horas/mês)
- ✅ Deploy automático do GitHub
- ✅ Variáveis de ambiente fáceis
- ✅ Banco de dados SQLite funciona
- ✅ HTTPS automático

### 2.1 Criar Conta no Railway

1. Acesse: https://railway.app/
2. Clique em **"Start a New Project"**
3. Faça login com GitHub
4. Autorize o Railway

### 2.2 Deploy do Backend

1. Clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha o repositório: `landing-page-fabricante`
4. Railway vai detectar automaticamente o Node.js

### 2.3 Configurar Variáveis de Ambiente

1. No dashboard do Railway, clique no seu projeto
2. Vá em **"Variables"**
3. Adicione as seguintes variáveis:

```
META_PIXEL_ID=883207941199352
META_ACCESS_TOKEN=seu_token_aqui
PORT=3000
NODE_ENV=production
ADMIN_PASSWORD=sua_senha_forte_aqui
SESSION_SECRET=gere_uma_string_aleatoria_aqui
```

**Dica:** Para gerar SESSION_SECRET aleatório:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.4 Configurar Root Directory

1. Vá em **"Settings"**
2. Em **"Root Directory"**, coloque: `backend`
3. Salve

### 2.5 Deploy

1. Railway vai fazer deploy automaticamente
2. Aguarde 2-3 minutos
3. Clique em **"Deployments"** para ver o progresso
4. Quando terminar, clique em **"Generate Domain"**
5. Copie a URL (ex: `seu-app.railway.app`)

### 2.6 Testar Backend

Acesse:
```
https://seu-app.railway.app/api/health
```

Deve retornar:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "production"
}
```

---

## 🌐 Parte 3: Deploy do Frontend (Netlify)

### Por que Netlify?
- ✅ Gratuito
- ✅ Deploy automático do GitHub
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Domínio customizado fácil

### 3.1 Criar Conta no Netlify

1. Acesse: https://app.netlify.com/signup
2. Faça login com GitHub
3. Autorize o Netlify

### 3.2 Deploy do Frontend

1. Clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Selecione o repositório: `landing-page-fabricante`
4. Configure:
   - **Base directory:** `src`
   - **Build command:** (deixe vazio)
   - **Publish directory:** `.` (ponto)
5. Clique em **"Deploy site"**

### 3.3 Atualizar URL do Backend

Agora você precisa atualizar o código para apontar para o backend em produção.

**Edite o arquivo:** `src/main.js`

Mude esta linha:
```javascript
const BACKEND_URL = 'http://localhost:3000';
```

Para:
```javascript
const BACKEND_URL = 'https://seu-app.railway.app';
```

**Commit e push:**
```bash
git add src/main.js
git commit -m "Update backend URL to production"
git push
```

Netlify vai fazer redeploy automaticamente!

### 3.4 Configurar Domínio (Opcional)

1. No Netlify, vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `fabricante.com.br`)
4. Siga as instruções para configurar DNS

---

## 🔧 Parte 4: Configurações Finais

### 4.1 Atualizar CORS no Backend

**Edite:** `backend/server.js`

Mude:
```javascript
app.use(cors());
```

Para:
```javascript
app.use(cors({
  origin: [
    'https://seu-site.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
```

### 4.2 Atualizar WhatsApp Link

**Edite:** `src/index.html`

Mude o número do WhatsApp:
```html
<a href="https://wa.me/5511999999999?text=..."
```

Para seu número real:
```html
<a href="https://wa.me/55SEU_DDD_SEU_NUMERO?text=..."
```

### 4.3 Commit e Push

```bash
git add .
git commit -m "Production configurations"
git push
```

---

## ✅ Parte 5: Testar em Produção

### 5.1 Testar Landing Page

1. Acesse: `https://seu-site.netlify.app`
2. Abra o Console (F12)
3. Veja os logs de rastreamento
4. Clique no botão WhatsApp

### 5.2 Testar Admin Panel

1. Acesse: `https://seu-app.railway.app/admin.html`
2. Login com sua senha
3. Veja os leads capturados
4. Marque uma venda de teste

### 5.3 Verificar no Facebook

1. Acesse Events Manager
2. Vá em **"Overview"**
3. Veja os eventos Purchase chegando
4. Verifique o Event Match Quality (EMQ)

---

## 🎯 Parte 6: Criar Campanha de Teste

### 6.1 Configurar Pixel na Landing Page

**Adicione o código do Pixel no `<head>` do `src/index.html`:**

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

### 6.2 Criar Campanha no Facebook Ads

1. Acesse: https://business.facebook.com/adsmanager
2. Clique em **"Criar"**
3. Objetivo: **"Vendas"**
4. Conversão: **"Purchase"**
5. Pixel: Selecione seu pixel (883207941199352)
6. Orçamento: R$ 20/dia (teste)
7. Público: Brasil, 25-55 anos, interessados em empreendedorismo
8. Criativo: Imagem + texto direto
9. Link: `https://seu-site.netlify.app?utm_source=facebook&utm_medium=cpc&utm_campaign=teste_inicial`

---

## 📊 Parte 7: Monitoramento

### Métricas para Acompanhar:

1. **No Painel Admin:**
   - Total de leads
   - Taxa de conversão
   - Receita total

2. **No Facebook Events Manager:**
   - Eventos Purchase recebidos
   - Event Match Quality (EMQ)
   - Atribuição por campanha

3. **No Facebook Ads Manager:**
   - CPM (Custo por mil impressões)
   - CPC (Custo por clique)
   - CPA (Custo por aquisição)
   - ROAS (Retorno sobre investimento)

---

## 🔒 Segurança em Produção

### Checklist de Segurança:

- [ ] Senha do admin alterada (forte!)
- [ ] SESSION_SECRET aleatório
- [ ] .env não commitado no GitHub
- [ ] HTTPS ativado (automático no Netlify/Railway)
- [ ] CORS configurado corretamente
- [ ] Access Token do Facebook seguro

---

## 🆘 Troubleshooting

### Erro: "Failed to fetch"
- Verifique se o backend está rodando
- Verifique CORS
- Verifique URL do backend no main.js

### Eventos não aparecem no Facebook
- Aguarde 5-10 minutos
- Verifique Pixel ID e Access Token
- Veja logs do backend no Railway

### Admin panel não carrega
- Verifique se o backend está rodando
- Tente acessar /api/health
- Veja logs no Railway

---

## 📞 Suporte

Se tiver problemas:
1. Veja os logs no Railway (Deployments > Logs)
2. Veja o console do navegador (F12)
3. Verifique o Events Manager do Facebook

---

## 🎉 Pronto!

Seu sistema está em produção e pronto para receber tráfego real!

**Próximos passos:**
1. Adicionar mais eventos (PageView, InitiateCheckout)
2. Criar públicos personalizados
3. Otimizar campanhas baseado em dados
4. Escalar investimento

**Boa sorte com suas vendas! 🚀💰**
