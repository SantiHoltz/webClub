export default class RepositorioBase {
    constructor(modelo) {
      this.modelo = modelo;
    }
  
    async obtenerTodos() {
      return this.modelo.findAll();
    }
  
    async obtenerPorCuadricula(cuadricula) {
      return this.modelo.findByPk(cuadricula);
    }
  
    async crear(datos) {
      return this.modelo.create(datos);
    }
  
    async actualizar(cuadricula, datos) {
      const instancia = await this.modelo.findByPk(cuadricula);
      if (!instancia) throw new Error(`Error: Instancia con id: ${cuadricula} no encontrada`);
  
      return instancia.update(datos);
    }
  
    async eliminar(cuadricula) {
      const instancia = await this.modelo.findByPk(cuadricula);
      if (!instancia) throw new Error(`Error: Instancia con id: ${cuadricula} no encontrada`);
      await instancia.destroy();
      return instancia;
    }
  
    async contarTodos() {
      return this.modelo.count();
    }
  }
  
  