/**
 * Database Module - SQLite
 * Gerencia o banco de dados de leads e vendas
 */

const Database = require('better-sqlite3');
const path = require('path');

// Criar conexão com o banco de dados
const db = new Database(path.join(__dirname, 'leads.db'));

/**
 * Inicializar tabelas do banco de dados
 */
function initDatabase() {
  // Tabela de leads
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT UNIQUE NOT NULL,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      fbclid TEXT,
      fbp TEXT,
      fbc TEXT,
      client_ip TEXT,
      client_user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Tabela de vendas
  db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL,
      sale_value REAL NOT NULL,
      currency TEXT DEFAULT 'BRL',
      event_id TEXT UNIQUE NOT NULL,
      meta_response TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(lead_id)
    )
  `);

  // Tabela de eventos (histórico completo)
  db.exec(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_id TEXT NOT NULL,
      event_type TEXT NOT NULL,
      event_name TEXT NOT NULL,
      event_data TEXT,
      meta_response TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (lead_id) REFERENCES leads(lead_id)
    )
  `);

  // Tabela de configurações de eventos
  db.exec(`
    CREATE TABLE IF NOT EXISTS event_config (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_name TEXT UNIQUE NOT NULL,
      enabled INTEGER DEFAULT 1,
      description TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Inserir configurações padrão se não existirem
  const checkConfig = db.prepare('SELECT COUNT(*) as count FROM event_config').get();
  if (checkConfig.count === 0) {
    const insertConfig = db.prepare(`
      INSERT INTO event_config (event_name, enabled, description) 
      VALUES (?, ?, ?)
    `);
    
    insertConfig.run('PageView', 1, 'Evento disparado quando alguém visita a landing page');
    insertConfig.run('Contact', 1, 'Evento disparado quando alguém clica no botão WhatsApp');
    insertConfig.run('Purchase', 1, 'Evento disparado quando uma venda é marcada no painel admin');
    
    console.log('✅ Configurações padrão de eventos criadas');
  }

  console.log('✅ Banco de dados inicializado');
}

/**
 * Inserir novo lead
 */
function insertLead(leadData) {
  const stmt = db.prepare(`
    INSERT INTO leads (
      lead_id, utm_source, utm_medium, utm_campaign, utm_content,
      fbclid, fbp, fbc, client_ip, client_user_agent
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    const result = stmt.run(
      leadData.lead_id,
      leadData.utm_source || null,
      leadData.utm_medium || null,
      leadData.utm_campaign || null,
      leadData.utm_content || null,
      leadData.fbclid || null,
      leadData.fbp || null,
      leadData.fbc || null,
      leadData.client_ip || null,
      leadData.client_user_agent || null
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao inserir lead:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Buscar lead por ID
 */
function getLeadById(leadId) {
  const stmt = db.prepare('SELECT * FROM leads WHERE lead_id = ?');
  return stmt.get(leadId);
}

/**
 * Listar todos os leads (com informação de venda)
 */
function getAllLeads() {
  const stmt = db.prepare(`
    SELECT 
      l.*,
      s.id as sale_id,
      s.sale_value,
      s.created_at as sale_date
    FROM leads l
    LEFT JOIN sales s ON l.lead_id = s.lead_id
    ORDER BY l.created_at DESC
  `);
  return stmt.all();
}

/**
 * Inserir venda
 */
function insertSale(saleData) {
  const stmt = db.prepare(`
    INSERT INTO sales (lead_id, sale_value, currency, event_id, meta_response)
    VALUES (?, ?, ?, ?, ?)
  `);

  try {
    const result = stmt.run(
      saleData.lead_id,
      saleData.sale_value,
      saleData.currency || 'BRL',
      saleData.event_id,
      saleData.meta_response || null
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao inserir venda:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verificar se lead já tem venda registrada
 */
function hasSale(leadId) {
  const stmt = db.prepare('SELECT COUNT(*) as count FROM sales WHERE lead_id = ?');
  const result = stmt.get(leadId);
  return result.count > 0;
}

/**
 * Inserir evento no histórico
 */
function insertEvent(eventData) {
  const stmt = db.prepare(`
    INSERT INTO events (lead_id, event_type, event_name, event_data, meta_response)
    VALUES (?, ?, ?, ?, ?)
  `);

  try {
    const result = stmt.run(
      eventData.lead_id,
      eventData.event_type,
      eventData.event_name,
      eventData.event_data ? JSON.stringify(eventData.event_data) : null,
      eventData.meta_response ? JSON.stringify(eventData.meta_response) : null
    );
    return { success: true, id: result.lastInsertRowid };
  } catch (error) {
    console.error('Erro ao inserir evento:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Buscar eventos de um lead
 */
function getEventsByLeadId(leadId) {
  const stmt = db.prepare(`
    SELECT * FROM events 
    WHERE lead_id = ? 
    ORDER BY created_at DESC
  `);
  return stmt.all(leadId);
}

/**
 * Buscar todos os eventos com filtro de data
 */
function getAllEvents(startDate = null, endDate = null) {
  let query = `
    SELECT e.*, l.utm_source, l.utm_campaign
    FROM events e
    LEFT JOIN leads l ON e.lead_id = l.lead_id
  `;
  
  const params = [];
  
  if (startDate && endDate) {
    query += ' WHERE e.created_at BETWEEN ? AND ?';
    params.push(startDate, endDate);
  } else if (startDate) {
    query += ' WHERE e.created_at >= ?';
    params.push(startDate);
  } else if (endDate) {
    query += ' WHERE e.created_at <= ?';
    params.push(endDate);
  }
  
  query += ' ORDER BY e.created_at DESC';
  
  const stmt = db.prepare(query);
  return params.length > 0 ? stmt.all(...params) : stmt.all();
}

/**
 * Obter estatísticas de eventos
 */
function getEventStats() {
  const pageViews = db.prepare('SELECT COUNT(*) as count FROM events WHERE event_name = ?').get('PageView').count;
  const contacts = db.prepare('SELECT COUNT(*) as count FROM events WHERE event_name = ?').get('Contact').count;
  const purchases = db.prepare('SELECT COUNT(*) as count FROM events WHERE event_name = ?').get('Purchase').count;
  
  return {
    pageViews,
    contacts,
    purchases
  };
}

/**
 * Obter estatísticas
 */
function getStats() {
  const totalLeads = db.prepare('SELECT COUNT(*) as count FROM leads').get().count;
  const totalSales = db.prepare('SELECT COUNT(*) as count FROM sales').get().count;
  const totalRevenue = db.prepare('SELECT SUM(sale_value) as total FROM sales').get().total || 0;
  
  return {
    totalLeads,
    totalSales,
    totalRevenue,
    conversionRate: totalLeads > 0 ? ((totalSales / totalLeads) * 100).toFixed(2) : 0
  };
}

/**
 * Obter configurações de eventos
 */
function getEventConfig() {
  const stmt = db.prepare('SELECT * FROM event_config ORDER BY id');
  return stmt.all();
}

/**
 * Atualizar configuração de evento
 */
function updateEventConfig(eventName, enabled) {
  const stmt = db.prepare(`
    UPDATE event_config 
    SET enabled = ?, updated_at = CURRENT_TIMESTAMP 
    WHERE event_name = ?
  `);
  
  try {
    const result = stmt.run(enabled ? 1 : 0, eventName);
    return { success: true, changes: result.changes };
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Verificar se um evento está habilitado
 */
function isEventEnabled(eventName) {
  const stmt = db.prepare('SELECT enabled FROM event_config WHERE event_name = ?');
  const result = stmt.get(eventName);
  return result ? result.enabled === 1 : true; // Se não existir, assume habilitado
}

module.exports = {
  initDatabase,
  insertLead,
  getLeadById,
  getAllLeads,
  insertSale,
  hasSale,
  getStats,
  insertEvent,
  getEventsByLeadId,
  getAllEvents,
  getEventStats,
  getEventConfig,
  updateEventConfig,
  isEventEnabled
};
