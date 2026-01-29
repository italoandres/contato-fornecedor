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

module.exports = {
  initDatabase,
  insertLead,
  getLeadById,
  getAllLeads,
  insertSale,
  hasSale,
  getStats
};
