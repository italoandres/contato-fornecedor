/**
 * Meta Conversions API Module
 * Envia eventos de conversão para o Facebook
 */

const axios = require('axios');
const crypto = require('crypto');

/**
 * Hash SHA256 para dados sensíveis
 */
function hashSHA256(data) {
  if (!data) return null;
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex');
}

/**
 * Enviar evento Contact para Meta Conversions API
 * 
 * @param {Object} eventData - Dados do evento
 * @param {string} eventData.lead_id - ID do lead
 * @param {string} eventData.event_id - ID único do evento
 * @param {string} eventData.fbp - Cookie _fbp
 * @param {string} eventData.fbc - Cookie _fbc
 * @param {string} eventData.client_ip - IP do cliente
 * @param {string} eventData.client_user_agent - User Agent do cliente
 * @param {number} eventData.event_time - Timestamp do evento
 */
async function sendContactEvent(eventData) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    throw new Error('META_PIXEL_ID e META_ACCESS_TOKEN devem estar configurados no .env');
  }

  const url = `https://graph.facebook.com/v18.0/${pixelId}/events`;

  // Preparar dados do evento Contact
  const eventPayload = {
    data: [
      {
        event_name: 'Contact',
        event_time: eventData.event_time || Math.floor(Date.now() / 1000),
        event_id: eventData.event_id,
        action_source: 'website',
        event_source_url: eventData.event_source_url || 'https://contatofornecedor.netlify.app',
        user_data: {
          client_ip_address: eventData.client_ip,
          client_user_agent: eventData.client_user_agent,
          fbp: eventData.fbp,
          fbc: eventData.fbc
        },
        custom_data: {
          content_name: 'WhatsApp Button Click',
          content_category: 'Lead Generation',
          lead_id: eventData.lead_id
        }
      }
    ],
    access_token: accessToken
  };

  try {
    console.log('📤 Enviando evento Contact para Meta...');
    console.log('Event ID:', eventData.event_id);

    const response = await axios.post(url, eventPayload);

    console.log('✅ Evento Contact enviado com sucesso!');
    console.log('Resposta Meta:', JSON.stringify(response.data, null, 2));

    return {
      success: true,
      response: response.data,
      eventId: eventData.event_id
    };

  } catch (error) {
    console.error('❌ Erro ao enviar evento Contact para Meta:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message,
      eventId: eventData.event_id
    };
  }
}

/**
 * Enviar evento Purchase para Meta Conversions API (CAPI PURO)
 * 
 * @param {Object} eventData - Dados do evento
 * @param {string} eventData.lead_id - ID do lead
 * @param {string} eventData.event_id - ID único do evento
 * @param {number} eventData.value - Valor da venda
 * @param {string} eventData.currency - Moeda (BRL)
 * @param {string} eventData.client_ip - IP do cliente
 * @param {string} eventData.client_user_agent - User Agent do cliente
 * @param {number} eventData.event_time - Timestamp do evento
 */
async function sendPurchaseEvent(eventData) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    throw new Error('META_PIXEL_ID e META_ACCESS_TOKEN devem estar configurados no .env');
  }

  const url = `https://graph.facebook.com/v19.0/${pixelId}/events`;

  // Hash do lead_id para external_id (identificação única do usuário)
  const external_id = hashSHA256(eventData.lead_id);

  // Preparar dados do evento (CAPI PURO - SEM fbp/fbc)
  const eventPayload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: eventData.event_time || Math.floor(Date.now() / 1000),
        event_id: eventData.event_id, // IMPORTANTE: deduplicação
        action_source: 'website',
        user_data: {
          external_id: external_id, // Identificação única do usuário
          client_ip_address: eventData.client_ip,
          client_user_agent: eventData.client_user_agent
        },
        custom_data: {
          currency: eventData.currency || 'BRL',
          value: parseFloat(eventData.value)
        }
      }
    ],
    access_token: accessToken
  };

  try {
    console.log('📤 Enviando evento Purchase para Meta (CAPI PURO)...');
    console.log('Event ID:', eventData.event_id);
    console.log('External ID:', external_id);
    console.log('Valor:', eventData.value, eventData.currency);

    const response = await axios.post(url, eventPayload);

    console.log('✅ Evento enviado com sucesso!');
    console.log('Resposta Meta:', JSON.stringify(response.data, null, 2));

    return {
      success: true,
      response: response.data,
      eventId: eventData.event_id
    };

  } catch (error) {
    console.error('❌ Erro ao enviar evento para Meta:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message,
      eventId: eventData.event_id
    };
  }
}

/**
 * Enviar evento com retry automático
 * Tenta enviar até 3 vezes em caso de falha
 */
async function sendPurchaseEventWithRetry(eventData, maxRetries = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Tentativa ${attempt} de ${maxRetries}...`);
      const result = await sendPurchaseEvent(eventData);
      
      if (result.success) {
        return result;
      }
      
      lastError = result.error;
      
      // Aguardar antes de tentar novamente (backoff exponencial)
      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000; // 2s, 4s, 8s
        console.log(`⏳ Aguardando ${waitTime/1000}s antes de tentar novamente...`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
      
    } catch (error) {
      lastError = error;
      console.error(`❌ Tentativa ${attempt} falhou:`, error.message);
    }
  }

  console.error(`❌ Todas as ${maxRetries} tentativas falharam`);
  return {
    success: false,
    error: lastError,
    eventId: eventData.event_id
  };
}

/**
 * Testar conexão com Meta API
 */
async function testMetaConnection() {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return {
      success: false,
      message: 'META_PIXEL_ID e META_ACCESS_TOKEN não configurados'
    };
  }

  try {
    const url = `https://graph.facebook.com/v18.0/${pixelId}?access_token=${accessToken}`;
    const response = await axios.get(url);
    
    return {
      success: true,
      message: 'Conexão com Meta API OK',
      pixelName: response.data.name
    };
  } catch (error) {
    return {
      success: false,
      message: 'Erro ao conectar com Meta API',
      error: error.response?.data || error.message
    };
  }
}

/**
 * Enviar evento de TESTE para Meta
 * Este evento aparecerá na aba "Test Events" do Events Manager
 */
async function sendTestEvent() {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    throw new Error('META_PIXEL_ID e META_ACCESS_TOKEN devem estar configurados no .env');
  }

  const url = `https://graph.facebook.com/v18.0/${pixelId}/events`;

  // Criar evento de teste com o código do Facebook
  const testEventPayload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: `test_event_${Date.now()}`,
        action_source: 'website',
        event_source_url: 'http://localhost:3000',
        user_data: {
          client_ip_address: '127.0.0.1',
          client_user_agent: 'Mozilla/5.0 (Test Event)',
          fbp: `fb.1.${Date.now()}.123456789`,
          fbc: `fb.1.${Date.now()}.test_fbclid`
        },
        custom_data: {
          value: 597.00,
          currency: 'BRL',
          content_type: 'product',
          content_name: 'Acesso ao Fabricante - TESTE'
        }
      }
    ],
    test_event_code: 'TEST90044', // Código de teste do Facebook
    access_token: accessToken
  };

  try {
    console.log('🧪 Enviando EVENTO DE TESTE para Meta...');
    console.log('📍 Código de teste: TEST90044');
    console.log('📍 Verifique em: Events Manager > Test Events');

    const response = await axios.post(url, testEventPayload);

    console.log('✅ Evento de teste enviado!');
    console.log('Resposta:', JSON.stringify(response.data, null, 2));

    return {
      success: true,
      message: 'Evento de teste enviado com sucesso!',
      instructions: 'Acesse Events Manager > Test Events para ver o evento',
      test_code: 'TEST90044',
      response: response.data
    };

  } catch (error) {
    console.error('❌ Erro ao enviar evento de teste:', error.response?.data || error.message);
    
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
}

module.exports = {
  sendContactEvent,
  sendPurchaseEvent,
  sendPurchaseEventWithRetry,
  testMetaConnection,
  sendTestEvent
};
