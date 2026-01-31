# 🧪 Teste de Rastreamento WhatsApp

## ✅ Melhorias Implementadas

### 1. Lead ID Curto na Mensagem
**Antes:** UUID completo (36 caracteres)
```
9cef0605-1234-5678-90ab-cdef12345678
```

**Agora:** Apenas 8 primeiros caracteres
```
9cef0605
```

**Mensagem do WhatsApp:**
```
Olá, tenho interesse no acesso ao fabricante e aceito o valor de R$197 (ID: 9cef0605)
```

### 2. Logs Melhorados
Agora você pode ver exatamente o que está acontecendo no console do navegador!

---

## 🧪 Como Testar

### Passo 1: Abrir a Landing Page
1. Acesse: `https://contatofornecedor.netlify.app`
2. Abra o Console do navegador (F12 → Console)

### Passo 2: Verificar Logs Iniciais
Você deve ver:
```
🚀 Sistema de rastreamento iniciado
📊 Dados de rastreamento capturados: {...}
📤 Enviando lead para o backend...
✅ Lead registrado com sucesso!
Lead ID: 9cef0605-1234-5678-90ab-cdef12345678
✅ Link do WhatsApp atualizado
Lead ID completo: 9cef0605-1234-5678-90ab-cdef12345678
Lead ID curto: 9cef0605
✅ Rastreamento de clique no WhatsApp configurado
```

### Passo 3: Clicar no Botão WhatsApp
Você deve ver:
```
📱 Clique no botão WhatsApp detectado!
Lead ID recuperado do localStorage: 9cef0605-1234-5678-90ab-cdef12345678
✅ Evento Contact enviado para Facebook Pixel (browser)
📤 Enviando evento Contact para backend...
✅ Evento Contact enviado para Meta Conversions API com sucesso!
Meta Response: {...}
```

### Passo 4: Verificar Mensagem do WhatsApp
A mensagem deve ser:
```
Olá, tenho interesse no acesso ao fabricante e aceito o valor de R$197 (ID: 9cef0605)
```

---

## ❌ Problemas Comuns

### Problema 1: "Lead ID não encontrado"
**Sintoma:**
```
❌ Lead ID não encontrado! Evento Contact não será enviado.
```

**Solução:**
1. Recarregue a página
2. Aguarde 2-3 segundos antes de clicar no botão
3. Verifique se o backend está online

### Problema 2: "Botão WhatsApp não encontrado"
**Sintoma:**
```
❌ Botão WhatsApp não encontrado na página
```

**Solução:**
1. Verifique se a página carregou completamente
2. Procure por um elemento com classe `.cta-button`

### Problema 3: Evento não chega no Facebook
**Sintoma:**
- Logs mostram sucesso, mas evento não aparece no Events Manager

**Solução:**
1. Aguarde 10-15 minutos (delay normal do Facebook)
2. Verifique se o token de acesso está correto no `.env`
3. Verifique se o Pixel ID está correto

---

## 🔍 Debug Avançado

### Verificar localStorage
No console do navegador:
```javascript
// Ver Lead ID salvo
localStorage.getItem('lead_id')

// Ver dados de rastreamento
JSON.parse(localStorage.getItem('trackingData'))
```

### Verificar Cookies
No console do navegador:
```javascript
// Ver todos os cookies
document.cookie

// Ver _fbp
document.cookie.split(';').find(c => c.includes('_fbp'))

// Ver _fbc
document.cookie.split(';').find(c => c.includes('_fbc'))
```

### Testar Manualmente o Evento Contact
No console do navegador:
```javascript
const leadId = localStorage.getItem('lead_id');

fetch('https://contato-fornecedor-backend.onrender.com/api/whatsapp-click', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ lead_id: leadId })
})
.then(r => r.json())
.then(d => console.log('Resposta:', d));
```

---

## 📊 Fluxo Completo

```
1. Usuário acessa landing page
   ↓
2. Sistema captura UTMs e gera cookies (fbp, fbc)
   ↓
3. Sistema envia dados para backend
   ↓
4. Backend gera Lead ID (UUID)
   ↓
5. Backend salva no banco
   ↓
6. Backend retorna Lead ID para frontend
   ↓
7. Frontend salva Lead ID no localStorage
   ↓
8. Frontend atualiza link do WhatsApp com ID curto
   ↓
9. Usuário clica no botão WhatsApp
   ↓
10. Sistema envia evento Contact para Facebook (browser)
   ↓
11. Sistema envia evento Contact para backend
   ↓
12. Backend envia para Meta Conversions API
   ↓
13. Usuário é redirecionado para WhatsApp com mensagem + ID
```

---

## ✅ Checklist de Verificação

Antes de rodar campanhas, verifique:

- [ ] Landing page carrega sem erros
- [ ] Console mostra "Lead registrado com sucesso"
- [ ] Lead ID é salvo no localStorage
- [ ] Link do WhatsApp é atualizado
- [ ] Clique no WhatsApp dispara evento Contact
- [ ] Mensagem do WhatsApp contém ID curto
- [ ] Evento aparece no painel admin
- [ ] Evento aparece no Facebook Events Manager (10-15 min)

---

## 🆘 Suporte

Se algo não funcionar:

1. **Copie todos os logs do console**
2. **Tire screenshot do erro**
3. **Verifique se o backend está online:**
   - https://contato-fornecedor-backend.onrender.com/api/health

4. **Verifique se o frontend está online:**
   - https://contatofornecedor.netlify.app

---

## 📝 Resumo

✅ Lead ID curto (8 caracteres) na mensagem do WhatsApp
✅ Logs detalhados para debug
✅ Rastreamento de clique melhorado
✅ Mensagens de erro claras
✅ Verificação de Lead ID antes de enviar evento

Tudo pronto para rastrear corretamente! 🎉
