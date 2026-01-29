# 🔍 Como Verificar Eventos no Facebook Events Manager

## 📍 Onde Ver os Eventos

### Opção 1: Link Direto
Acesse diretamente seu Events Manager:
```
https://business.facebook.com/events_manager2/list/pixel/883207941199352/overview
```

### Opção 2: Navegação Manual
1. Acesse: https://business.facebook.com/
2. Clique em **"Gerenciador de Eventos"** no menu
3. Selecione seu Pixel: **883207941199352**

---

## 🧪 Eventos de Teste

### Como Enviar um Evento de Teste

1. **Acesse o painel admin:**
   ```
   http://localhost:3000/admin.html
   ```

2. **Faça login** com a senha: `admin123`

3. **Clique no botão azul:** `🧪 Enviar Evento Teste`

4. **Confirme o envio**

5. **Verifique no Facebook:**
   - Acesse: Events Manager > **Test Events**
   - Ou: https://business.facebook.com/events_manager2/list/pixel/883207941199352/test_events

### O que Esperar

✅ **Evento de teste enviado com sucesso!**
- Aparece na aba **"Test Events"** (não em Overview)
- Mostra: Purchase de R$ 597,00
- Status: Test Event

---

## 📊 Eventos Reais (de Produção)

### Quando Aparecem?

Os eventos reais podem demorar alguns minutos para aparecer no Events Manager:
- **Imediato a 5 minutos:** Eventos aparecem em "Recent Activity"
- **Até 20 minutos:** Dados completos processados
- **Até 48 horas:** Atribuição completa de conversões

### Onde Ver?

1. **Overview Tab:**
   - Mostra todos os eventos recebidos
   - Gráficos de atividade
   - Métricas de conversão

2. **Data Sources Tab:**
   - Conversions API (eventos do backend)
   - Browser Pixel (eventos do navegador)

3. **Diagnostics Tab:**
   - Qualidade dos eventos
   - Erros e avisos
   - Score de qualidade

---

## 🎯 Como Testar o Fluxo Completo

### Passo 1: Acessar Landing Page com UTMs
```
http://localhost:3000/index.html?utm_source=facebook&utm_medium=cpc&utm_campaign=teste_manual&fbclid=test123456
```

### Passo 2: Verificar Console do Navegador
Pressione **F12** e veja:
```
📊 Dados de rastreamento capturados
✅ Lead registrado com sucesso!
Lead ID: xxxxx
```

### Passo 3: Ver Lead no Painel Admin
1. Acesse: http://localhost:3000/admin.html
2. Login: admin123
3. Veja o lead na tabela

### Passo 4: Marcar Venda
1. Clique em **"Marcar Venda"** no lead
2. Digite o valor: 597
3. Confirme

### Passo 5: Verificar no Facebook
1. Acesse Events Manager
2. Vá em **Overview** ou **Test Events**
3. Veja o evento **Purchase** recebido

---

## ⚠️ Troubleshooting

### Evento não aparece no Facebook

**Possíveis causas:**

1. **Demora normal:**
   - Aguarde até 5 minutos
   - Recarregue a página do Events Manager

2. **Pixel ID incorreto:**
   - Verifique em `backend/.env`
   - Deve ser: `883207941199352`

3. **Access Token inválido:**
   - Token pode ter expirado
   - Gere um novo token no Facebook
   - Atualize em `backend/.env`

4. **Eventos de teste vs produção:**
   - Eventos de teste aparecem em **Test Events**
   - Eventos reais aparecem em **Overview**

### Como Verificar se o Token Está Válido

No terminal do backend, você verá:
```
✅ Evento enviado com sucesso!
Resposta Meta: {"events_received": 1, "messages": []}
```

Se aparecer `"events_received": 1`, o evento foi aceito pelo Facebook!

### Erros Comuns

**Erro: Invalid Access Token**
- Solução: Gere um novo token no Facebook

**Erro: Invalid Pixel ID**
- Solução: Verifique o Pixel ID no .env

**Erro: CORS**
- Solução: Acesse a landing page via localhost:3000, não file://

---

## 📈 Métricas Importantes

### No Events Manager, verifique:

1. **Event Match Quality (EMQ):**
   - Score de 0 a 10
   - Quanto maior, melhor a atribuição
   - Objetivo: 6.0 ou mais

2. **Events Received:**
   - Quantos eventos o Facebook recebeu
   - Deve bater com suas vendas

3. **Attribution:**
   - Quais campanhas geraram conversões
   - ROI por campanha

---

## 🚀 Próximos Passos

### Para Produção:

1. **Deploy do backend** em servidor cloud
2. **Deploy da landing page** com domínio próprio
3. **Configurar HTTPS** (obrigatório!)
4. **Criar campanhas reais** no Facebook Ads
5. **Monitorar eventos** diariamente

### Links Úteis:

- **Events Manager:** https://business.facebook.com/events_manager2
- **Conversions API Docs:** https://developers.facebook.com/docs/marketing-api/conversions-api
- **Pixel Helper (Chrome Extension):** https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc

---

## ✅ Checklist de Verificação

- [ ] Pixel ID configurado corretamente
- [ ] Access Token válido
- [ ] Backend rodando (localhost:3000)
- [ ] Landing page acessível
- [ ] Console mostra "Lead registrado"
- [ ] Painel admin mostra leads
- [ ] Venda marcada com sucesso
- [ ] Evento aparece no Events Manager
- [ ] EMQ Score acima de 6.0

---

**Tudo funcionando? Parabéns! 🎉**

Seu sistema de rastreamento está operacional e pronto para otimizar suas campanhas no Facebook!

