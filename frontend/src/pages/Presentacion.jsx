import React from "react";
import { useNavigate } from "react-router-dom";
import "./Presentacion.css";

const Presentacion = () => {
    const navigate = useNavigate();

    const handleVerProgreso = () => {
        navigate('/cuadrados');
    };

    return (
        <div className="presentacion-container">
            <div className="presentacion-header">
                <h1>RENOVACIÓN PISO GIMNASIO</h1>
                <h2>Club Argentino - Marcos Juárez</h2>
                <button className="btn-ver-progreso" onClick={handleVerProgreso}>
                    Ver Progreso
                </button>
            </div>

            <div className="presentacion-content">
                <div className="carta-section">
                    <h3>A quien corresponda:</h3>
                    
                    <p>
                        Nos acercamos con una solicitud muy especial: renovar el piso de nuestro gimnasio principal, 
                        ese mismo que durante más de 60 años fue testigo silencioso del paso de generaciones enteras 
                        de deportistas, entrenadores, familias y sueños.
                    </p>

                    <p>
                        Allí se vivieron los primeros pasos de muchos chicos y chicas que encontraron en el deporte 
                        un lugar de pertenencia, de valores, de afecto. En ese mismo piso se festejaron triunfos 
                        inolvidables, se abrazaron derrotas con dignidad, y se sembraron historias que siguen vivas 
                        en la memoria de quienes alguna vez formaron parte del club.
                    </p>

                    <p>
                        Cambiar el piso puede parecer una mejora edilicia más, pero para nosotros representa un acto 
                        profundamente simbólico: no estamos renovando una superficie, estamos honrando una historia 
                        y abriendo paso al futuro.
                    </p>

                    <div className="lema-destacado">
                        <h3>"No es solamente un piso, es una historia"</h3>
                    </div>

                    <p>
                        Por eso, bajo este lema, invitamos a todos quienes valoran el deporte como herramienta de 
                        transformación social a sumarse a esta campaña. Toda colaboración, por mínima que parezca, 
                        es una muestra de compromiso con lo que fuimos y con lo que aún podemos ser.
                    </p>

                    <p>
                        Agradecemos profundamente su atención y sensibilidad ante este pedido, que nace del
                        corazón mismo de nuestra historia deportiva y comunitaria.
                    </p>
                </div>

                <div className="firma-section">
                    <p>Con afecto y esperanza,</p>
                    <div className="firma">
                        <h4>Juan Pablo Holtz</h4>
                        <p>Presidente de la Sub Comisión de Basquetbol</p>
                        <p>3472 - 449260</p>
                    </div>
                    <div className="club-info">
                        <h4>CLUB A. B. y M. ARGENTINO</h4>
                        <p>Marcos Juárez, Córdoba</p>
                    </div>
                </div>

                <div className="cta-section">
                    <h3>¿Cómo puedes ayudar?</h3>
                    <div className="opciones-ayuda">
                        <div className="opcion">
                            <h4>📢 Difusión</h4>
                            <p>Compartir esta iniciativa en redes sociales</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Presentacion;