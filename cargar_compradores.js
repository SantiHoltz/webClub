const axios = require('axios');
const fs = require('fs');

const API_BASE_URL = 'http://localhost:3000';

const compradorService = {
  crearComprador: async (comprador) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/compradores`, comprador);
      return response.data;
    } catch (error) {
      console.error('Error al crear comprador:', error.response?.data?.error || error.message);
      throw error;
    }
  }
};

const cargarCompradores = async (archivo) => {
  try {
    console.log('📁 Leyendo archivo:', archivo);
    const contenido = fs.readFileSync(archivo, 'utf8');
    const lineas = contenido.trim().split('\n');
    
    let compradoresCreados = 0;
    let errores = [];

    console.log('🚀 Iniciando carga masiva...\n');

    for (let i = 0; i < lineas.length; i++) {
      const linea = lineas[i].trim();
      if (!linea) continue;

      // Saltar encabezado si existe
      if (linea.toLowerCase().includes('nombre') && linea.toLowerCase().includes('cantidad')) {
        console.log('⏭️  Saltando encabezado...');
        continue;
      }

      const partes = linea.split(',').map(parte => parte.trim());
      
      if (partes.length !== 2) {
        errores.push(`Línea ${i + 1}: Formato incorrecto. Debe ser: Nombre, Cantidad`);
        continue;
      }

      const [nombre, metros] = partes;
      const cantidadMetros = parseInt(metros);

      if (!nombre || isNaN(cantidadMetros) || cantidadMetros <= 0) {
        errores.push(`Línea ${i + 1}: Datos inválidos para "${nombre}"`);
        continue;
      }

      try {
        // Crear un comprador por cada metro cuadrado
        for (let j = 0; j < cantidadMetros; j++) {
          await compradorService.crearComprador({ nombre: nombre });
          compradoresCreados++;
        }
        console.log(`✅ Línea ${i + 1}: "${nombre}" - ${cantidadMetros} compradores creados`);
      } catch (error) {
        errores.push(`Línea ${i + 1}: Error al crear compradores para "${nombre}"`);
      }
    }

    console.log('\n📊 === RESUMEN ===');
    console.log(`✅ Compradores creados: ${compradoresCreados}`);
    
    if (errores.length > 0) {
      console.log(`❌ Errores: ${errores.length}`);
      errores.forEach(error => console.log(`   ${error}`));
    } else {
      console.log('🎉 ¡Carga masiva completada sin errores!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Obtener archivo desde argumentos
const archivo = process.argv[2];

if (!archivo) {
  console.log('📝 Uso: node cargar_compradores.js <archivo.csv>');
  console.log('📋 Ejemplo: node cargar_compradores.js datos.csv');
  process.exit(1);
}

if (!fs.existsSync(archivo)) {
  console.error(`❌ El archivo "${archivo}" no existe`);
  process.exit(1);
}

cargarCompradores(archivo); 