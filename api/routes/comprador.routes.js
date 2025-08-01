import express from "express";
import CompradorService from "../services/compradorService.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const compradores = await CompradorService.listar(req.query);
    res.json(compradores);
});

router.get("/:cuadricula", async (req, res) => {
    const comprador = await CompradorService.obtenerPorCuadricula(req.params.cuadricula);
    res.json(comprador);
});

router.post("/", async (req, res) => {
    console.log('POST /compradores - Body recibido:', JSON.stringify(req.body, null, 2));
    try {
        const comprador = await CompradorService.crear(req.body);
        res.json(comprador);
    } catch (error) {
        console.error('Error al crear comprador:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put("/:cuadricula", async (req, res) => {
    const comprador = await CompradorService.actualizar(req.params.cuadricula, req.body);
    res.json(comprador);
});

router.delete("/:cuadricula", async (req, res) => {
    try {
        const comprador = await CompradorService.eliminar(req.params.cuadricula);
        if (!comprador) {
            return res.status(404).json({ error: `No se encontró un comprador con la cuadrícula ${req.params.cuadricula}` });
        }
        res.json(comprador);
    } catch (error) {
        console.error('Error al eliminar comprador:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;