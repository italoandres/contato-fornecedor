# Design Document: Landing Page Fabricante Polo

## Overview

Esta landing page é uma aplicação web estática de página única (SPA) focada em conversão qualificada. O design prioriza simplicidade, transparência e filtragem de público. A página será implementada com HTML5, CSS3 e JavaScript vanilla para máxima performance e compatibilidade.

A arquitetura é deliberadamente minimalista: uma única página HTML com CSS inline ou externo mínimo, sem dependências de frameworks pesados. O objetivo é carregamento rápido (< 2s) e funcionamento em qualquer dispositivo.

## Architecture

### Estrutura de Componentes

```
Landing Page
├── Header Section
│   ├── Headline Principal
│   └── Subheadline
├── Qualification Block (Anti-Curioso)
├── Offer Description Section
├── Transparency Block (O que NÃO está incluído)
├── Scarcity Section
├── Social Proof Section
├── Price Block
│   ├── Price Display (R$ 997,00)
│   ├── Price Explanation
│   ├── Anti-Curious Reinforcement
│   └── Value Anchoring
└── CTA Section
    ├── WhatsApp Button (com texto sobre aceitar valor)
    ├── Confirmation Subtext
    └── Micro-Scarcity Message
```

### Fluxo de Informação

1. **Entrada**: Visitante acessa a URL da landing page
2. **Qualificação Visual**: Headline + Bloco de Qualificação filtram curiosos
3. **Educação**: Seções de oferta e transparência educam o visitante
4. **Urgência**: Escassez realista motiva ação
5. **Credibilidade**: Prova social reforça confiança
6. **Conversão**: CTA único direciona para WhatsApp

### Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Responsividade**: CSS Media Queries
- **Fontes**: System fonts ou Google Fonts (máximo 1 família)
- **Ícones**: Unicode ou SVG inline (sem bibliotecas externas)
- **Analytics** (opcional): Google Analytics ou similar via script tag

## Components and Interfaces

### 1. Header Component

**Responsabilidade**: Comunicar a proposta de valor imediatamente

**Estrutura**:
```html
<header>
  <h1>Headline Principal</h1>
  <p class="subheadline">Subheadline</p>
</header>
```

**Estilo**:
- Headline: fonte 32-48px, peso bold, cor escura (#333)
- Subheadline: fonte 18-24px, peso normal, cor média (#666)
- Alinhamento: centralizado
- Espaçamento: padding vertical generoso (60-80px)

### 2. Qualification Block Component

**Responsabilidade**: Filtrar visitantes não qualificados

**Estrutura**:
```html
<section class="qualification-block">
  <div class="warning-icon">⚠️</div>
  <p><strong>Atenção:</strong> Essa oportunidade é para quem já vende ou pretende revender roupas. Não é curso, não é franquia, não é renda fácil.</p>
</section>
```

**Estilo**:
- Background: amarelo claro (#FFF9E6) ou laranja suave (#FFF4E6)
- Border: 2px solid #FFD700
- Padding: 20-30px
- Ícone: tamanho 32px
- Texto: fonte 16-18px, peso medium

### 3. Offer Description Component

**Responsabilidade**: Explicar claramente o que está sendo vendido

**Estrutura**:
```html
<section class="offer-description">
  <h2>O que você está adquirindo</h2>
  <ul>
    <li>Contato direto de fabricante ativo no Brasil</li>
    <li>Produção de polo na marca do comprador</li>
    <li>Valor unitário a partir de R$16</li>
    <li>Quantidade mínima exigida pelo fabricante</li>
    <li>Envio para todo o Brasil</li>
  </ul>
  <p class="highlight">Você paga pelo acesso direto ao fabricante, não por um produto pronto.</p>
</section>
```

**Estilo**:
- Lista: marcadores simples, espaçamento 12-16px entre itens
- Highlight: background cinza claro, padding 15px, border-left 4px solid
- Fonte: 16-18px

### 4. Transparency Block Component

**Responsabilidade**: Aumentar confiança através da transparência

**Estrutura**:
```html
<section class="transparency-block">
  <h2>O que NÃO está incluído</h2>
  <ul class="not-included">
    <li>❌ Não inclui registro de marca</li>
    <li>❌ Não inclui gestão de vendas</li>
    <li>❌ Não inclui anúncios ou garantia de lucro</li>
    <li>❌ Não inclui exclusividade vitalícia</li>
  </ul>
  <p>Esse acesso não garante sucesso. Ele elimina um dos maiores gargalos: o fornecedor.</p>
</section>
```

**Estilo**:
- Background: branco ou cinza muito claro (#F9F9F9)
- Lista: sem marcadores padrão, ícone ❌ inline
- Espaçamento: 12-16px entre itens
- Texto final: itálico ou peso medium

### 5. Scarcity Section Component

**Responsabilidade**: Criar urgência realista

**Estrutura**:
```html
<section class="scarcity">
  <h2>Disponibilidade limitada</h2>
  <p>O fabricante trabalha com produção limitada. O acesso é liberado manualmente e pode ser pausado a qualquer momento. Nem todo perfil é aprovado.</p>
</section>
```

**Estilo**:
- Texto: 16-18px, alinhamento centralizado
- Padding: 40-60px vertical
- Sem elementos visuais agressivos (sem timers, sem contadores)

### 6. Social Proof Component

**Responsabilidade**: Demonstrar credibilidade

**Estrutura**:
```html
<section class="social-proof">
  <h2>Sobre o fabricante</h2>
  <ul>
    <li>Mais de [X] anos de produção</li>
    <li>Atende lojistas em diferentes estados</li>
    <li>Produção recorrente, não experimental</li>
  </ul>
</section>
```

**Estilo**:
- Lista: centralizada, marcadores discretos
- Fonte: 16-18px
- Sem depoimentos ou números de vendas

### 7. Price Block Component

**Responsabilidade**: Exibir o preço de forma clara e filtrar curiosos

**Estrutura**:
```html
<section class="price-block">
  <h2>Acesso ao fabricante:</h2>
  <div class="price-display">
    <span class="price-icon">💰</span>
    <span class="price-value">R$ 997,00</span>
    <span class="price-term">(pagamento único)</span>
  </div>
  <p class="price-explanation">Esse valor é referente exclusivamente ao acesso direto ao contato do fabricante.</p>
  <p class="anti-curious-reinforcement">Se você está buscando renda fácil, cursos ou promessas, essa página não é para você.</p>
  <p class="value-anchoring">Uma única produção acima de 100 unidades já pode compensar esse acesso.</p>
</section>
```

**Estilo**:
- Background: branco ou cinza muito claro com borda destacada
- Price display: fonte grande (36-48px), peso bold, cor escura
- Ícone: tamanho 32-40px
- Price term: fonte menor (16-18px), peso normal
- Explanation: fonte 16px, cor média
- Anti-curious: fonte 16px, peso medium, cor de alerta (#D97706)
- Value anchoring: fonte 16px, itálico, cor média
- Padding: 30-40px
- Border: 2px solid ou sombra destacada
- Alinhamento: centralizado

### 8. CTA Component

**Responsabilidade**: Converter visitante qualificado em lead após visualização do preço

**Estrutura**:
```html
<section class="cta-section">
  <a href="https://wa.me/5511999999999?text=Olá,%20tenho%20interesse%20no%20acesso%20ao%20fabricante%20e%20aceito%20o%20valor%20de%20R$997" 
     class="cta-button" 
     target="_blank">
    Tenho interesse e aceito o valor
  </a>
  <p class="cta-subtext">Você será direcionado para o WhatsApp para confirmação.</p>
  <p class="micro-scarcity">O acesso é liberado manualmente verificando primeiro se o fabricante atingiu sua capacidade.</p>
</section>
```

**Estilo**:
- Botão: 
  - Background: verde WhatsApp (#25D366) ou cor de destaque
  - Padding: 18-24px horizontal, 12-16px vertical
  - Border-radius: 8-12px
  - Fonte: 18-20px, peso bold, cor branca
  - Hover: escurecer 10%
  - Sombra sutil
- Subtext: fonte 14px, cor cinza (#888), margin-top 16px
- Micro-scarcity: fonte 14px, cor média (#666), margin-top 12px, itálico
- Alinhamento: centralizado

## Data Models

### Page Configuration Object

```javascript
const pageConfig = {
  headline: "Fabricante direto de Camisa Polo na sua marca por R$16 a unidade",
  subheadline: "Acesso direto à produção, sem intermediários e sem promessa milagrosa",
  price: "997,00",
  priceCurrency: "R$",
  priceIcon: "💰",
  priceTerm: "pagamento único",
  whatsappNumber: "5511999999999",
  whatsappMessage: "Olá, tenho interesse no acesso ao fabricante e aceito o valor de R$997",
  fabricanteYears: "10", // Ajustar conforme realidade
  offerItems: [
    "Contato direto de fabricante ativo no Brasil",
    "Produção de polo na marca do comprador",
    "Valor unitário a partir de R$16",
    "Quantidade mínima exigida pelo fabricante",
    "Envio para todo o Brasil"
  ],
  notIncluded: [
    "Não inclui registro de marca",
    "Não inclui gestão de vendas",
    "Não inclui anúncios ou garantia de lucro",
    "Não inclui exclusividade vitalícia"
  ],
  valueAnchoring: "Uma única produção acima de 100 unidades já pode compensar esse acesso.",
  antiCuriousReinforcement: "Se você está buscando renda fácil, cursos ou promessas, essa página não é para você.",
  microScarcity: "O acesso é liberado manualmente verificando primeiro se o fabricante atingiu sua capacidade."
};
```

### Analytics Event Object (opcional)

```javascript
const analyticsEvent = {
  eventName: "cta_click",
  timestamp: Date.now(),
  userAgent: navigator.userAgent,
  referrer: document.referrer
};
```

## Correctness Properties

*Uma propriedade é uma característica ou comportamento que deve ser verdadeiro em todas as execuções válidas do sistema - essencialmente, uma declaração formal sobre o que o sistema deve fazer. As propriedades servem como ponte entre especificações legíveis por humanos e garantias de corretude verificáveis por máquina.*


### Property 1: Estrutura do Header Completa
*Para qualquer* configuração da landing page, o header deve conter uma headline com os elementos obrigatórios (produto "polo", valor "R$16", proposta "marca própria") e uma subheadline mencionando ausência de intermediários.
**Validates: Requirements 1.1, 1.2**

### Property 2: Headline como Primeiro Elemento
*Para qualquer* renderização da landing page, a headline deve ser o primeiro elemento visível no DOM, aparecendo antes de qualquer outro conteúdo principal.
**Validates: Requirements 1.4**

### Property 3: Bloco de Qualificação Posicionado Corretamente
*Para qualquer* renderização da landing page, o bloco de qualificação deve aparecer imediatamente após o header e antes da descrição da oferta.
**Validates: Requirements 2.1**

### Property 4: Conteúdo do Bloco de Qualificação Completo
*Para qualquer* configuração da landing page, o bloco de qualificação deve conter: aviso para revendedores, negação explícita de ser curso, negação de ser franquia, e negação de ser renda fácil.
**Validates: Requirements 2.2, 2.3**

### Property 5: Elementos Obrigatórios da Oferta Presentes
*Para qualquer* configuração da landing page, a seção de oferta deve listar todos os 5 elementos obrigatórios (contato direto, produção na marca, valor R$16, quantidade mínima, envio nacional) e explicitar que o pagamento é pelo acesso, não pelo produto físico.
**Validates: Requirements 3.1, 3.2, 3.3**

### Property 6: Estrutura do Bloco de Transparência Completa
*Para qualquer* configuração da landing page, o bloco de transparência deve listar os 4 itens não incluídos (registro de marca, gestão de vendas, anúncios/garantia de lucro, exclusividade vitalícia) com ícones de negação (❌), e incluir texto sobre não garantir sucesso mas eliminar gargalo.
**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 7: Conteúdo de Escassez Realista
*Para qualquer* configuração da landing page, a seção de escassez deve mencionar produção limitada, liberação controlada/manual, e aprovação seletiva de perfis, sem conter contadores numéricos ou timers de countdown.
**Validates: Requirements 5.2, 5.3, 5.4, 5.5**

### Property 8: Elementos de Prova Social Adequados
*Para qualquer* configuração da landing page, a seção de prova social deve incluir informações sobre anos de produção, abrangência geográfica e natureza recorrente, sem mencionar resultados de clientes (lucro, vendas, ganhos).
**Validates: Requirements 6.2, 6.4**

### Property 9: Bloco de Preço Completo
*Para qualquer* configuração da landing page, o bloco de preço deve exibir o valor "R$ 997,00" com ícone monetário (💰), termo "pagamento único", texto explicativo sobre o valor ser referente ao acesso, reforço anti-curioso sobre não ser renda fácil/curso, e frase de ancoragem de valor mencionando produção de unidades.
**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

### Property 10: Ancoragem de Valor Sem Promessas
*Para qualquer* texto de ancoragem de valor na landing page, deve conter comparativo lógico baseado em produção sem prometer lucro ou garantir retorno financeiro.
**Validates: Requirements 8.1, 8.2, 8.3, 8.4**

### Property 11: CTA Alinhado com Preço
*Para qualquer* renderização da landing page, deve existir exatamente um botão CTA principal após o bloco de preço, contendo texto sobre aceitar o valor, com link para WhatsApp incluindo o valor no parâmetro de mensagem, subtexto sobre direcionamento para confirmação, e mensagem de micro-escassez sobre liberação manual.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**

### Property 12: Ausência de Frases Ambíguas no CTA
*Para qualquer* texto do botão CTA ou elementos próximos, não deve conter frases ambíguas como "Saiba mais", "Descubra", "Veja se você se qualifica".
**Validates: Requirements 9.6**

### Property 13: Micro-Escassez Coerente
*Para qualquer* configuração da landing page, a mensagem de micro-escassez deve mencionar liberação manual e verificação de capacidade do fabricante, sem conter contadores numéricos, timers ou urgência artificial.
**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

### Property 14: Design Visual Limpo
*Para qualquer* renderização da landing page, o fundo deve usar cores neutras (branco ou cinza claro com luminosidade > 90%), e o número de imagens deve estar entre 1 e 3.
**Validates: Requirements 8.1, 8.3**

### Property 11: Responsividade Mobile
*Para qualquer* largura de viewport entre 320px e 1920px, todos os elementos da landing page devem permanecer visíveis e legíveis sem overflow horizontal.
**Validates: Requirements 8.5**

### Property 12: Ausência de Linguagem Exagerada
*Para qualquer* texto exibido na landing page, não deve conter palavras de linguagem de guru (garantido, milagroso, revolucionário, transformador) ou superlativos exagerados (melhor do mundo, único, incrível, extraordinário).
**Validates: Requirements 9.2, 9.3**

## Error Handling

### Casos de Erro Previstos

1. **Link do WhatsApp Inválido**
   - Validar formato do número de telefone
   - Fallback: exibir mensagem de erro se link não puder ser gerado

2. **Imagens Não Carregadas**
   - Usar lazy loading para imagens
   - Fallback: exibir placeholder ou ocultar imagem com graceful degradation
   - Não bloquear renderização da página

3. **JavaScript Desabilitado**
   - Página deve funcionar completamente sem JavaScript
   - Todos os elementos são HTML/CSS puros
   - Link do WhatsApp funciona como link direto

4. **Navegadores Antigos**
   - Usar CSS com fallbacks para propriedades modernas
   - Testar em navegadores com pelo menos 2 anos de idade
   - Garantir funcionalidade básica mesmo sem suporte a features modernas

5. **Viewport Muito Pequeno (< 320px)**
   - Manter legibilidade mínima
   - Permitir scroll horizontal se necessário
   - Não quebrar layout completamente

## Testing Strategy

### Abordagem Dual de Testes

Esta landing page será testada usando duas abordagens complementares:

1. **Testes Unitários**: Verificam exemplos específicos, casos extremos e condições de erro
2. **Testes Baseados em Propriedades**: Verificam propriedades universais através de múltiplas entradas

Ambos são necessários para cobertura abrangente. Testes unitários capturam bugs concretos, enquanto testes de propriedade verificam corretude geral.

### Framework de Property-Based Testing

**Biblioteca escolhida**: **fast-check** (JavaScript/TypeScript)

Justificativa:
- Biblioteca madura e bem mantida para JavaScript
- Suporte a geradores customizados
- Integração fácil com Jest ou Mocha
- Documentação completa

**Configuração**:
- Mínimo de 100 iterações por teste de propriedade
- Cada teste deve referenciar a propriedade do design
- Formato de tag: `// Feature: landing-page-fabricante-polo, Property X: [texto da propriedade]`

### Estratégia de Testes Unitários

**Foco dos testes unitários**:
- Exemplos específicos de conteúdo correto
- Casos extremos (viewport muito pequeno, textos muito longos)
- Condições de erro (imagens não carregadas, links inválidos)
- Integração entre componentes visuais

**Ferramentas**:
- Jest para test runner
- jsdom ou Puppeteer para renderização
- Lighthouse CI para performance e acessibilidade

### Estratégia de Testes de Propriedade

**Foco dos testes de propriedade**:
- Presença de elementos obrigatórios em qualquer configuração
- Estrutura do DOM mantida independente do conteúdo
- Ausência de elementos proibidos (linguagem exagerada, múltiplos CTAs)
- Responsividade em qualquer largura de viewport

**Geradores Customizados**:
```javascript
// Gerador de configuração de página
const pageConfigArbitrary = fc.record({
  headline: fc.string({ minLength: 20, maxLength: 100 }),
  subheadline: fc.string({ minLength: 20, maxLength: 150 }),
  whatsappNumber: fc.string({ minLength: 13, maxLength: 15 }),
  fabricanteYears: fc.integer({ min: 1, max: 50 }).map(String),
  offerItems: fc.array(fc.string(), { minLength: 5, maxLength: 5 }),
  notIncluded: fc.array(fc.string(), { minLength: 4, maxLength: 4 })
});

// Gerador de largura de viewport
const viewportWidthArbitrary = fc.integer({ min: 320, max: 1920 });
```

### Implementação de Cada Propriedade

Cada uma das 12 propriedades de corretude deve ser implementada como um ÚNICO teste de propriedade:

**Exemplo de implementação**:
```javascript
// Feature: landing-page-fabricante-polo, Property 1: Estrutura do Header Completa
test('Property 1: Header contains all required elements', () => {
  fc.assert(
    fc.property(pageConfigArbitrary, (config) => {
      const page = renderLandingPage(config);
      const headline = page.querySelector('h1');
      const subheadline = page.querySelector('.subheadline');
      
      expect(headline.textContent).toContain('polo');
      expect(headline.textContent).toContain('R$16');
      expect(headline.textContent).toContain('marca');
      expect(subheadline.textContent).toMatch(/sem intermediário|direto/i);
    }),
    { numRuns: 100 }
  );
});
```

### Cobertura de Testes

**Mínimo esperado**:
- 100% das 12 propriedades implementadas como testes de propriedade
- Pelo menos 10 testes unitários para casos específicos
- Testes de acessibilidade (WCAG 2.1 AA)
- Testes de performance (Lighthouse score > 90)

### Execução de Testes

**Pipeline de CI/CD**:
1. Testes unitários (rápidos, < 10s)
2. Testes de propriedade (mais lentos, 100 iterações cada)
3. Testes de acessibilidade
4. Testes de performance
5. Validação HTML/CSS

**Critério de Aprovação**:
- Todos os testes devem passar
- Nenhuma propriedade pode ser violada
- Score de acessibilidade > 90
- Score de performance > 90


## Correctness Properties

*Uma propriedade é uma característica ou comportamento que deve ser verdadeiro em todas as execuções válidas do sistema - essencialmente, uma declaração formal sobre o que o sistema deve fazer. As propriedades servem como ponte entre especificações legíveis por humanos e garantias de corretude verificáveis por máquina.*

### Property 1: Estrutura do Header Completa
*Para qualquer* configuração da landing page, o header deve conter uma headline com os elementos obrigatórios (produto "polo", valor "R$16", proposta "marca própria") e uma subheadline mencionando ausência de intermediários.
**Validates: Requirements 1.1, 1.2**

### Property 2: Headline como Primeiro Elemento
*Para qualquer* renderização da landing page, a headline deve ser o primeiro elemento visível no DOM, aparecendo antes de qualquer outro conteúdo principal.
**Validates: Requirements 1.4**

### Property 3: Bloco de Qualificação Posicionado Corretamente
*Para qualquer* renderização da landing page, o bloco de qualificação deve aparecer imediatamente após o header e antes da descrição da oferta.
**Validates: Requirements 2.1**

### Property 4: Conteúdo do Bloco de Qualificação Completo
*Para qualquer* configuração da landing page, o bloco de qualificação deve conter: aviso para revendedores, negação explícita de ser curso, negação de ser franquia, e negação de ser renda fácil.
**Validates: Requirements 2.2, 2.3**

### Property 5: Elementos Obrigatórios da Oferta Presentes
*Para qualquer* configuração da landing page, a seção de oferta deve listar todos os 5 elementos obrigatórios (contato direto, produção na marca, valor R$16, quantidade mínima, envio nacional) e explicitar que o pagamento é pelo acesso, não pelo produto físico.
**Validates: Requirements 3.1, 3.2, 3.3**

### Property 6: Estrutura do Bloco de Transparência Completa
*Para qualquer* configuração da landing page, o bloco de transparência deve listar os 4 itens não incluídos (registro de marca, gestão de vendas, anúncios/garantia de lucro, exclusividade vitalícia) com ícones de negação (❌), e incluir texto sobre não garantir sucesso mas eliminar gargalo.
**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 7: Conteúdo de Escassez Realista
*Para qualquer* configuração da landing page, a seção de escassez deve mencionar produção limitada, liberação controlada/manual, e aprovação seletiva de perfis, sem conter contadores numéricos ou timers de countdown.
**Validates: Requirements 5.2, 5.3, 5.4, 5.5**

### Property 8: Elementos de Prova Social Adequados
*Para qualquer* configuração da landing page, a seção de prova social deve incluir informações sobre anos de produção, abrangência geográfica e natureza recorrente, sem mencionar resultados de clientes (lucro, vendas, ganhos).
**Validates: Requirements 6.2, 6.4**

### Property 9: Bloco de Preço Completo
*Para qualquer* configuração da landing page, o bloco de preço deve exibir o valor "R$ 997,00" com ícone monetário (💰), termo "pagamento único", texto explicativo sobre o valor ser referente ao acesso, reforço anti-curioso sobre não ser renda fácil/curso, e frase de ancoragem de valor mencionando produção de unidades.
**Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

### Property 10: Ancoragem de Valor Sem Promessas
*Para qualquer* texto de ancoragem de valor na landing page, deve conter comparativo lógico baseado em produção sem prometer lucro ou garantir retorno financeiro.
**Validates: Requirements 8.1, 8.2, 8.3, 8.4**

### Property 11: CTA Alinhado com Preço
*Para qualquer* renderização da landing page, deve existir exatamente um botão CTA principal após o bloco de preço, contendo texto sobre aceitar o valor, com link para WhatsApp incluindo o valor no parâmetro de mensagem, subtexto sobre direcionamento para confirmação, e mensagem de micro-escassez sobre liberação manual.
**Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**

### Property 12: Ausência de Frases Ambíguas no CTA
*Para qualquer* texto do botão CTA ou elementos próximos, não deve conter frases ambíguas como "Saiba mais", "Descubra", "Veja se você se qualifica".
**Validates: Requirements 9.6**

### Property 13: Micro-Escassez Coerente
*Para qualquer* configuração da landing page, a mensagem de micro-escassez deve mencionar liberação manual e verificação de capacidade do fabricante, sem conter contadores numéricos, timers ou urgência artificial.
**Validates: Requirements 10.1, 10.2, 10.3, 10.4**

### Property 14: Design Visual Limpo
*Para qualquer* renderização da landing page, o fundo deve usar cores neutras (branco ou cinza claro com luminosidade > 90%), e o número de imagens deve estar entre 1 e 3.
**Validates: Requirements 11.1, 11.3**

### Property 15: Responsividade Mobile
*Para qualquer* largura de viewport entre 320px e 1920px, todos os elementos da landing page devem permanecer visíveis e legíveis sem overflow horizontal.
**Validates: Requirements 11.5**

### Property 16: Tom Comercial e Sério
*Para qualquer* texto exibido na landing page, não deve conter linguagem de guru, emoção excessiva, promessas de lucro, garantias de retorno, ou urgência falsa.
**Validates: Requirements 12.1, 12.2, 12.3, 12.4**

## Error Handling

### Casos de Erro Previstos

1. **Link do WhatsApp Inválido**
   - Validar formato do número de telefone
   - Fallback: exibir mensagem de erro se link não puder ser gerado

2. **Imagens Não Carregadas**
   - Usar lazy loading para imagens
   - Fallback: exibir placeholder ou ocultar imagem com graceful degradation
   - Não bloquear renderização da página

3. **JavaScript Desabilitado**
   - Página deve funcionar completamente sem JavaScript
   - Todos os elementos são HTML/CSS puros
   - Link do WhatsApp funciona como link direto

4. **Navegadores Antigos**
   - Usar CSS com fallbacks para propriedades modernas
   - Testar em navegadores com pelo menos 2 anos de idade
   - Garantir funcionalidade básica mesmo sem suporte a features modernas

5. **Viewport Muito Pequeno (< 320px)**
   - Manter legibilidade mínima
   - Permitir scroll horizontal se necessário
   - Não quebrar layout completamente

## Testing Strategy

### Abordagem Dual de Testes

Esta landing page será testada usando duas abordagens complementares:

1. **Testes Unitários**: Verificam exemplos específicos, casos extremos e condições de erro
2. **Testes Baseados em Propriedades**: Verificam propriedades universais através de múltiplas entradas

Ambos são necessários para cobertura abrangente. Testes unitários capturam bugs concretos, enquanto testes de propriedade verificam corretude geral.

### Framework de Property-Based Testing

**Biblioteca escolhida**: **fast-check** (JavaScript/TypeScript)

Justificativa:
- Biblioteca madura e bem mantida para JavaScript
- Suporte a geradores customizados
- Integração fácil com Jest ou Mocha
- Documentação completa

**Configuração**:
- Mínimo de 100 iterações por teste de propriedade
- Cada teste deve referenciar a propriedade do design
- Formato de tag: `// Feature: landing-page-fabricante-polo, Property X: [texto da propriedade]`

### Estratégia de Testes Unitários

**Foco dos testes unitários**:
- Exemplos específicos de conteúdo correto
- Casos extremos (viewport muito pequeno, textos muito longos)
- Condições de erro (imagens não carregadas, links inválidos)
- Integração entre componentes visuais

**Ferramentas**:
- Jest para test runner
- jsdom ou Puppeteer para renderização
- Lighthouse CI para performance e acessibilidade

### Estratégia de Testes de Propriedade

**Foco dos testes de propriedade**:
- Presença de elementos obrigatórios em qualquer configuração
- Estrutura do DOM mantida independente do conteúdo
- Ausência de elementos proibidos (linguagem exagerada, múltiplos CTAs, frases ambíguas)
- Responsividade em qualquer largura de viewport

**Geradores Customizados**:
```javascript
// Gerador de configuração de página
const pageConfigArbitrary = fc.record({
  headline: fc.string({ minLength: 20, maxLength: 100 }),
  subheadline: fc.string({ minLength: 20, maxLength: 150 }),
  price: fc.string({ minLength: 4, maxLength: 10 }),
  whatsappNumber: fc.string({ minLength: 13, maxLength: 15 }),
  fabricanteYears: fc.integer({ min: 1, max: 50 }).map(String),
  offerItems: fc.array(fc.string(), { minLength: 5, maxLength: 5 }),
  notIncluded: fc.array(fc.string(), { minLength: 4, maxLength: 4 }),
  valueAnchoring: fc.string({ minLength: 30, maxLength: 150 }),
  antiCuriousReinforcement: fc.string({ minLength: 30, maxLength: 150 }),
  microScarcity: fc.string({ minLength: 30, maxLength: 150 })
});

// Gerador de largura de viewport
const viewportWidthArbitrary = fc.integer({ min: 320, max: 1920 });
```

### Implementação de Cada Propriedade

Cada uma das 16 propriedades de corretude deve ser implementada como um ÚNICO teste de propriedade:

**Exemplo de implementação**:
```javascript
// Feature: landing-page-fabricante-polo, Property 9: Bloco de Preço Completo
test('Property 9: Price block contains all required elements', () => {
  fc.assert(
    fc.property(pageConfigArbitrary, (config) => {
      const page = renderLandingPage(config);
      const priceBlock = page.querySelector('.price-block');
      const priceValue = priceBlock.querySelector('.price-value');
      const priceIcon = priceBlock.querySelector('.price-icon');
      const priceTerm = priceBlock.querySelector('.price-term');
      const explanation = priceBlock.querySelector('.price-explanation');
      const antiCurious = priceBlock.querySelector('.anti-curious-reinforcement');
      const valueAnchoring = priceBlock.querySelector('.value-anchoring');
      
      expect(priceValue.textContent).toContain('R$ 997,00');
      expect(priceIcon.textContent).toContain('💰');
      expect(priceTerm.textContent).toContain('pagamento único');
      expect(explanation.textContent).toMatch(/acesso.*fabricante/i);
      expect(antiCurious.textContent).toMatch(/renda fácil|curso|promessa/i);
      expect(valueAnchoring.textContent).toMatch(/\d+\s*unidades/i);
    }),
    { numRuns: 100 }
  );
});
```

### Cobertura de Testes

**Mínimo esperado**:
- 100% das 16 propriedades implementadas como testes de propriedade
- Pelo menos 10 testes unitários para casos específicos
- Testes de acessibilidade (WCAG 2.1 AA)
- Testes de performance (Lighthouse score > 90)

### Execução de Testes

**Pipeline de CI/CD**:
1. Testes unitários (rápidos, < 10s)
2. Testes de propriedade (mais lentos, 100 iterações cada)
3. Testes de acessibilidade
4. Testes de performance
5. Validação HTML/CSS

**Critério de Aprovação**:
- Todos os testes devem passar
- Nenhuma propriedade pode ser violada
- Score de acessibilidade > 90
- Score de performance > 90
