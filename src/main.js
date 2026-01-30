// Arquivo principal JavaScript - Rastreamento Meta Ads

/**
 * Sistema de Rastreamento de Leads
 * Captura UTMs, fbclid, gera cookies fbp/fbc e envia para o backend
 */

// Configuração do backend
const BACKEND_URL = 'https://contato-fornecedor-backend.onrender.com'; // URL de produção

/**
 * Gerar cookie _fbp (Facebook Browser Pixel)
 * Formato: fb.{subdominio}.{timestamp}.{random}
 */
function generateFBP() {
  const existingFBP = getCookie('_fbp');
  if (existingFBP) return existingFBP;

  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000000000);
  const fbp = `fb.1.${timestamp}.${random}`;
  
  // Salvar cookie por 90 dias
  setCookie('_fbp', fbp, 90);
  return fbp;
}

/**
 * Gerar cookie _fbc (Facebook Click) a partir do fbclid
 */
function generateFBC(fbclid) {
  if (!fbclid) return null;
  
  const existingFBC = getCookie('_fbc');
  if (existingFBC) return existingFBC;

  const timestamp = Date.now();
  const fbc = `fb.1.${timestamp}.${fbclid}`;
  
  // Salvar cookie por 90 dias
  setCookie('_fbc', fbc, 90);
  return fbc;
}

/**
 * Obter parâmetro da URL
 */
function getURLParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

/**
 * Salvar/obter cookie
 */
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

/**
 * Capturar dados de rastreamento
 */
function captureTrackingData() {
  // Capturar UTMs
  const utm_source = getURLParameter('utm_source');
  const utm_medium = getURLParameter('utm_medium');
  const utm_campaign = getURLParameter('utm_campaign');
  const utm_content = getURLParameter('utm_content');
  const fbclid = getURLParameter('fbclid');

  // Gerar/obter cookies
  const fbp = generateFBP();
  const fbc = generateFBC(fbclid);

  const trackingData = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    fbclid,
    fbp,
    fbc,
    timestamp: new Date().toISOString()
  };

  // Salvar no localStorage
  localStorage.setItem('trackingData', JSON.stringify(trackingData));

  console.log('📊 Dados de rastreamento capturados:', trackingData);
  return trackingData;
}

/**
 * Enviar lead para o backend
 */
async function sendLeadToBackend(trackingData) {
  try {
    console.log('📤 Enviando lead para o backend...');
    
    const response = await fetch(`${BACKEND_URL}/api/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(trackingData)
    });

    const data = await response.json();

    if (data.success) {
      console.log('✅ Lead registrado com sucesso!');
      console.log('Lead ID:', data.lead_id);
      
      // Salvar lead_id no localStorage
      localStorage.setItem('lead_id', data.lead_id);
      
      // Atualizar link do WhatsApp com o lead_id
      updateWhatsAppLink(data.lead_id);
      
      return data.lead_id;
    } else {
      console.error('❌ Erro ao registrar lead:', data.error);
    }
  } catch (error) {
    console.error('❌ Erro ao enviar lead:', error);
  }
}

/**
 * Atualizar link do WhatsApp com lead_id
 */
function updateWhatsAppLink(leadId) {
  const whatsappButton = document.querySelector('.cta-button');
  if (whatsappButton && leadId) {
    const currentHref = whatsappButton.getAttribute('href');
    const shortLeadId = leadId.substring(0, 8);
    
    // Adicionar lead_id na mensagem
    const newHref = currentHref.replace(
      'Ol%C3%A1%2C%20tenho%20interesse',
      `Ol%C3%A1%2C%20tenho%20interesse%20(ID%3A${shortLeadId})`
    );
    
    whatsappButton.setAttribute('href', newHref);
    console.log('✅ Link do WhatsApp atualizado com Lead ID');
  }
}

/**
 * Rastrear clique no botão WhatsApp
 */
function trackWhatsAppClick() {
  const whatsappButton = document.querySelector('.cta-button');
  if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
      console.log('📱 Clique no botão WhatsApp rastreado');
      
      // Você pode enviar um evento adicional aqui se desejar
      const leadId = localStorage.getItem('lead_id');
      console.log('Lead ID:', leadId);
    });
  }
}

/**
 * Inicializar rastreamento quando a página carregar
 */
document.addEventListener('DOMContentLoaded', async function() {
  console.log('🚀 Sistema de rastreamento iniciado');
  
  // Capturar dados de rastreamento
  const trackingData = captureTrackingData();
  
  // Enviar para o backend
  await sendLeadToBackend(trackingData);
  
  // Configurar rastreamento de cliques
  trackWhatsAppClick();
});

console.log('Landing Page Fabricante Polo carregada');



/**
 * Carrossel de Imagens
 */
let currentSlide = 0;
const totalSlides = 4;

function moveCarousel(direction) {
  const track = document.querySelector('.carousel-track');
  if (!track) return;

  currentSlide += direction;

  // Loop infinito
  if (currentSlide < 0) {
    currentSlide = totalSlides - 1;
  } else if (currentSlide >= totalSlides) {
    currentSlide = 0;
  }

  const offset = -currentSlide * 100;
  track.style.transform = `translateX(${offset}%)`;
}

// Suporte a swipe em dispositivos móveis
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left - próximo
      moveCarousel(1);
    } else {
      // Swipe right - anterior
      moveCarousel(-1);
    }
  }
}

// Adicionar eventos de touch quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.carousel');
  
  if (carousel) {
    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  // Auto-play opcional (descomente se quiser)
  // setInterval(() => moveCarousel(1), 5000);
});
