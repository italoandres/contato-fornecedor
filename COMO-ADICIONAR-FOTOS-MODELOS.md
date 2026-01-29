# 📸 Como Adicionar as Fotos dos Modelos

## Passo a Passo:

### 1️⃣ Prepare suas 4 fotos
Você precisa de 4 fotos de modelos vestindo as camisas polo.

**Dicas para as fotos:**
- ✅ Modelos reais usando as polos
- ✅ Fundo limpo e claro
- ✅ Boa iluminação
- ✅ Foco no produto
- ✅ Diferentes ângulos ou cores

### 2️⃣ Renomeie as fotos
Renomeie suas 4 fotos para:
- `modelo1.jpg`
- `modelo2.jpg`
- `modelo3.jpg`
- `modelo4.jpg`

**IMPORTANTE:** Use letra minúscula e extensão `.jpg` ou `.png`

### 3️⃣ Copie para a pasta correta
Copie as 4 fotos para:
```
C:\contato-fornecedor\src\images\
```

### 4️⃣ Verifique
Dentro da pasta `images`, você deve ter:
```
📁 images/
  🖼️ modelo1.jpg
  🖼️ modelo2.jpg
  🖼️ modelo3.jpg
  🖼️ modelo4.jpg
  🖼️ Captura-1.png (avaliações)
  🖼️ Captura-2.png (avaliações)
  🖼️ Captura-3.png (avaliações)
```

### 5️⃣ Teste o carrossel
1. Abra `src/index.html` no navegador
2. Role até a seção "Fotos reais do produto"
3. Clique nas setas `‹` e `›` para navegar
4. Em dispositivos móveis, deslize o dedo (swipe)

---

## 🔧 Se usar imagens PNG em vez de JPG:

Se suas fotos são `.png` em vez de `.jpg`:

1. Abra `src/index.html` no Bloco de Notas
2. Procure por estas 4 linhas:
   ```html
   <img src="images/modelo1.jpg"
   <img src="images/modelo2.jpg"
   <img src="images/modelo3.jpg"
   <img src="images/modelo4.jpg"
   ```
3. Troque `.jpg` por `.png` nas 4 linhas
4. Salve o arquivo
5. Atualize a página (F5)

---

## 📐 Tamanho Recomendado das Imagens:

**Ideal:**
- Largura: 800-1200px
- Altura: 1000-1500px (formato retrato)
- Proporção: 2:3 ou 3:4
- Formato: JPG (menor tamanho de arquivo)
- Qualidade: 80-90%

**Máximo:**
- Não ultrapasse 2MB por imagem
- Imagens muito grandes deixam o site lento

---

## 🎨 Como Funciona o Carrossel:

### No Desktop:
- Clique nas setas `‹` e `›` para navegar
- Transição suave entre as fotos

### No Mobile:
- Deslize o dedo para a esquerda (próxima foto)
- Deslize o dedo para a direita (foto anterior)
- Funciona como Instagram Stories

### Loop Infinito:
- Ao chegar na última foto, volta para a primeira
- Ao voltar da primeira, vai para a última

---

## ❌ Problemas Comuns:

**As fotos não aparecem:**
- ✅ Verifique se os nomes estão corretos (modelo1, modelo2, etc)
- ✅ Verifique se estão na pasta `src/images/`
- ✅ Verifique se a extensão está correta (.jpg ou .png)
- ✅ Atualize a página com F5

**As fotos aparecem cortadas:**
- Use fotos em formato retrato (vertical)
- Proporção ideal: 2:3 ou 3:4

**O carrossel não funciona:**
- Abra o Console (F12) e veja se há erros
- Verifique se o arquivo `main.js` está carregando

**As setas não aparecem:**
- Verifique se o CSS está carregando
- Tente atualizar a página (Ctrl + F5)

---

## 💡 Dicas Extras:

### Otimizar Imagens:
Use ferramentas online gratuitas para reduzir o tamanho:
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/
- Compressor.io: https://compressor.io/

### Editar Fotos:
Se precisar editar as fotos:
- Remover fundo: https://remove.bg/
- Ajustar brilho/contraste: Photopea (https://photopea.com/)
- Redimensionar: ILoveIMG (https://iloveimg.com/)

---

## ✅ Checklist:

- [ ] 4 fotos preparadas
- [ ] Fotos renomeadas (modelo1, modelo2, modelo3, modelo4)
- [ ] Fotos copiadas para `src/images/`
- [ ] Extensão correta (.jpg ou .png)
- [ ] Página atualizada (F5)
- [ ] Carrossel funcionando
- [ ] Setas clicáveis
- [ ] Swipe funcionando no mobile

---

**Pronto! Suas fotos dos modelos estão no ar! 🎉**
