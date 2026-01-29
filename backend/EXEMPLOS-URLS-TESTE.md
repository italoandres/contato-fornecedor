# 🧪 Exemplos de URLs para Teste

## URLs de Teste com Parâmetros UTM

Use estas URLs para testar o rastreamento completo:

### Teste 1: Facebook Ads - Campanha Básica
```
file:///C:/contato-fornecedor/src/index.html?utm_source=facebook&utm_medium=cpc&utm_campaign=polo-fabricante&fbclid=IwAR1234567890abcdef
```

### Teste 2: Facebook Ads - Com Conteúdo Específico
```
file:///C:/contato-fornecedor/src/index.html?utm_source=facebook&utm_medium=cpc&utm_campaign=polo-fabricante&utm_content=video-anuncio-1&fbclid=IwAR9876543210zyxwvu
```

### Teste 3: Instagram Ads
```
file:///C:/contato-fornecedor/src/index.html?utm_source=instagram&utm_medium=cpc&utm_campaign=polo-fabricante-stories&utm_content=story-1&fbclid=IwARabcdefghijk123456
```

### Teste 4: Google Ads (sem fbclid)
```
file:///C:/contato-fornecedor/src/index.html?utm_source=google&utm_medium=cpc&utm_campaign=polo-fabricante&utm_content=anuncio-texto
```

### Teste 5: Tráfego Orgânico (sem UTMs)
```
file:///C:/contato-fornecedor/src/index.html
```

---

## Como Usar

1. **Copie uma das URLs acima**
2. **Substitua** `C:/contato-fornecedor` pelo caminho real da sua pasta
3. **Cole no navegador** e pressione Enter
4. **Abra o Console** (F12) para ver os logs
5. **Verifique no painel admin** se o lead foi registrado

---

## O que Cada Parâmetro Significa

| Parâmetro | Descrição | Exemplo |
|-----------|-----------|---------|
| `utm_source` | Origem do tráfego | facebook, instagram, google |
| `utm_medium` | Tipo de mídia | cpc, social, email |
| `utm_campaign` | Nome da campanha | polo-fabricante, lancamento-2024 |
| `utm_content` | Variação do anúncio | video-1, imagem-2, story-1 |
| `fbclid` | Facebook Click ID | IwAR... (gerado automaticamente) |

---

## URLs para Produção

Quando você colocar o site no ar, as URLs serão assim:

### Exemplo com domínio próprio:
```
https://seu-dominio.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=polo-fabricante&fbclid=IwAR1234567890
```

### Como configurar no Facebook Ads:

1. **URL de Destino:**
```
https://seu-dominio.com/
```

2. **Parâmetros de URL (adicionar automaticamente):**
- Ative "Criar parâmetros de URL"
- O Facebook adiciona o `fbclid` automaticamente

3. **UTMs Personalizados:**
```
utm_source=facebook
utm_medium=cpc
utm_campaign={{campaign.name}}
utm_content={{ad.name}}
```

O Facebook substitui automaticamente:
- `{{campaign.name}}` → Nome da campanha
- `{{ad.name}}` → Nome do anúncio
- `{{adset.name}}` → Nome do conjunto de anúncios

---

## Testando o Fluxo Completo

### Passo a Passo:

1. **Abra uma URL de teste** (com UTMs)
2. **Veja no Console:**
   ```
   📊 Dados de rastreamento capturados: {
     utm_source: "facebook",
     utm_campaign: "polo-fabricante",
     fbclid: "IwAR1234567890",
     fbp: "fb.1.1234567890.123456789",
     fbc: "fb.1.1234567890.IwAR1234567890"
   }
   ```

3. **Veja no Console:**
   ```
   ✅ Lead registrado com sucesso!
   Lead ID: abc123de-4567-89fg-hijk-lmnopqrstuv
   ```

4. **Clique no botão WhatsApp**
   - A mensagem deve incluir o Lead ID

5. **Acesse o painel admin**
   - O lead deve aparecer na lista
   - Com os UTMs corretos

6. **Marque como vendido**
   - Digite o valor: 997.00
   - Confirme

7. **Veja no Console do servidor:**
   ```
   📤 Enviando evento Purchase para Meta...
   ✅ Evento enviado com sucesso!
   ```

8. **Verifique no Facebook Events Manager**
   - Acesse: https://business.facebook.com/events_manager
   - Vá em "Test Events" ou "Eventos"
   - O evento "Purchase" deve aparecer

---

## Simulando Múltiplos Leads

Para testar com vários leads diferentes:

1. Abra a URL de teste
2. Feche a aba
3. Abra novamente (novo lead será criado)
4. Repita várias vezes

Ou use diferentes navegadores/abas anônimas para simular usuários diferentes.

---

## Verificando os Cookies

Para ver os cookies gerados:

1. Abra a landing page
2. Pressione F12 (Console)
3. Vá na aba "Application" (Chrome) ou "Storage" (Firefox)
4. Clique em "Cookies"
5. Você deve ver:
   - `_fbp` → Cookie do Facebook Pixel
   - `_fbc` → Cookie do Facebook Click (se tiver fbclid)

---

## Dicas de Teste

✅ **Sempre teste com:**
- Diferentes fontes (facebook, instagram, google)
- Com e sem fbclid
- Diferentes campanhas
- Múltiplos leads

✅ **Verifique:**
- Logs do Console do navegador
- Logs do servidor backend
- Painel administrativo
- Facebook Events Manager

✅ **Limpe os dados entre testes:**
- Limpe localStorage: `localStorage.clear()`
- Limpe cookies: Configurações → Privacidade → Limpar dados
- Ou use aba anônima

---

## Troubleshooting

### Lead não aparece no painel
- Verifique se o backend está rodando
- Veja o Console do navegador (F12)
- Veja os logs do servidor

### fbclid não está sendo capturado
- Verifique se está na URL
- Veja o Console: deve aparecer em "Dados de rastreamento"

### Evento não chega no Facebook
- Verifique as credenciais no `.env`
- Teste a conexão: http://localhost:3000/api/test-meta
- Veja os logs do servidor

---

**Bons testes! 🚀**
