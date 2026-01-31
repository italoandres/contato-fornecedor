/**
 * Servidor Backend - Sistema de Rastreamento Meta Ads
 * 
 * Funcionalidades:
 * - Receber e armazenar dados de leads
 * - Painel administrativo para marcar vendas
 * - Enviar eventos Purchase para Meta Conversions API
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const db = require('./database');
const meta = require('./metaConversions');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.SESSION_SECRET || 'default-secret-change-me';

// Middlewares
app.use(cors({
  origin: [
    'https://contatofornecedor.netlify.app',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Servir arquivos da landing page (pasta src)
app.use(express.static('../src'));

// Inicializar banco de dados
db.initDatabase();

/**
 * Middleware de autenticação JWT
 */
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

/**
 * ROTAS PÚBLICAS
 */

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

/**
 * POST /api/lead
 * Recebe dados do lead da landing page
 */
app.post('/api/lead', (req, res) => {
  try {
    const {
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      fbclid,
      fbp,
      fbc
    } = req.body;

    // Gerar ID único para o lead
    const lead_id = uuidv4();

    // Capturar IP e User Agent
    const client_ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const client_user_agent = req.headers['user-agent'];

    // Preparar dados do lead
    const leadData = {
      lead_id,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      fbclid,
      fbp,
      fbc,
      client_ip,
      client_user_agent
    };

    // Salvar no banco
    const result = db.insertLead(leadData);

    if (result.success) {
      console.log('✅ Novo lead registrado:', lead_id);
      
      // Registrar evento PageView no histórico (se habilitado)
      if (db.isEventEnabled('PageView')) {
        db.insertEvent({
          lead_id,
          event_type: 'pageview',
          event_name: 'PageView',
          event_data: { utm_source, utm_campaign, fbclid }
        });
        console.log('📊 Evento PageView registrado');
      } else {
        console.log('⏭️  Evento PageView desabilitado - não registrado');
      }
      
      res.json({ 
        success: true, 
        lead_id,
        message: 'Lead registrado com sucesso'
      });
    } else {
      console.error('❌ Erro ao registrar lead:', result.error);
      res.status(500).json({ 
        success: false, 
        error: 'Erro ao registrar lead' 
      });
    }

  } catch (error) {
    console.error('❌ Erro no endpoint /api/lead:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
});

/**
 * POST /api/whatsapp-click
 * Recebe clique no botão WhatsApp e envia evento Contact para Meta
 */
app.post('/api/whatsapp-click', async (req, res) => {
  try {
    const { lead_id } = req.body;

    if (!lead_id) {
      return res.status(400).json({ error: 'lead_id é obrigatório' });
    }

    // Buscar dados do lead
    const lead = db.getLeadById(lead_id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    // Verificar se evento Contact está habilitado
    if (!db.isEventEnabled('Contact')) {
      console.log('⏭️  Evento Contact desabilitado - não será enviado');
      return res.json({
        success: true,
        message: 'Clique registrado (evento Contact desabilitado)',
        meta_success: false,
        disabled: true
      });
    }

    // Gerar event_id único
    const event_id = `contact_${lead_id}_${Date.now()}`;

    // Preparar dados para Meta Conversions API
    const eventData = {
      lead_id,
      event_id,
      fbp: lead.fbp,
      fbc: lead.fbc,
      client_ip: lead.client_ip,
      client_user_agent: lead.client_user_agent,
      event_time: Math.floor(Date.now() / 1000)
    };

    // Enviar para Meta
    console.log('📤 Enviando evento Contact para Meta...');
    const metaResult = await meta.sendContactEvent(eventData);

    // Registrar evento no histórico
    db.insertEvent({
      lead_id,
      event_type: 'contact',
      event_name: 'Contact',
      event_data: { event_id, channel: 'whatsapp' },
      meta_response: metaResult
    });

    console.log('✅ Evento Contact registrado!');

    res.json({
      success: true,
      message: 'Clique no WhatsApp registrado',
      meta_success: metaResult.success,
      meta_response: metaResult
    });

  } catch (error) {
    console.error('❌ Erro ao processar clique WhatsApp:', error);
    res.status(500).json({ 
      error: 'Erro ao processar clique',
      details: error.message 
    });
  }
});

/**
 * ROTAS DE AUTENTICAÇÃO
 */

// POST /api/login
app.post('/api/login', async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: 'Senha não fornecida' });
  }

  // Comparar senha
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  if (password === adminPassword) {
    // Gerar JWT token
    const token = jwt.sign(
      { authenticated: true, timestamp: Date.now() },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ 
      success: true, 
      message: 'Login realizado com sucesso',
      token
    });
  } else {
    res.status(401).json({ error: 'Senha incorreta' });
  }
});

// POST /api/logout
app.post('/api/logout', (req, res) => {
  res.json({ success: true, message: 'Logout realizado' });
});

// GET /api/check-auth
app.get('/api/check-auth', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.json({ authenticated: false });
  }

  const token = authHeader.substring(7);

  try {
    jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true });
  } catch (error) {
    res.json({ authenticated: false });
  }
});

/**
 * ROTAS PROTEGIDAS (requerem autenticação)
 */

// GET /api/leads
app.get('/api/leads', requireAuth, (req, res) => {
  try {
    const leads = db.getAllLeads();
    res.json({ success: true, leads });
  } catch (error) {
    console.error('❌ Erro ao buscar leads:', error);
    res.status(500).json({ error: 'Erro ao buscar leads' });
  }
});

// GET /api/stats
app.get('/api/stats', requireAuth, (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// POST /api/sale
app.post('/api/sale', requireAuth, async (req, res) => {
  try {
    const { lead_id, sale_value } = req.body;

    if (!lead_id || !sale_value) {
      return res.status(400).json({ 
        error: 'lead_id e sale_value são obrigatórios' 
      });
    }

    // Verificar se lead existe
    const lead = db.getLeadById(lead_id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead não encontrado' });
    }

    // Verificar se já tem venda registrada
    if (db.hasSale(lead_id)) {
      return res.status(400).json({ error: 'Lead já possui venda registrada' });
    }

    // Verificar se evento Purchase está habilitado
    if (!db.isEventEnabled('Purchase')) {
      console.log('⏭️  Evento Purchase desabilitado - venda será salva mas evento não será enviado');
      
      // Salvar venda no banco mesmo com evento desabilitado
      const saleData = {
        lead_id,
        sale_value: parseFloat(sale_value),
        currency: 'BRL',
        event_id: `sale_${lead_id}_${Date.now()}`,
        meta_response: JSON.stringify({ disabled: true, message: 'Evento desabilitado' })
      };
      
      const dbResult = db.insertSale(saleData);
      
      if (dbResult.success) {
        return res.json({
          success: true,
          message: 'Venda registrada (evento Purchase desabilitado)',
          sale_id: dbResult.id,
          meta_success: false,
          disabled: true
        });
      } else {
        return res.status(500).json({
          success: false,
          error: 'Erro ao salvar venda no banco'
        });
      }
    }

    // Gerar event_id único (para deduplicação)
    const event_id = `sale_${lead_id}_${Date.now()}`;

    // Capturar IP real do admin (quem está marcando a venda)
    const client_ip = req.headers['x-forwarded-for']?.split(',')[0] || req.socket.remoteAddress || req.ip;
    const client_user_agent = req.headers['user-agent'];

    // Preparar dados para Meta Conversions API (CAPI PURO)
    const eventData = {
      lead_id,
      event_id,
      value: parseFloat(sale_value),
      currency: 'BRL',
      client_ip,
      client_user_agent,
      event_time: Math.floor(Date.now() / 1000)
    };

    // Enviar para Meta com retry
    console.log('📤 Enviando evento Purchase para Meta (CAPI PURO)...');
    console.log('Event Data:', JSON.stringify(eventData, null, 2));
    const metaResult = await meta.sendPurchaseEventWithRetry(eventData);
    console.log('Meta Result:', JSON.stringify(metaResult, null, 2));

    // Salvar venda no banco
    const saleData = {
      lead_id,
      sale_value: parseFloat(sale_value),
      currency: 'BRL',
      event_id,
      meta_response: JSON.stringify(metaResult)
    };

    const dbResult = db.insertSale(saleData);

    if (dbResult.success) {
      // Registrar evento Purchase no histórico
      db.insertEvent({
        lead_id,
        event_type: 'purchase',
        event_name: 'Purchase',
        event_data: { event_id, value: sale_value, currency: 'BRL' },
        meta_response: metaResult
      });
      
      console.log('✅ Venda registrada com sucesso!');
      res.json({
        success: true,
        message: 'Venda registrada e evento enviado para Meta',
        sale_id: dbResult.id,
        meta_success: metaResult.success,
        meta_response: metaResult
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Erro ao salvar venda no banco',
        meta_response: metaResult
      });
    }

  } catch (error) {
    console.error('❌ Erro ao processar venda:', error);
    res.status(500).json({ 
      error: 'Erro ao processar venda',
      details: error.message 
    });
  }
});

// GET /api/test-meta
app.get('/api/test-meta', requireAuth, async (req, res) => {
  try {
    const result = await meta.testMetaConnection();
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/send-test-event
app.get('/api/send-test-event', requireAuth, async (req, res) => {
  try {
    const result = await meta.sendTestEvent();
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// GET /api/events
app.get('/api/events', requireAuth, (req, res) => {
  try {
    const { start_date, end_date, lead_id } = req.query;
    
    let events;
    if (lead_id) {
      events = db.getEventsByLeadId(lead_id);
    } else {
      events = db.getAllEvents(start_date, end_date);
    }
    
    const eventStats = db.getEventStats();
    
    res.json({ 
      success: true, 
      events,
      stats: eventStats
    });
  } catch (error) {
    console.error('❌ Erro ao buscar eventos:', error);
    res.status(500).json({ error: 'Erro ao buscar eventos' });
  }
});

// GET /api/create-test-lead
app.get('/api/create-test-lead', requireAuth, (req, res) => {
  try {
    const lead_id = uuidv4();
    const timestamp = Date.now();

    const testLead = {
      lead_id,
      utm_source: 'facebook',
      utm_medium: 'cpc',
      utm_campaign: 'teste_conversions_api',
      utm_content: 'anuncio_teste',
      fbclid: `test_fbclid_${timestamp}`,
      fbp: `fb.1.${timestamp}.123456789`,
      fbc: `fb.1.${timestamp}.test_fbclid_${timestamp}`,
      client_ip: '177.45.123.45',
      client_user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };

    const result = db.insertLead(testLead);

    if (result.success) {
      console.log('✅ Lead de teste criado:', lead_id);
      res.json({
        success: true,
        message: 'Lead de teste criado com sucesso!',
        lead: testLead,
        instructions: [
          'Procure pelo lead com campanha: teste_conversions_api',
          'Marque venda nesse lead (valor: 597)',
          'Aguarde 10-15 minutos',
          'Verifique no Events Manager'
        ]
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Erro ao criar lead de teste'
      });
    }
  } catch (error) {
    console.error('❌ Erro ao criar lead de teste:', error);
    res.status(500).json({ error: 'Erro ao criar lead de teste' });
  }
});

// GET /api/event-config - Obter configurações de eventos
app.get('/api/event-config', requireAuth, (req, res) => {
  try {
    const config = db.getEventConfig();
    res.json({ success: true, config });
  } catch (error) {
    console.error('❌ Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
});

// POST /api/event-config - Atualizar configuração de evento
app.post('/api/event-config', requireAuth, (req, res) => {
  try {
    const { event_name, enabled } = req.body;
    
    if (!event_name || enabled === undefined) {
      return res.status(400).json({ 
        error: 'event_name e enabled são obrigatórios' 
      });
    }
    
    const result = db.updateEventConfig(event_name, enabled);
    
    if (result.success) {
      console.log(`✅ Configuração atualizada: ${event_name} = ${enabled ? 'habilitado' : 'desabilitado'}`);
      res.json({ 
        success: true, 
        message: 'Configuração atualizada com sucesso' 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('❌ Erro ao atualizar configuração:', error);
    res.status(500).json({ error: 'Erro ao atualizar configuração' });
  }
});

/**
 * Iniciar servidor
 */
app.listen(PORT, () => {
  console.log('');
  console.log('🚀 ========================================');
  console.log('🚀  Servidor Backend Iniciado!');
  console.log('🚀 ========================================');
  console.log(`📡 Servidor rodando em: http://localhost:${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 Painel Admin: http://localhost:${PORT}/admin.html`);
  console.log('🚀 ========================================');
  console.log('');
});
