import { Op } from "sequelize";
import Comprador from "../models/compradores.js";
import RepositorioBase from "./repositorioBase.js";

class CompradoresRepository extends RepositorioBase {
  constructor() {
    super(Comprador);
  }

  async listar() {
    return Comprador.findAll({
        attributes: ["nombre", "cuadricula"], 
        order: [["cuadricula", "ASC"]]
    });
  }

  async obtenerPorCuadricula(cuadricula) {
    return Comprador.findOne({
        where: { cuadricula: cuadricula }
    });
  }

  async obtenerSiguienteCuadricula() {
    // Obtener todas las cuadrículas ocupadas ordenadas
    const cuadriculasOcupadas = await Comprador.findAll({
      attributes: ['cuadricula'],
      order: [['cuadricula', 'ASC']]
    });

    const numerosOcupados = cuadriculasOcupadas.map(c => c.cuadricula);
    
    // Buscar la primera cuadrícula disponible empezando desde 1
    let cuadriculaDisponible = 1;
    while (numerosOcupados.includes(cuadriculaDisponible)) {
      cuadriculaDisponible++;
    }
    
    return cuadriculaDisponible;
  }
}

export default new CompradoresRepository();
