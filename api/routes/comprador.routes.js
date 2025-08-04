import express from "express";
import CompradorService from "../services/compradorService.js";
import myCache from "../services/cacheService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    if (myCache.has('compradores_lista')) {
        console.log('✅ Desde caché');
        res.json(myCache.get('compradores_lista'));
    } else {
        console.log('📊 Desde base de datos');
        const compradores = await CompradorService.listar(req.query);
        myCache.set('compradores_lista', compradores);
        res.json(compradores);
    }
});

router.get("/:cuadricula", async (req, res) => {
    const cuadricula = req.params.cuadricula;
    const cacheKey = `comprador_${cuadricula}`;
    
    if (myCache.has(cacheKey)) {
        console.log(`✅ Desde caché: comprador ${cuadricula}`);
        res.json(myCache.get(cacheKey));
    } else {
        console.log(`📊 Desde base de datos: comprador ${cuadricula}`);
        const comprador = await CompradorService.obtenerPorCuadricula(cuadricula);
        myCache.set(cacheKey, comprador);
        res.json(comprador);
    }
});

router.post("/", async (req, res) => {
    console.log('POST /compradores - Body recibido:', JSON.stringify(req.body, null, 2));
    try {
        const comprador = await CompradorService.crear(req.body);
        
        // Invalidar caché después de crear
        myCache.del('compradores_lista');
        if (comprador.cuadricula) {
            myCache.del(`comprador_${comprador.cuadricula}`);
        }
        
        res.json(comprador);
    } catch (error) {
        console.error('Error al crear comprador:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/:cuadricula", async (req, res) => {
    const cuadricula = req.params.cuadricula;
    const comprador = await CompradorService.actualizar(cuadricula, req.body);
    
    // Invalidar caché después de actualizar
    myCache.del('compradores_lista');
    myCache.del(`comprador_${cuadricula}`);
    
    res.json(comprador);
});

router.delete("/:cuadricula", async (req, res) => {
    try {
        const cuadricula = req.params.cuadricula;
        const comprador = await CompradorService.eliminar(cuadricula);
        
        if (!comprador) {
            return res.status(404).json({ error: `No se encontró un comprador con la cuadrícula ${cuadricula}` });
        }
        
        // Invalidar caché después de eliminar
        myCache.del('compradores_lista');
        myCache.del(`comprador_${cuadricula}`);
        
        res.json(comprador);
    } catch (error) {
        console.error('Error al eliminar comprador:', error);
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para ver estadísticas del caché
router.get("/cache/stats", (req, res) => {
    const stats = myCache.getStats();
    const keys = myCache.keys();
    res.json({
        stats,
        keys,
        totalKeys: keys.length
    });
});

// Endpoint para limpiar el caché
router.delete("/cache/clear", (req, res) => {
    myCache.flushAll();
    res.json({ message: 'Caché limpiado exitosamente' });
});

export default router;