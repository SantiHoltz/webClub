import express from 'express';
import sequelize from './db.js';
import cors from "cors";
import Comprador from './models/compradores.js';
import compradorRoutes from './routes/comprador.routes.js';
// ... tus imports de siempre
import serverless from "serverless-http";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors({ origin: true, methods: ["GET","POST","PUT","DELETE"], credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 1) Respuestas inmediatas (no DB)
app.get("/health", (_req, res) => res.json({ ok: true }));

app.get("/", (req, res) => {
  const currentUrl = req.protocol + "://" + req.get("host");
  res.status(200).send(`<!doctype html><html><head><meta charset="utf-8"><title>API</title>
  <style>body{background:#f2f2f2;font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh}
  .container{background:#fff;padding:2rem;border-radius:12px;box-shadow:0 0 12px rgba(0,0,0,.1);text-align:center}</style></head>
  <body><div class="container"><h1>🚀 API con Base de Datos</h1>
  <p>API: <strong>${currentUrl}</strong></p>
  <p>Estado: ✅ Funciona</p></div></body></html>`);
});

// 2) Init DB en background (no bloquea)
let initStarted = false;
async function initDb() {
  try {
    await sequelize.authenticate();
    // si no necesitás migrar en cada arranque, mejor NO hacer sync
    // await sequelize.sync({ force: false });
    console.log("✅ DB lista");
  } catch (e) {
    console.error("❌ Error DB:", e);
  }
}
function ensureInitOnce() {
  if (!initStarted) { initStarted = true; initDb(); }
}
ensureInitOnce();

// 3) Rutas que usan DB
app.use("/compradores", (req, res, next) => { ensureInitOnce(); next(); }, compradorRoutes);

// 4) Error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error", detail: String(err?.message || err) });
});

// Local dev
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Dev en http://localhost:${PORT}`));
}

// Vercel
export default serverless(app);
