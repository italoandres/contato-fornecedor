# Implementation Plan: Landing Page Fabricante Polo

## Overview

Este plano implementa uma landing page estática de página única focada em conversão qualificada de revendedores. A implementação será feita com HTML5, CSS3 e JavaScript vanilla, priorizando performance, simplicidade e responsividade. Cada tarefa constrói incrementalmente sobre as anteriores, com validação através de testes unitários e baseados em propriedades.

## Tasks

- [x] 1. Configurar estrutura do projeto e ferramentas de teste
  - Criar estrutura de diretórios (src/, tests/, assets/)
  - Configurar package.json com Jest e fast-check
  - Criar arquivo HTML base com estrutura semântica
  - Configurar jsdom para testes de renderização
  - _Requirements: 8.1, 8.2, 8.5_

- [-] 2. Implementar componente Header
  - [x] 2.1 Criar estrutura HTML do header com headline e subheadline
    - Implementar elemento `<header>` com h1 e parágrafo
    - Adicionar classes CSS para estilização
    - Garantir que headline contém produto, valor e proposta
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 2.2 Escrever teste de propriedade para estrutura do header
    - **Property 1: Estrutura do Header Completa**
    - **Validates: Requirements 1.1, 1.2**

  - [x] 2.3 Escrever teste de propriedade para posicionamento do header
    - **Property 2: Headline como Primeiro Elemento**
    - **Validates: Requirements 1.4**

  - [x] 2.4 Estilizar header com CSS
    - Aplicar tipografia (tamanhos, pesos, cores)
    - Adicionar espaçamento e alinhamento centralizado
    - Garantir responsividade para mobile
    - _Requirements: 8.1, 8.5_

- [-] 3. Implementar Bloco de Qualificação (Anti-Curioso)
  - [x] 3.1 Criar estrutura HTML do bloco de qualificação
    - Implementar `<section>` com classe qualification-block
    - Adicionar ícone de atenção (⚠️)
    - Incluir texto com negações (não é curso, franquia, renda fácil)
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 3.2 Escrever teste de propriedade para posicionamento do bloco
    - **Property 3: Bloco de Qualificação Posicionado Corretamente**
    - **Validates: Requirements 2.1**

  - [x] 3.3 Escrever teste de propriedade para conteúdo do bloco
    - **Property 4: Conteúdo do Bloco de Qualificação Completo**
    - **Validates: Requirements 2.2, 2.3**

  - [x] 3.4 Estilizar bloco de qualificação
    - Aplicar background amarelo/laranja claro
    - Adicionar borda e padding
    - Estilizar ícone e texto
    - _Requirements: 2.4, 8.1_

- [-] 4. Implementar Seção de Descrição da Oferta
  - [x] 4.1 Criar estrutura HTML da seção de oferta
    - Implementar `<section>` com título e lista
    - Adicionar os 5 elementos obrigatórios em lista
    - Incluir parágrafo destacado sobre pagamento pelo acesso
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 4.2 Escrever teste de propriedade para elementos da oferta
    - **Property 5: Elementos Obrigatórios da Oferta Presentes**
    - **Validates: Requirements 3.1, 3.2, 3.3**

  - [x] 4.3 Estilizar seção de oferta
    - Estilizar lista com espaçamento adequado
    - Destacar parágrafo sobre acesso (background, border-left)
    - Garantir legibilidade e hierarquia visual
    - _Requirements: 8.1, 8.5_

- [ ] 5. Checkpoint - Validar estrutura básica
  - Executar todos os testes implementados até aqui
  - Verificar renderização visual em navegador
  - Testar responsividade em diferentes tamanhos de tela
  - Perguntar ao usuário se há dúvidas ou ajustes necessários

- [ ] 6. Implementar Bloco de Transparência
  - [x] 6.1 Criar estrutura HTML do bloco de transparência
    - Implementar `<section>` com título
    - Adicionar lista com 4 itens não incluídos
    - Incluir ícones ❌ para cada item
    - Adicionar parágrafo sobre não garantir sucesso
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 6.2 Escrever teste de propriedade para bloco de transparência
    - **Property 6: Estrutura do Bloco de Transparência Completa**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**

  - [x] 6.3 Estilizar bloco de transparência
    - Aplicar background neutro
    - Estilizar lista sem marcadores padrão
    - Formatar texto final (itálico ou peso medium)
    - _Requirements: 8.1_

- [ ] 7. Implementar Seção de Escassez
  - [ ] 7.1 Criar estrutura HTML da seção de escassez
    - Implementar `<section>` com título
    - Adicionar texto sobre produção limitada, liberação manual e aprovação seletiva
    - Garantir ausência de contadores ou timers
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ] 7.2 Escrever teste de propriedade para conteúdo de escassez
    - **Property 7: Conteúdo de Escassez Realista**
    - **Validates: Requirements 5.2, 5.3, 5.4, 5.5**

  - [ ] 7.3 Estilizar seção de escassez
    - Centralizar texto
    - Aplicar padding vertical generoso
    - Manter design limpo sem elementos agressivos
    - _Requirements: 8.1_

- [ ] 8. Implementar Seção de Prova Social
  - [ ] 8.1 Criar estrutura HTML da seção de prova social
    - Implementar `<section>` com título "Sobre o fabricante"
    - Adicionar lista com 3 elementos (anos de produção, abrangência, natureza recorrente)
    - Garantir ausência de menções a resultados de clientes
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 8.2 Escrever teste de propriedade para prova social
    - **Property 8: Elementos de Prova Social Adequados**
    - **Validates: Requirements 6.2, 6.4**

  - [ ] 8.3 Estilizar seção de prova social
    - Centralizar lista
    - Usar marcadores discretos
    - Manter design minimalista
    - _Requirements: 8.1_

- [ ] 9. Implementar Bloco de Preço
  - [x] 9.1 Criar estrutura HTML do bloco de preço
    - Implementar `<section>` com classe price-block
    - Adicionar display de preço com ícone 💰, valor R$ 997,00 e termo "pagamento único"
    - Incluir texto explicativo sobre o valor ser referente ao acesso
    - Adicionar reforço anti-curioso sobre não ser renda fácil/curso
    - Incluir frase de ancoragem de valor (produção de 100 unidades)
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4_

  - [x] 9.2 Escrever teste de propriedade para bloco de preço
    - **Property 9: Bloco de Preço Completo**
    - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

  - [x] 9.3 Escrever teste de propriedade para ancoragem de valor
    - **Property 10: Ancoragem de Valor Sem Promessas**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**

  - [x] 9.4 Estilizar bloco de preço
    - Aplicar background claro com borda destacada
    - Estilizar preço com fonte grande e bold
    - Estilizar ícone, termo e textos explicativos
    - Destacar reforço anti-curioso com cor de alerta
    - Aplicar padding e alinhamento centralizado
    - _Requirements: 11.1_

- [ ] 10. Implementar Seção de CTA (Call-to-Action) com Preço
  - [x] 10.1 Criar estrutura HTML do CTA alinhado com preço
    - Implementar `<section>` com link/botão para WhatsApp
    - Configurar href com formato wa.me incluindo valor R$997 na mensagem
    - Usar texto "Tenho interesse e aceito o valor" no botão
    - Adicionar subtexto sobre direcionamento para WhatsApp
    - Incluir mensagem de micro-escassez sobre liberação manual
    - Garantir que é o único CTA principal na página
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 10.1, 10.2, 10.3, 10.4_

  - [x] 10.2 Escrever teste de propriedade para CTA alinhado com preço
    - **Property 11: CTA Alinhado com Preço**
    - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6**

  - [x] 10.3 Escrever teste de propriedade para ausência de frases ambíguas
    - **Property 12: Ausência de Frases Ambíguas no CTA**
    - **Validates: Requirements 9.6**

  - [x] 10.4 Escrever teste de propriedade para micro-escassez
    - **Property 13: Micro-Escassez Coerente**
    - **Validates: Requirements 10.1, 10.2, 10.3, 10.4**

  - [x] 10.5 Estilizar botão CTA e elementos relacionados
    - Aplicar cor verde WhatsApp (#25D366)
    - Adicionar padding, border-radius e sombra
    - Implementar efeito hover
    - Estilizar subtexto e mensagem de micro-escassez
    - Centralizar elementos
    - _Requirements: 11.1_

- [ ] 11. Checkpoint - Validar preço e CTA
  - Executar todos os testes de propriedade
  - Verificar presença de todos os elementos obrigatórios
  - Testar link do WhatsApp
  - Perguntar ao usuário se há ajustes necessários

- [ ] 12. Implementar responsividade e design visual final
  - [ ] 12.1 Adicionar media queries para diferentes breakpoints
    - Implementar breakpoints para mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
    - Ajustar tamanhos de fonte e espaçamentos
    - Garantir que não há overflow horizontal
    - _Requirements: 8.5_

  - [x] 12.2 Escrever teste de propriedade para responsividade
    - **Property 15: Responsividade Mobile**
    - **Validates: Requirements 11.5**

  - [ ] 12.3 Finalizar paleta de cores e tipografia
    - Garantir fundo neutro (branco ou cinza claro)
    - Validar contraste de cores (WCAG AA)
    - Aplicar fontes consistentes
    - _Requirements: 8.1, 8.2_

  - [x] 12.4 Escrever teste de propriedade para design visual
    - **Property 14: Design Visual Limpo**
    - **Validates: Requirements 11.1, 11.3**

  - [ ] 12.5 Adicionar imagens (1-3 imagens neutras)
    - Selecionar ou criar imagens apropriadas
    - Implementar lazy loading
    - Adicionar alt text para acessibilidade
    - _Requirements: 8.3_

- [ ] 13. Implementar validações de conteúdo
  - [ ] 13.1 Criar módulo JavaScript para validação de configuração
    - Implementar função para validar pageConfig
    - Validar formato de número do WhatsApp
    - Validar presença de elementos obrigatórios
    - Validar formato do preço
    - _Requirements: 3.2, 4.2, 7.2, 9.3_

  - [x] 13.2 Escrever teste de propriedade para tom comercial e sério
    - **Property 16: Tom Comercial e Sério**
    - **Validates: Requirements 12.1, 12.2, 12.3, 12.4**

  - [ ] 13.3 Escrever testes unitários para casos de erro
    - Testar comportamento com link WhatsApp inválido
    - Testar comportamento com imagens não carregadas
    - Testar funcionamento sem JavaScript
    - _Requirements: Error Handling_

- [ ] 14. Otimização e performance
  - [ ] 14.1 Otimizar assets
    - Minificar CSS
    - Comprimir imagens
    - Implementar cache headers apropriados
    - _Requirements: 8.1, 8.3_

  - [ ] 14.2 Executar testes de performance
    - Rodar Lighthouse CI
    - Validar score > 90 em performance
    - Validar score > 90 em acessibilidade
    - Validar tempo de carregamento < 2s

  - [ ] 14.3 Validar HTML e CSS
    - Executar validador W3C HTML
    - Executar validador W3C CSS
    - Corrigir quaisquer erros ou warnings

- [ ] 15. Checkpoint final - Validação completa
  - Executar suite completa de testes (unitários + propriedades)
  - Verificar todas as 16 propriedades de corretude
  - Testar em múltiplos navegadores (Chrome, Firefox, Safari, Edge)
  - Testar em dispositivos reais (mobile, tablet, desktop)
  - Validar acessibilidade com leitor de tela
  - Verificar exibição correta do preço e CTA
  - Perguntar ao usuário se a implementação está aprovada

## Notes

- Todas as tarefas são obrigatórias para garantir implementação completa e testada
- Cada tarefa referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de corretude (16 propriedades)
- Testes unitários validam exemplos específicos e casos extremos
- A implementação é progressiva: estrutura → conteúdo → preço/CTA → estilo → validação → otimização
- O bloco de preço (R$ 997,00) é exibido antes do CTA para filtrar curiosos
- O CTA usa linguagem direta sobre aceitar o valor, sem ambiguidade
