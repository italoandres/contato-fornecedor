# 🎯 Sistema de Configuração de Eventos do Facebook

## ✅ Problema Resolvido

Antes, os eventos do Facebook não ficavam salvos e você tinha que configurar toda vez. Agora criamos um **sistema de configuração persistente** que salva suas preferências no banco de dados!

## 🚀 Como Usar

### 1. Acessar o Painel de Configurações

1. Faça login no painel admin: `https://seu-backend.onrender.com/admin.html`
2. Clique no botão **"⚙️ Configurar Eventos"** no topo da página
3. Você será direcionado para a página de configurações

### 2. Configurar os Eventos

Na página de configurações você verá 3 eventos disponíveis:

#### 📊 **PageView**
- **O que é:** Disparado quando alguém visita a landing page
- **Quando usar:** Sempre habilitado para rastrear visitantes
- **Recomendação:** ✅ Manter HABILITADO

#### 📞 **Contact**
- **O que é:** Disparado quando alguém clica no botão WhatsApp
- **Quando usar:** Para rastrear interesse/engajamento
- **Recomendação:** ✅ Manter HABILITADO

#### 💰 **Purchase**
- **O que é:** Disparado quando você marca uma venda no painel admin
- **Quando usar:** Para otimizar campanhas para conversões
- **Recomendação:** ✅ Manter HABILITADO

### 3. Habilitar/Desabilitar Eventos

- Use o **botão de toggle** (liga/desliga) ao lado de cada evento
- A configuração é **salva automaticamente**
- Você verá uma mensagem de sucesso verde no topo
- As mudanças são aplicadas **imediatamente**

## 🔍 Como Funciona

### Quando um evento está HABILITADO ✅
- O evento é enviado para o Facebook Ads (Meta Conversions API)
- O evento é registrado no histórico do sistema
- Você pode ver o evento no Events Manager do Facebook

### Quando um evento está DESABILITADO ❌
- O evento **NÃO** é enviado para o Facebook
- O evento ainda é registrado no histórico do sistema (para sua análise)
- Útil para testes ou quando você não quer gastar budget

## 💾 Persistência dos Dados

As configurações são salvas em uma tabela no banco de dados SQLite:

```
event_config
├── PageView (habilitado/desabilitado)
├── Contact (habilitado/desabilitado)
└── Purchase (habilitado/desabilitado)
```

**Isso significa que:**
- ✅ As configurações ficam salvas mesmo se você fechar o navegador
- ✅ As configurações ficam salvas mesmo se o servidor reiniciar
- ✅ Você não precisa configurar toda vez que entrar no painel

## 🎯 Casos de Uso

### Cenário 1: Testando a Landing Page
```
PageView: ✅ HABILITADO
Contact: ❌ DESABILITADO
Purchase: ❌ DESABILITADO
```
Use quando estiver testando a página e não quiser enviar eventos para o Facebook ainda.

### Cenário 2: Campanha Ativa (Recomendado)
```
PageView: ✅ HABILITADO
Contact: ✅ HABILITADO
Purchase: ✅ HABILITADO
```
Use quando estiver rodando campanhas ativas no Facebook Ads.

### Cenário 3: Apenas Rastreando Vendas
```
PageView: ❌ DESABILITADO
Contact: ❌ DESABILITADO
Purchase: ✅ HABILITADO
```
Use se quiser enviar apenas eventos de compra para o Facebook.

## 🔧 Verificação Técnica

### Verificar no Código
O sistema verifica se o evento está habilitado antes de enviar:

```javascript
// Exemplo no código
if (db.isEventEnabled('Purchase')) {
  // Envia para o Facebook
  await meta.sendPurchaseEvent(eventData);
} else {
  // Não envia, apenas registra localmente
  console.log('Evento Purchase desabilitado');
}
```

### Verificar no Banco de Dados
Se você tiver acesso ao banco SQLite, pode verificar:

```sql
SELECT * FROM event_config;
```

Resultado esperado:
```
id | event_name | enabled | description                          | updated_at
1  | PageView   | 1       | Evento disparado quando...           | 2025-01-30 ...
2  | Contact    | 1       | Evento disparado quando...           | 2025-01-30 ...
3  | Purchase   | 1       | Evento disparado quando...           | 2025-01-30 ...
```

`enabled = 1` significa HABILITADO
`enabled = 0` significa DESABILITADO

## 📊 Monitoramento

### Ver Histórico de Eventos
1. No painel admin, clique em **"Ver Eventos"** (se disponível)
2. Você verá todos os eventos registrados, mesmo os desabilitados
3. Eventos desabilitados aparecem no histórico mas não foram enviados ao Facebook

### Verificar no Facebook
1. Acesse o Events Manager: https://business.facebook.com/events_manager2
2. Selecione seu Pixel
3. Vá em "Test Events" ou "Overview"
4. Você verá apenas os eventos que estão **HABILITADOS**

## ⚠️ Importante

1. **Configurações são por servidor:** Se você tiver múltiplos ambientes (dev, prod), cada um tem suas próprias configurações
2. **Não afeta eventos passados:** Desabilitar um evento não remove eventos já enviados ao Facebook
3. **Histórico local sempre salva:** Mesmo com eventos desabilitados, o histórico local continua funcionando

## 🆘 Troubleshooting

### Problema: Configurações não estão salvando
**Solução:** 
- Verifique se você está logado no painel admin
- Limpe o cache do navegador
- Verifique se o servidor backend está rodando

### Problema: Eventos não aparecem no Facebook
**Solução:**
- Verifique se o evento está HABILITADO nas configurações
- Aguarde 10-15 minutos (delay normal do Facebook)
- Verifique se o token de acesso está correto no `.env`

### Problema: Quero resetar as configurações
**Solução:**
- Acesse o painel de configurações
- Habilite todos os eventos manualmente
- Ou delete o arquivo `backend/leads.db` (isso apaga TUDO, cuidado!)

## 📝 Resumo

✅ **Agora você tem:**
- Sistema de configuração persistente de eventos
- Interface visual para habilitar/desabilitar eventos
- Configurações salvas no banco de dados
- Controle total sobre quais eventos enviar ao Facebook

✅ **Não precisa mais:**
- Configurar eventos toda vez que entrar no painel
- Editar código para habilitar/desabilitar eventos
- Se preocupar com configurações perdidas

🎉 **Pronto para rodar suas campanhas com confiança!**
