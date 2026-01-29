# Requirements Document

## Introduction

Esta especificação define uma página de vendas (landing page) simples e direta para vender acesso ao contato de um fabricante brasileiro de camisas polo. A página tem foco em filtrar curiosos e atrair apenas revendedores reais, com comunicação profissional, transparente e sem promessas exageradas.

## Glossary

- **Landing_Page**: A página web de vendas única que apresenta a oferta
- **Fabricante**: O produtor brasileiro de camisas polo que será conectado aos compradores
- **Revendedor**: Pessoa que já vende ou pretende revender roupas de forma séria
- **Acesso**: O contato direto do fabricante fornecido após a compra
- **CTA**: Call-to-action, botão de ação principal (WhatsApp)
- **Bloco_Qualificacao**: Seção que filtra visitantes não qualificados
- **Prova_Social**: Elementos que demonstram credibilidade do fabricante

## Requirements

### Requirement 1: Headline e Comunicação Principal

**User Story:** Como visitante qualificado, quero entender imediatamente a oferta, para que eu possa decidir se é relevante para meu negócio.

#### Acceptance Criteria

1. THE Landing_Page SHALL display a headline principal objetiva contendo o produto (camisa polo), o valor (R$16) e a proposta (marca própria)
2. THE Landing_Page SHALL display uma subheadline que reforce a ausência de intermediários e promessas exageradas
3. WHEN a headline é exibida, THE Landing_Page SHALL use linguagem direta e profissional sem termos emocionais excessivos
4. THE Landing_Page SHALL position a headline como primeiro elemento visível da página

### Requirement 2: Filtro de Qualificação

**User Story:** Como proprietário da oferta, quero filtrar curiosos logo no início, para que apenas revendedores sérios continuem na página.

#### Acceptance Criteria

1. THE Landing_Page SHALL display um bloco de qualificação visível logo após a headline
2. THE Bloco_Qualificacao SHALL contain um aviso claro indicando que a oferta é apenas para quem já vende ou pretende revender roupas
3. THE Bloco_Qualificacao SHALL explicitly state que não é curso, franquia ou renda fácil
4. THE Bloco_Qualificacao SHALL use um ícone de atenção (⚠️) para destacar visualmente o aviso

### Requirement 3: Descrição Clara da Oferta

**User Story:** Como revendedor interessado, quero entender exatamente o que estou comprando, para que eu não tenha expectativas incorretas.

#### Acceptance Criteria

1. THE Landing_Page SHALL display uma seção explicando que a oferta é o contato direto do fabricante
2. WHEN descrevendo a oferta, THE Landing_Page SHALL list os seguintes elementos: contato direto, produção na marca do comprador, valor unitário R$16, quantidade mínima exigida, envio nacional
3. THE Landing_Page SHALL explicitly state que o pagamento é pelo acesso ao fabricante, não por produto físico
4. THE Landing_Page SHALL present as informações de forma simples e em lista quando apropriado

### Requirement 4: Transparência sobre Limitações

**User Story:** Como visitante cético, quero saber o que NÃO está incluído, para que eu confie mais na oferta.

#### Acceptance Criteria

1. THE Landing_Page SHALL display um bloco de transparência listando o que não está incluído
2. THE Landing_Page SHALL explicitly state que não inclui: registro de marca, gestão de vendas, anúncios/garantia de lucro, exclusividade vitalícia
3. THE Landing_Page SHALL use ícones de negação (❌) para cada item não incluído
4. THE Landing_Page SHALL include texto reforçando que o acesso elimina o gargalo do fornecedor mas não garante sucesso

### Requirement 5: Escassez Realista

**User Story:** Como visitante interessado, quero entender as limitações reais da oferta, para que eu tome decisão informada sobre urgência.

#### Acceptance Criteria

1. THE Landing_Page SHALL display informações sobre escassez baseadas em limites operacionais reais
2. THE Landing_Page SHALL state que o fabricante trabalha com produção limitada
3. THE Landing_Page SHALL state que o acesso é liberado de forma controlada e manual
4. THE Landing_Page SHALL state que nem todo perfil é aprovado
5. THE Landing_Page SHALL avoid linguagem de escassez artificial ou contadores falsos

### Requirement 6: Prova Social Credível

**User Story:** Como visitante cauteloso, quero ver evidências de credibilidade, para que eu confie no fabricante.

#### Acceptance Criteria

1. THE Landing_Page SHALL display elementos de prova social de forma discreta
2. THE Landing_Page SHALL include informações como: anos de produção do fabricante, abrangência geográfica de atendimento, natureza recorrente da produção
3. THE Landing_Page SHALL avoid números absurdos ou não verificáveis
4. THE Landing_Page SHALL use prova social indireta focada no fabricante, não em resultados de clientes

### Requirement 7: Bloco de Preço Visível

**User Story:** Como visitante qualificado, quero ver o preço claramente antes de prosseguir, para que eu possa tomar decisão informada.

#### Acceptance Criteria

1. THE Landing_Page SHALL display um bloco de preço destacado antes do CTA
2. THE Landing_Page SHALL display o valor "R$ 997,00" com descrição "pagamento único"
3. THE Landing_Page SHALL include ícone monetário (💰) junto ao preço
4. THE Landing_Page SHALL display texto explicativo abaixo do preço indicando que o valor é referente ao acesso ao fabricante
5. THE Landing_Page SHALL display reforço anti-curioso logo abaixo do preço alertando sobre não ser renda fácil ou curso

### Requirement 8: Ancoragem de Valor

**User Story:** Como visitante analisando o investimento, quero entender o contexto do valor, para que eu possa avaliar o retorno potencial.

#### Acceptance Criteria

1. THE Landing_Page SHALL display uma frase de ancoragem de valor próxima ao preço
2. THE Landing_Page SHALL use comparativo lógico baseado em produção (exemplo: 100 unidades)
3. THE Landing_Page SHALL avoid promessas de lucro ou garantias de retorno
4. THE Landing_Page SHALL maintain tom racional e baseado em lógica comercial

### Requirement 9: Call-to-Action Alinhado com Preço

**User Story:** Como visitante que viu o preço, quero um CTA que confirme meu entendimento do valor, para que não haja ambiguidade.

#### Acceptance Criteria

1. THE Landing_Page SHALL display um único botão CTA destacado visualmente após o bloco de preço
2. THE CTA SHALL contain texto explícito sobre aceitar o valor (exemplo: "Tenho interesse e aceito o valor")
3. THE CTA SHALL link diretamente para WhatsApp
4. WHEN o CTA é exibido, THE Landing_Page SHALL display subtexto indicando direcionamento para WhatsApp para confirmação
5. THE Landing_Page SHALL avoid múltiplos CTAs que possam confundir o visitante
6. THE Landing_Page SHALL avoid frases ambíguas como "Saiba mais", "Descubra", "Veja se você se qualifica"

### Requirement 10: Micro-Escassez Coerente

**User Story:** Como visitante interessado, quero entender o processo de liberação do acesso, para que eu tenha expectativas realistas.

#### Acceptance Criteria

1. THE Landing_Page SHALL display informação sobre liberação manual abaixo do CTA
2. THE Landing_Page SHALL state que a liberação é verificada conforme capacidade do fabricante
3. THE Landing_Page SHALL avoid escassez artificial ou urgência falsa
4. THE Landing_Page SHALL maintain tom comercial e sério

### Requirement 11: Design Visual Limpo

**User Story:** Como visitante, quero uma página visualmente limpa e profissional, para que eu foque no conteúdo sem distrações.

#### Acceptance Criteria

1. THE Landing_Page SHALL use fundo limpo em cores neutras (branco ou cinza claro)
2. THE Landing_Page SHALL use fontes simples e legíveis
3. THE Landing_Page SHALL display entre 1 e 3 imagens reais ou neutras
4. THE Landing_Page SHALL avoid animações excessivas ou elementos distrativos
5. THE Landing_Page SHALL maintain layout responsivo para dispositivos móveis

### Requirement 12: Tom de Comunicação Consistente

**User Story:** Como visitante, quero uma comunicação profissional e honesta, para que eu confie na seriedade da oferta.

#### Acceptance Criteria

1. WHEN exibindo qualquer texto, THE Landing_Page SHALL use tom sério e comercial
2. THE Landing_Page SHALL avoid emoção excessiva ou linguagem de "guru"
3. THE Landing_Page SHALL avoid promessas de lucro ou garantias
4. THE Landing_Page SHALL avoid urgência falsa ou escassez artificial
5. THE Landing_Page SHALL maintain consistência de tom em todos os blocos de conteúdo
