import CompradoresRepository from "../repositories/compradoresRepository.js";

class CompradorService {
    async listar() {
        return await CompradoresRepository.listar();
    }

    async obtenerPorCuadricula(cuadricula) {
        return await CompradoresRepository.obtenerPorCuadricula(cuadricula);
    }

    async crear(comprador) {
        // Si no se especifica cuadrícula, asignar automáticamente
        if (!comprador.cuadricula) {
            const siguienteCuadricula = await this.obtenerSiguienteCuadricula();
            
            if (siguienteCuadricula > 567) {
                throw new Error('No hay más cuadrículas disponibles. Máximo 567.');
            }

            comprador.cuadricula = siguienteCuadricula;
        } else {
            // Verificar que la cuadrícula especificada no exceda el límite
            if (comprador.cuadricula > 567) {
                throw new Error('Número de cuadrícula inválido. Máximo 567.');
            }
        }

        return await CompradoresRepository.crear(comprador);
    }

    async actualizar(cuadricula, datos) {
        return await CompradoresRepository.actualizar(cuadricula, datos);
    }

    async eliminar(cuadricula) {
        try {
            return await CompradoresRepository.eliminar(cuadricula);
        } catch (error) {
            if (error.message.includes('no encontrada')) {
                return null; // Retornar null si no se encuentra
            }
            throw error; // Re-lanzar otros errores
        }
    }

    async obtenerSiguienteCuadricula() {
        return await CompradoresRepository.obtenerSiguienteCuadricula();
    }
}

export default new CompradorService();