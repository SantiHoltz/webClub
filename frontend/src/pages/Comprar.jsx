import React from "react";
import "./Comprar.css";

const Comprar = () => {
    return (
        <div className="comprar-container">
            <div className="comprar-header">
                <h1>¡SUMATE A LA OBRA DEL GIMNASIO!</h1>
            </div>

            <div className="comprar-content">
                <div className="slogan-section">
                    <h2>Construyamos juntos el futuro de todos...</h2>
                </div>

                <div className="precio-destacado">
                    <h3>Valor del m²: $120.000.-</h3>
                </div>

                <div className="metodos-pago">
                    <h3>Métodos de Pago</h3>
                    
                    <div className="metodo-pago">
                        <div className="icono-metodo">➤</div>
                        <div className="detalle-metodo">
                            <h4>Pagos por transferencia bancaria</h4>
                            <p>al alias: <strong>filial.sm.argentino</strong></p>
                            <p className="nota">(enviar comprobante de la operación)</p>
                        </div>
                    </div>

                    <div className="metodo-pago">
                        <div className="icono-metodo">➤</div>
                        <div className="detalle-metodo">
                            <h4>Pagos con Tarjeta Marcos Juárez</h4>
                            <p>en hasta 6 cuotas sin interés</p>
                        </div>
                    </div>

                    <div className="metodo-pago">
                        <div className="icono-metodo">➤</div>
                        <div className="detalle-metodo">
                            <h4>Pagos en efectivo en la mutual</h4>
                            <p>del club</p>
                        </div>
                    </div>
                </div>

                <div className="contacto-section">
                    <h3>Interesados comunicarse al:</h3>
                    <div className="telefonos">
                        <a 
                            href="https://wa.me/5493472449260" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="telefono-link"
                        >
                            <div className="telefono">
                                <span className="numero">3472-449260</span>
                                <span className="whatsapp-icon">📱</span>
                            </div>
                        </a>
                        <a 
                            href="https://wa.me/5493472529451" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="telefono-link"
                        >
                            <div className="telefono">
                                <span className="numero">3472-529451</span>
                                <span className="whatsapp-icon">📱</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="info-adicional">
                    <div className="info-card">
                        <h4>¿Cómo funciona?</h4>
                        <p>Realiza el pago por cualquiera de los métodos disponibles. Una vez confirmado el pago, tu nombre aparecerá en el cuadrado seleccionado en menos de 24 horas.</p>
                    </div>
                    
                    <div className="info-card">
                        <h4>¿Por qué m²?</h4>
                        <p>Cada metro cuadrado representa una parte del nuevo piso del gimnasio. Al comprar un m², estás contribuyendo directamente a la renovación de este espacio histórico.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Comprar;
