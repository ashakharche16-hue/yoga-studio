import { Pool } from "pg";

const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG_NAME = "site_config";

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL ? { rejectUnauthorized: false } : false,
});

let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS app_config (
      name text PRIMARY KEY,
      data jsonb NOT NULL
    );
  `);
  tableReady = true;
}

const parseRequestBody = async (req) => {
  if (typeof req.json === "function") {
    return await req.json();
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  return raw ? JSON.parse(raw) : {};
};

export default async function handler(req, res) {
  try {
    if (!DATABASE_URL) {
      return res.status(500).json({ error: "Missing DATABASE_URL in runtime environment." });
    }

    await ensureTable();

    if (req.method === "GET") {
      const result = await pool.query(
        "SELECT data FROM app_config WHERE name = $1",
        [CONFIG_NAME]
      );
      if (result.rowCount === 0) {
        return res.status(200).json({});
      }
      return res.status(200).json(result.rows[0].data);
    }

    if (req.method === "POST") {
      const payload = await parseRequestBody(req);
      await pool.query(
        `INSERT INTO app_config (name, data)
         VALUES ($1, $2)
         ON CONFLICT (name) DO UPDATE SET data = EXCLUDED.data;`,
        [CONFIG_NAME, payload]
      );
      return res.status(200).json({ ok: true });
    }

    res.setHeader("Allow", "GET, POST");
    res.status(405).end();
  } catch (error) {
    console.error("Config API error", error);
    res.status(500).json({ error: "Unable to access Postgres config store." });
  }
}
