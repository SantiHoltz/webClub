import express from 'express';
import sequelize from './db.js';
import cors from "cors";
import Comprador from './models/compradores.js';
import compradorRoutes from './routes/comprador.routes.js';

// Cargar variables de entorno desde archivo .env
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: true, // Permitir todos los orígenes temporalmente
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app
  .use(express.json({ limit: '10mb' }))
  .use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware para manejar errores de JSON
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    console.error('Error de JSON:', error.message);
    console.error('Body recibido:', req.body);
    return res.status(400).json({ 
      error: 'JSON inválido', 
      message: error.message,
      receivedBody: req.body 
    });
  }
  next();
});

// Ruta principal de servidor
app.get("/", (req, res) => {
  const currentUrl = req.protocol + '://' + req.get('host');
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color: #f2f2f2; font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>${currentUrl}</strong></p>
          <p>Estado: <span style="color: green;">✅ Funcionando</span></p>
        </div>
      </body>
    </html>
  `);
});

app.use("/compradores", compradorRoutes);

// Función para inicializar la base de datos
async function initializeDatabase() {
    try {
        // Validar conexión a la base de datos.
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');

        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: false });
        console.log('✅ Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        throw error;
    }
}

// Inicializar base de datos al importar el módulo
initializeDatabase().catch(console.error);

// Iniciar servidor solo si no estamos en Vercel
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 Servidor iniciado y escuchando en el puerto ${PORT}`);
    });
}

// Exportar la app para Vercel
export default app;
