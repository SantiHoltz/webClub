import express from 'express';
import sequelize from './db.js';
import cors from "cors";
import Comprador from './models/compradores.js';
import compradorRoutes from './routes/comprador.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ["http://localhost:5173", "http://localhost:3000", "https://canchaargentino-santiago-holtzs-projects.vercel.app"] 
    : ["http://localhost:5173", "http://localhost:3000"],
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
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

app.use("/compradores", compradorRoutes);

(async function start() {
    try {
        // Validar conexión a la base de datos.
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos establecida correctamente.');

        // Sincronizar modelos con la base de datos
        await sequelize.sync({ force: false });
        console.log('✅ Modelos sincronizados con la base de datos.');

        // Iniciar el servidor
        app.listen(PORT, () => {
            console.log(`🚀 Servidor iniciado y escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        process.exit(1); // Terminar el proceso si no se puede conectar
    }
})();
