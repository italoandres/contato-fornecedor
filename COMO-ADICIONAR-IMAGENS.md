# 📸 Como Adicionar as Imagens de Avaliações

## Passo a Passo Simples:

### 1️⃣ Localize suas imagens
Encontre as 3 imagens de avaliações que você quer usar.

### 2️⃣ Renomeie as imagens
Renomeie suas imagens para:
- `Captura-1.png` (ou .jpg)
- `Captura-2.png` (ou .jpg)
- `Captura-3.png` (ou .jpg)

**IMPORTANTE:** O nome deve começar com letra maiúscula "C"

### 3️⃣ Copie para a pasta correta
Copie as 3 imagens para esta pasta:
```
C:\contato-fornecedor\src\images\
```

### 4️⃣ Verifique se está correto
Dentro da pasta `images`, você deve ter:
```
📁 images/
  📄 LEIA-ME.txt
  🖼️ Captura-1.png
  🖼️ Captura-2.png
  🖼️ Captura-3.png
```

### 5️⃣ Atualize a página
- Abra a página no navegador (se já estiver aberta)
- Pressione **F5** para atualizar
- As imagens devem aparecer!

---

## 🔧 Se usar imagens JPG em vez de PNG:

Se suas imagens são `.jpg` em vez de `.png`, você precisa ajustar o código:

1. Abra o arquivo `src/index.html` no Bloco de Notas
2. Procure por estas 3 linhas:
   ```html
   <img src="images/Captura-1.png"
   <img src="images/Captura-2.png"
   <img src="images/Captura-3.png"
   ```
3. Troque `.png` por `.jpg` nas 3 linhas
4. Salve o arquivo
5. Atualize a página (F5)

---

## ❌ Problemas comuns:

**As imagens não aparecem:**
- ✅ Verifique se os nomes estão corretos (com C maiúsculo)
- ✅ Verifique se as imagens estão na pasta `src/images/`
- ✅ Verifique se a extensão está correta (.png ou .jpg)
- ✅ Atualize a página com F5

**As imagens aparecem quebradas (ícone de imagem quebrada):**
- O caminho está errado ou o nome do arquivo não corresponde
- Verifique novamente os nomes dos arquivos

---

## 💡 Dica:

Para ver se as imagens estão no lugar certo, abra o Explorador de Arquivos e cole este caminho:
```
C:\contato-fornecedor\src\images
```

Você deve ver suas 3 imagens lá dentro!
