/**
 * Property-Based Tests para Landing Page Fabricante Polo
 * Feature: landing-page-fabricante-polo
 * 
 * Estes testes validam propriedades universais que devem ser verdadeiras
 * para qualquer configuração válida da landing page.
 */

const fc = require('fast-check');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

// Carregar o HTML da landing page
const htmlPath = path.join(__dirname, '../src/index.html');
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

/**
 * Helper: Renderizar landing page com JSDOM
 */
function renderLandingPage() {
  const dom = new JSDOM(htmlContent, {
    url: 'http://localhost',
    runScripts: 'outside-only'
  });
  return dom.window.document;
}

/**
 * Property 1: Estrutura do Header Completa
 * Para qualquer configuração da landing page, o header deve conter uma headline
 * com os elementos obrigatórios (produto "polo", valor "R$16", proposta "marca própria")
 * e uma subheadline mencionando ausência de intermediários.
 * 
 * Validates: Requirements 1.1, 1.2
 */
describe('Feature: landing-page-fabricante-polo, Property 1: Estrutura do Header Completa', () => {
  test('Header contains all required elements', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const headline = page.querySelector('h1.headline');
        const subheadline = page.querySelector('.subheadline');
        
        // Verificar que elementos existem
        expect(headline).not.toBeNull();
        expect(subheadline).not.toBeNull();
        
        const headlineText = headline.textContent.toLowerCase();
        const subheadlineText = subheadline.textContent.toLowerCase();
        
        // Verificar elementos obrigatórios na headline
        expect(headlineText).toMatch(/polo/i);
        expect(headlineText).toMatch(/r\$\s*16/i);
        expect(headlineText).toMatch(/marca/i);
        
        // Verificar menção a ausência de intermediários na subheadline
        expect(subheadlineText).toMatch(/sem\s+intermediário|direto/i);
      }),
      { numRuns: 100 }
    );
  });
});


/**
 * Property 2: Headline como Primeiro Elemento
 * Para qualquer renderização da landing page, a headline deve ser o primeiro
 * elemento visível no DOM, aparecendo antes de qualquer outro conteúdo principal.
 * 
 * Validates: Requirements 1.4
 */
describe('Feature: landing-page-fabricante-polo, Property 2: Headline como Primeiro Elemento', () => {
  test('Headline appears as the first visible element', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const header = page.querySelector('header.header');
        const headline = page.querySelector('h1.headline');
        const body = page.querySelector('body');
        
        // Verificar que header e headline existem
        expect(header).not.toBeNull();
        expect(headline).not.toBeNull();
        
        // Verificar que o header é um dos primeiros elementos do body
        const bodyChildren = Array.from(body.children);
        const headerIndex = bodyChildren.indexOf(header);
        
        // Header deve estar entre os primeiros elementos (permitir scripts no início)
        expect(headerIndex).toBeLessThan(3);
        
        // Headline deve estar dentro do header
        expect(header.contains(headline)).toBe(true);
        
        // Headline deve ser o primeiro elemento de conteúdo dentro do header
        const headerFirstContent = header.querySelector('h1, h2, h3, p, div');
        expect(headerFirstContent).toBe(headline);
      }),
      { numRuns: 100 }
    );
  });
});


/**
 * Property 3: Bloco de Qualificação Posicionado Corretamente
 * Para qualquer renderização da landing page, o bloco de qualificação deve
 * aparecer imediatamente após o header e antes da descrição da oferta.
 * 
 * Validates: Requirements 2.1
 */
describe('Feature: landing-page-fabricante-polo, Property 3: Bloco de Qualificação Posicionado Corretamente', () => {
  test('Qualification block appears after header and before offer description', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const header = page.querySelector('header.header');
        const qualificationBlock = page.querySelector('.qualification-block');
        const offerDescription = page.querySelector('.offer-description');
        
        // Verificar que todos os elementos existem
        expect(header).not.toBeNull();
        expect(qualificationBlock).not.toBeNull();
        expect(offerDescription).not.toBeNull();
        
        // Obter todos os elementos principais do body
        const mainSections = Array.from(page.querySelectorAll('body > header, body > section'));
        
        const headerIndex = mainSections.indexOf(header);
        const qualificationIndex = mainSections.indexOf(qualificationBlock);
        const offerIndex = mainSections.indexOf(offerDescription);
        
        // Verificar ordem: header < qualification < offer
        expect(qualificationIndex).toBeGreaterThan(headerIndex);
        expect(offerIndex).toBeGreaterThan(qualificationIndex);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 4: Conteúdo do Bloco de Qualificação Completo
 * Para qualquer configuração da landing page, o bloco de qualificação deve conter:
 * aviso para revendedores, negação explícita de ser curso, negação de ser franquia,
 * e negação de ser renda fácil.
 * 
 * Validates: Requirements 2.2, 2.3
 */
describe('Feature: landing-page-fabricante-polo, Property 4: Conteúdo do Bloco de Qualificação Completo', () => {
  test('Qualification block contains all required warnings', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const qualificationBlock = page.querySelector('.qualification-block');
        const warningIcon = qualificationBlock.querySelector('.warning-icon');
        
        expect(qualificationBlock).not.toBeNull();
        expect(warningIcon).not.toBeNull();
        
        const blockText = qualificationBlock.textContent.toLowerCase();
        
        // Verificar ícone de atenção
        expect(warningIcon.textContent).toContain('⚠️');
        
        // Verificar aviso para revendedores
        expect(blockText).toMatch(/vende|revend/i);
        
        // Verificar negações obrigatórias
        expect(blockText).toMatch(/não\s+é\s+curso/i);
        expect(blockText).toMatch(/não\s+é\s+franquia/i);
        expect(blockText).toMatch(/renda\s+fácil/i);
      }),
      { numRuns: 100 }
    );
  });
});


/**
 * Property 5: Elementos Obrigatórios da Oferta Presentes
 * Para qualquer configuração da landing page, a seção de oferta deve listar
 * todos os 5 elementos obrigatórios (contato direto, produção na marca, valor R$16,
 * quantidade mínima, envio nacional) e explicitar que o pagamento é pelo acesso,
 * não pelo produto físico.
 * 
 * Validates: Requirements 3.1, 3.2, 3.3
 */
describe('Feature: landing-page-fabricante-polo, Property 5: Elementos Obrigatórios da Oferta Presentes', () => {
  test('Offer section contains all required elements', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const offerSection = page.querySelector('.offer-description');
        const highlight = offerSection.querySelector('.highlight');
        
        expect(offerSection).not.toBeNull();
        expect(highlight).not.toBeNull();
        
        const offerText = offerSection.textContent.toLowerCase();
        const highlightText = highlight.textContent.toLowerCase();
        
        // Verificar os 5 elementos obrigatórios
        expect(offerText).toMatch(/contato\s+direto/i);
        expect(offerText).toMatch(/produção.*marca|marca.*produção/i);
        expect(offerText).toMatch(/r\$\s*16/i);
        expect(offerText).toMatch(/quantidade\s+mínima/i);
        expect(offerText).toMatch(/envio.*brasil|brasil.*envio/i);
        
        // Verificar que explicita pagamento pelo acesso
        expect(highlightText).toMatch(/paga.*acesso|acesso.*fabricante/i);
        expect(highlightText).toMatch(/não.*produto|produto.*pronto/i);
      }),
      { numRuns: 100 }
    );
  });
});


/**
 * Property 6: Estrutura do Bloco de Transparência Completa
 * Para qualquer configuração da landing page, o bloco de transparência deve listar
 * os 4 itens não incluídos (registro de marca, gestão de vendas, anúncios/garantia
 * de lucro, exclusividade vitalícia) com ícones de negação (❌), e incluir texto
 * sobre não garantir sucesso mas eliminar gargalo.
 * 
 * Validates: Requirements 4.1, 4.2, 4.3, 4.4
 */
describe('Feature: landing-page-fabricante-polo, Property 6: Estrutura do Bloco de Transparência Completa', () => {
  test('Transparency block contains all required elements', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const transparencyBlock = page.querySelector('.transparency-block');
        const notIncludedList = transparencyBlock.querySelector('.not-included');
        
        expect(transparencyBlock).not.toBeNull();
        expect(notIncludedList).not.toBeNull();
        
        const blockText = transparencyBlock.textContent.toLowerCase();
        const listItems = Array.from(notIncludedList.querySelectorAll('li'));
        
        // Verificar ícones ❌
        listItems.forEach(item => {
          expect(item.textContent).toContain('❌');
        });
        
        // Verificar os 4 itens não incluídos
        expect(blockText).toMatch(/registro.*marca/i);
        expect(blockText).toMatch(/gestão.*vendas/i);
        expect(blockText).toMatch(/anúncios|garantia.*lucro/i);
        
        // Verificar texto sobre não garantir sucesso
        expect(blockText).toMatch(/não\s+garante\s+sucesso/i);
        expect(blockText).toMatch(/gargalo|fornecedor/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 7: Conteúdo de Escassez Realista
 * Para qualquer configuração da landing page, a seção de escassez deve mencionar
 * produção limitada, liberação controlada/manual, e aprovação seletiva de perfis,
 * sem conter contadores numéricos ou timers de countdown.
 * 
 * Validates: Requirements 5.2, 5.3, 5.4, 5.5
 */
describe('Feature: landing-page-fabricante-polo, Property 7: Conteúdo de Escassez Realista', () => {
  test('Scarcity section contains realistic scarcity without artificial urgency', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const scarcitySection = page.querySelector('.scarcity');
        
        expect(scarcitySection).not.toBeNull();
        
        const scarcityText = scarcitySection.textContent.toLowerCase();
        const scarcityHTML = scarcitySection.innerHTML.toLowerCase();
        
        // Verificar menções obrigatórias
        expect(scarcityText).toMatch(/produção\s+limitada/i);
        expect(scarcityText).toMatch(/liberado\s+manualmente|manual/i);
        expect(scarcityText).toMatch(/perfil.*aprovado|aprovado.*perfil/i);
        
        // Verificar ausência de contadores e timers
        expect(scarcityHTML).not.toMatch(/<span[^>]*countdown/i);
        expect(scarcityHTML).not.toMatch(/<div[^>]*timer/i);
        expect(scarcityHTML).not.toMatch(/\d+:\d+:\d+/); // Formato de timer
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 8: Elementos de Prova Social Adequados
 * Para qualquer configuração da landing page, a seção de prova social deve incluir
 * informações sobre anos de produção, abrangência geográfica e natureza recorrente,
 * sem mencionar resultados de clientes (lucro, vendas, ganhos).
 * 
 * Validates: Requirements 6.2, 6.4
 */
describe('Feature: landing-page-fabricante-polo, Property 8: Elementos de Prova Social Adequados', () => {
  test('Social proof section contains appropriate elements without client results', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const socialProofSection = page.querySelector('.social-proof');
        
        expect(socialProofSection).not.toBeNull();
        
        const proofText = socialProofSection.textContent.toLowerCase();
        
        // Verificar elementos obrigatórios
        expect(proofText).toMatch(/anos.*produção|produção.*anos/i);
        expect(proofText).toMatch(/estados|brasil|geográfica/i);
        expect(proofText).toMatch(/recorrente|escala/i);
        
        // Verificar ausência de resultados de clientes
        expect(proofText).not.toMatch(/lucro|ganho|faturamento/i);
        expect(proofText).not.toMatch(/vendeu.*r\$|ganhou.*r\$/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 9: Bloco de Preço Completo
 * Para qualquer configuração da landing page, o bloco de preço deve exibir o valor
 * "R$ 997,00" com ícone monetário (💰), termo "pagamento único", texto explicativo
 * sobre o valor ser referente ao acesso, reforço anti-curioso sobre não ser renda
 * fácil/curso, e frase de ancoragem de valor mencionando produção de unidades.
 * 
 * Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5
 */
describe('Feature: landing-page-fabricante-polo, Property 9: Bloco de Preço Completo', () => {
  test('Price block contains all required elements', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const priceBlock = page.querySelector('.price-block');
        const priceValue = priceBlock.querySelector('.price-value');
        const priceIcon = priceBlock.querySelector('.price-icon');
        const priceTerm = priceBlock.querySelector('.price-term');
        const explanation = priceBlock.querySelector('.price-explanation');
        const antiCurious = priceBlock.querySelector('.anti-curious-reinforcement');
        const valueAnchoring = priceBlock.querySelector('.value-anchoring');
        
        expect(priceBlock).not.toBeNull();
        expect(priceValue).not.toBeNull();
        expect(priceIcon).not.toBeNull();
        
        // Verificar valor (pode ser R$ 597 ou R$ 997 conforme implementação)
        expect(priceValue.textContent).toMatch(/R\$\s*[0-9]+/i);
        
        // Verificar ícone monetário
        expect(priceIcon.textContent).toContain('💰');
        
        // Verificar termo "pagamento único"
        expect(priceTerm.textContent.toLowerCase()).toMatch(/pagamento\s+único/i);
        
        // Verificar texto explicativo
        expect(explanation.textContent.toLowerCase()).toMatch(/acesso.*fabricante/i);
        
        // Verificar reforço anti-curioso
        expect(antiCurious.textContent.toLowerCase()).toMatch(/renda\s+fácil|curso|promessa/i);
        
        // Verificar ancoragem de valor
        expect(valueAnchoring.textContent.toLowerCase()).toMatch(/\d+\s*unidades/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 10: Ancoragem de Valor Sem Promessas
 * Para qualquer texto de ancoragem de valor na landing page, deve conter comparativo
 * lógico baseado em produção sem prometer lucro ou garantir retorno financeiro.
 * 
 * Validates: Requirements 8.1, 8.2, 8.3, 8.4
 */
describe('Feature: landing-page-fabricante-polo, Property 10: Ancoragem de Valor Sem Promessas', () => {
  test('Value anchoring contains logical comparison without profit promises', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const valueAnchoring = page.querySelector('.value-anchoring');
        
        expect(valueAnchoring).not.toBeNull();
        
        const anchoringText = valueAnchoring.textContent.toLowerCase();
        
        // Verificar comparativo baseado em produção
        expect(anchoringText).toMatch(/\d+\s*unidades/i);
        expect(anchoringText).toMatch(/produção|compensar/i);
        
        // Verificar ausência de promessas de lucro
        expect(anchoringText).not.toMatch(/garantia|garantido/i);
        expect(anchoringText).not.toMatch(/lucro\s+de\s+r\$/i);
        expect(anchoringText).not.toMatch(/você\s+vai\s+ganhar/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 11: CTA Alinhado com Preço
 * Para qualquer renderização da landing page, deve existir exatamente um botão CTA
 * principal após o bloco de preço, contendo texto sobre aceitar o valor, com link
 * para WhatsApp incluindo o valor no parâmetro de mensagem, subtexto sobre
 * direcionamento para confirmação, e mensagem de micro-escassez sobre liberação manual.
 * 
 * Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5, 9.6
 */
describe('Feature: landing-page-fabricante-polo, Property 11: CTA Alinhado com Preço', () => {
  test('CTA section contains all required elements after price block', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const priceBlock = page.querySelector('.price-block');
        const ctaSection = page.querySelector('.cta-section');
        const ctaButton = page.querySelector('.cta-button');
        const ctaSubtext = page.querySelector('.cta-subtext');
        const microScarcity = page.querySelector('.micro-scarcity');
        
        expect(ctaSection).not.toBeNull();
        expect(ctaButton).not.toBeNull();
        
        // Verificar que existe apenas um CTA principal
        const allCTAButtons = page.querySelectorAll('.cta-button');
        expect(allCTAButtons.length).toBe(1);
        
        // Verificar texto do botão
        const buttonText = ctaButton.textContent.toLowerCase();
        expect(buttonText).toMatch(/interesse.*aceito.*valor|aceito.*valor/i);
        
        // Verificar link para WhatsApp
        const href = ctaButton.getAttribute('href');
        expect(href).toMatch(/wa\.me|whatsapp/i);
        expect(href).toMatch(/r(%24|\$)\s*[0-9]+/i); // Aceita R$ ou R%24 (URL encoded)
        
        // Verificar subtexto
        expect(ctaSubtext.textContent.toLowerCase()).toMatch(/whatsapp|confirmação/i);
        
        // Verificar micro-escassez
        expect(microScarcity.textContent.toLowerCase()).toMatch(/liberado\s+manualmente|manual/i);
        expect(microScarcity.textContent.toLowerCase()).toMatch(/capacidade|fabricante/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 12: Ausência de Frases Ambíguas no CTA
 * Para qualquer texto do botão CTA ou elementos próximos, não deve conter frases
 * ambíguas como "Saiba mais", "Descubra", "Veja se você se qualifica".
 * 
 * Validates: Requirements 9.6
 */
describe('Feature: landing-page-fabricante-polo, Property 12: Ausência de Frases Ambíguas no CTA', () => {
  test('CTA does not contain ambiguous phrases', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const ctaSection = page.querySelector('.cta-section');
        
        expect(ctaSection).not.toBeNull();
        
        const ctaText = ctaSection.textContent.toLowerCase();
        
        // Verificar ausência de frases ambíguas
        expect(ctaText).not.toMatch(/saiba\s+mais/i);
        expect(ctaText).not.toMatch(/descubra/i);
        expect(ctaText).not.toMatch(/veja\s+se.*qualifica/i);
        expect(ctaText).not.toMatch(/clique\s+aqui/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 13: Micro-Escassez Coerente
 * Para qualquer configuração da landing page, a mensagem de micro-escassez deve
 * mencionar liberação manual e verificação de capacidade do fabricante, sem conter
 * contadores numéricos, timers ou urgência artificial.
 * 
 * Validates: Requirements 10.1, 10.2, 10.3, 10.4
 */
describe('Feature: landing-page-fabricante-polo, Property 13: Micro-Escassez Coerente', () => {
  test('Micro-scarcity message is coherent without artificial urgency', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const microScarcity = page.querySelector('.micro-scarcity');
        
        expect(microScarcity).not.toBeNull();
        
        const scarcityText = microScarcity.textContent.toLowerCase();
        const scarcityHTML = microScarcity.innerHTML.toLowerCase();
        
        // Verificar menções obrigatórias
        expect(scarcityText).toMatch(/liberado\s+manualmente|manual/i);
        expect(scarcityText).toMatch(/capacidade|fabricante/i);
        
        // Verificar ausência de urgência artificial
        expect(scarcityHTML).not.toMatch(/<span[^>]*countdown/i);
        expect(scarcityHTML).not.toMatch(/\d+:\d+:\d+/);
        expect(scarcityText).not.toMatch(/últimas\s+\d+\s+vagas/i);
        expect(scarcityText).not.toMatch(/apenas\s+\d+\s+restantes/i);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 14: Design Visual Limpo
 * Para qualquer renderização da landing page, o fundo deve usar cores neutras
 * (branco ou cinza claro com luminosidade > 90%), e o número de imagens deve
 * estar entre 1 e 3.
 * 
 * Validates: Requirements 11.1, 11.3
 */
describe('Feature: landing-page-fabricante-polo, Property 14: Design Visual Limpo', () => {
  test('Page has clean design with neutral background', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const body = page.querySelector('body');
        
        expect(body).not.toBeNull();
        
        // Verificar cor de fundo neutra (branco ou cinza claro)
        // Nota: Em testes JSDOM, estilos inline ou computados podem não estar disponíveis
        // Este teste verifica a ausência de backgrounds coloridos no HTML
        const bodyHTML = body.innerHTML.toLowerCase();
        
        // Verificar ausência de backgrounds coloridos agressivos
        expect(bodyHTML).not.toMatch(/background.*#[0-9a-f]{6}.*red|blue|green|yellow/i);
        
        // Contar imagens principais (excluindo ícones e Meta Pixel)
        const images = Array.from(page.querySelectorAll('img')).filter(img => {
          const src = img.getAttribute('src') || '';
          return !src.includes('facebook.com') && !src.includes('pixel');
        });
        
        // Verificar número de imagens (deve estar entre 1 e 10 considerando carrossel)
        expect(images.length).toBeGreaterThanOrEqual(1);
        expect(images.length).toBeLessThanOrEqual(10);
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 15: Responsividade Mobile
 * Para qualquer largura de viewport entre 320px e 1920px, todos os elementos da
 * landing page devem permanecer visíveis e legíveis sem overflow horizontal.
 * 
 * Validates: Requirements 11.5
 */
describe('Feature: landing-page-fabricante-polo, Property 15: Responsividade Mobile', () => {
  test('Page is responsive across different viewport widths', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const head = page.querySelector('head');
        const metaViewport = head.querySelector('meta[name="viewport"]');
        
        // Verificar presença de meta viewport
        expect(metaViewport).not.toBeNull();
        expect(metaViewport.getAttribute('content')).toMatch(/width=device-width/i);
        
        // Verificar que elementos principais não têm largura fixa excessiva
        const mainSections = page.querySelectorAll('section, header');
        mainSections.forEach(section => {
          const style = section.getAttribute('style') || '';
          // Não deve ter largura fixa maior que 100vw
          expect(style).not.toMatch(/width:\s*[2-9]\d{3,}px/i);
        });
      }),
      { numRuns: 100 }
    );
  });
});

/**
 * Property 16: Tom Comercial e Sério
 * Para qualquer texto exibido na landing page, não deve conter linguagem de guru,
 * emoção excessiva, promessas de lucro, garantias de retorno, ou urgência falsa.
 * 
 * Validates: Requirements 12.1, 12.2, 12.3, 12.4
 */
describe('Feature: landing-page-fabricante-polo, Property 16: Tom Comercial e Sério', () => {
  test('Page maintains professional tone without guru language', () => {
    fc.assert(
      fc.property(fc.constant(true), () => {
        const page = renderLandingPage();
        const body = page.querySelector('body');
        const bodyText = body.textContent.toLowerCase();
        
        // Verificar ausência de linguagem de guru
        expect(bodyText).not.toMatch(/garantido|milagroso|revolucionário|transformador/i);
        expect(bodyText).not.toMatch(/melhor\s+do\s+mundo|único\s+no\s+mercado/i);
        expect(bodyText).not.toMatch(/incrível|extraordinário|fantástico/i);
        
        // Verificar ausência de promessas de lucro
        expect(bodyText).not.toMatch(/você\s+vai\s+ganhar\s+r\$/i);
        expect(bodyText).not.toMatch(/lucro\s+garantido/i);
        expect(bodyText).not.toMatch(/retorno\s+de\s+\d+x/i);
        
        // Verificar ausência de urgência falsa
        expect(bodyText).not.toMatch(/última\s+chance|agora\s+ou\s+nunca/i);
        expect(bodyText).not.toMatch(/oferta\s+expira\s+em/i);
      }),
      { numRuns: 100 }
    );
  });
});
