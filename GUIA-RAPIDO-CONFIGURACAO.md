# 🚀 Guia Rápido: Configurar Eventos do Facebook

## ⚡ Em 3 Passos Simples

### Passo 1: Acesse o Painel Admin
```
URL: https://seu-backend.onrender.com/admin.html
Senha: (sua senha do .env)
```

### Passo 2: Clique em "⚙️ Configurar Eventos"
Você verá um botão cinza no topo da página

### Passo 3: Habilite/Desabilite os Eventos
Use os botões de toggle (liga/desliga) para cada evento

---

## 📊 Eventos Disponíveis

| Evento | Quando Dispara | Recomendação |
|--------|----------------|--------------|
| **PageView** | Alguém visita a landing page | ✅ Sempre habilitado |
| **Contact** | Alguém clica no WhatsApp | ✅ Sempre habilitado |
| **Purchase** | Você marca uma venda no admin | ✅ Sempre habilitado |

---

## ✅ Configuração Recomendada para Campanha Ativa

```
PageView:  ✅ HABILITADO
Contact:   ✅ HABILITADO  
Purchase:  ✅ HABILITADO
```

**Por quê?**
- PageView: Facebook sabe quantas pessoas visitaram
- Contact: Facebook sabe quantas pessoas se interessaram
- Purchase: Facebook otimiza para quem realmente compra

---

## 🎯 Quando Desabilitar um Evento?

### Desabilite PageView se:
- ❌ Você não quer que o Facebook saiba sobre visitantes
- ❌ Está testando a página e não quer gastar budget

### Desabilite Contact se:
- ❌ Você não quer rastrear cliques no WhatsApp
- ❌ Está tendo muitos cliques mas poucas vendas

### Desabilite Purchase se:
- ❌ Você não quer que o Facebook saiba sobre vendas
- ❌ Está testando o sistema de vendas

---

## 💡 Dica Pro

**Deixe TUDO habilitado quando estiver rodando campanhas!**

O Facebook precisa de dados para otimizar suas campanhas. Quanto mais eventos você enviar, melhor o algoritmo vai funcionar.

---

## 🔍 Como Verificar se Está Funcionando

### No Painel Admin:
1. Faça uma ação (visite a página, clique no WhatsApp, marque uma venda)
2. Vá em "Ver Eventos" (se disponível)
3. Você verá o evento registrado

### No Facebook:
1. Acesse: https://business.facebook.com/events_manager2
2. Selecione seu Pixel
3. Vá em "Test Events" ou "Overview"
4. Aguarde 10-15 minutos
5. Você verá os eventos aparecendo

---

## ⚠️ Importante

- ✅ Configurações são salvas automaticamente
- ✅ Não precisa clicar em "Salvar"
- ✅ Mudanças aplicadas imediatamente
- ✅ Configurações ficam salvas mesmo se você sair

---

## 🆘 Problemas?

### Eventos não aparecem no Facebook?
1. Verifique se está HABILITADO nas configurações
2. Aguarde 10-15 minutos
3. Verifique o token no arquivo `.env`

### Configurações não salvam?
1. Verifique se está logado
2. Limpe o cache do navegador
3. Tente novamente

---

## 📞 Precisa de Ajuda?

Leia o guia completo: `CONFIGURACAO-EVENTOS-FACEBOOK.md`
