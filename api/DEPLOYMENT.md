# Despliegue en Render

## Pasos para desplegar la API en Render

### 1. Preparación del repositorio
- Asegúrate de que tu código esté en un repositorio de GitHub
- El repositorio puede contener tanto la API como el frontend
- Render solo desplegará la carpeta `api/` gracias a la configuración `rootDir: api`

### 2. Crear cuenta en Render
- Ve a [render.com](https://render.com)
- Crea una cuenta o inicia sesión
- Conecta tu cuenta de GitHub

### 3. Crear nuevo servicio web
- Haz clic en "New +" y selecciona "Web Service"
- Conecta tu repositorio de GitHub
- Selecciona el repositorio que contiene tu API

### 4. Configuración del servicio
- **Name**: `parque-api` (o el nombre que prefieras)
- **Environment**: `Node`
- **Region**: Selecciona la más cercana a tus usuarios
- **Branch**: `main` (o la rama principal)
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 5. Variables de entorno
Configura las siguientes variables de entorno en Render:

```
NODE_ENV=production
PORT=10000
DATABASE_URL=tu_url_de_neon_aqui
```

### 6. Desplegar
- Haz clic en "Create Web Service"
- Render comenzará a construir y desplegar tu aplicación
- El proceso puede tomar varios minutos

### 7. Verificar el despliegue
- Una vez completado, Render te proporcionará una URL
- Tu API estará disponible en esa URL
- Puedes probar accediendo a la ruta raíz `/`

## Estructura de archivos necesaria

Tu repositorio puede tener esta estructura:
```
parque/
├── api/                    ← Solo esto se despliega en Render
│   ├── app.js
│   ├── db.js
│   ├── package.json
│   ├── render.yaml
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── repositories/
├── frontend/               ← Esto se ignora en Render
├── .renderignore           ← Archivo para ignorar archivos
└── README.md
```

**Importante**: Render solo desplegará la carpeta `api/` gracias a la configuración `rootDir: api` en `render.yaml`.

## Notas importantes

- **Base de datos**: Asegúrate de que tu base de datos Neon esté accesible desde internet
- **Variables de entorno**: Nunca subas credenciales directamente al código
- **Logs**: Puedes ver los logs de tu aplicación en el dashboard de Render
- **Escalado**: Render ofrece planes gratuitos y de pago para diferentes necesidades
- **Frontend separado**: El frontend no se despliega en Render, solo la API

## ¿Por qué solo se despliega la API?

- **`rootDir: api`** en `render.yaml` le dice a Render que solo use la carpeta `api/`
- **`.renderignore`** ignora archivos innecesarios como `frontend/`, `node_modules/`, etc.
- Esto permite mantener todo en un solo repositorio pero desplegar solo lo necesario
- Tu frontend puede desplegarse por separado en Vercel, Netlify, o cualquier otra plataforma

## Solución de problemas comunes

### Error de conexión a la base de datos
- Verifica que la URL de la base de datos sea correcta
- Asegúrate de que la base de datos esté accesible desde internet
- Verifica que las credenciales sean correctas

### Error de puerto
- Render asigna automáticamente el puerto, usa `process.env.PORT`
- No hardcodees números de puerto en tu código

### Error de build
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el comando de build sea correcto
