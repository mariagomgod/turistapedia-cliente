import { useState } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useHistory } from "react-router-dom";
import { startSpeaking } from '../modules/Speech';
import { BASE_API_URL } from '../config/config';

export default function Register() {

    const [registerData, setRegisterData] = useState({});

    const history = useHistory();

    const register = e => {

        e.preventDefault();

        const form = e.target;

        fetch(`${BASE_API_URL}/users`, {
            method: 'POST',
            body: JSON.stringify(registerData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    setRegisterData({}); // vaciamos el estado
                    form.reset();           // vaciamos el formulario
                    startSpeaking("Registro exitoso. Redirigiendo a la página de inicio de sesión...");
                    NotificationManager.success("Registro exitoso. Redirigiendo a la página de inicio de sesión...", "Éxito", 3000);
                    setTimeout(() => history.push('/login'), 3000); // setTimeout nos permite redirigir al usuario a la página de login después de 3 segundos

                } else if (response.status >= 400 && response.status < 500) {
                    response.json().then(data => {
                        if (data.message.includes("unique")) {
                            const email = document.getElementById("email");
                            email.setCustomValidity("Este email ya está en uso, utiliza uno diferente");
                        }
                        startSpeaking("Por favor, revise el formulario");
                        NotificationManager.warning("Por favor, revise el formulario", "Advertencia", 1000);
                    });
                } else {
                    startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                    NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
                }
                /* NotificationManager se encarga de generar una notificación de éxito o error dependiendo de si la respuesta del servidor
                es exitosa o no. */
            })
            .catch(() => {
                startSpeaking("Se ha producido un error, inténtelo de nuevo en unos segundos");
                NotificationManager.error("Se ha producido un error, inténtelo de nuevo en unos segundos", "Error", 1000);
            });
        /* Añado un catch para gestionar errores de red (servidor caído, no hay conexión, etcétera). */
    };

    const handleInput = e => {
        const field = e.target.id;
        const value = e.target.value;

        if (field === "email") {
            e.target.setCustomValidity("");
            // Llegado a este punto, el usuario ha modificado el input al que corresponde el mail. Borramos el mensaje de error si 
            // lo hubiera, asumiendo que va a intentarlo con otro diferente.
        }

        setRegisterData(currentRegisterData => {
            const newRegisterData = { ...currentRegisterData };
            newRegisterData[field] = value;
            return newRegisterData;
        });
    }

    const handlePassword = e => {
        const password = document.getElementById("password");
        const passwordCheck = document.getElementById("passwordCheck");

        if (password.value === passwordCheck.value) {
            password.setCustomValidity("");
        } else {
            password.setCustomValidity("Las contraseñas no coinciden");
        }

        if (e.target.id === "password") {
            handleInput(e);
        }
    }

    return (
        <div id="register" className="form-wrapper account-form">
            <NotificationContainer />
            {/* Este componente lo añado para que salga una notificación de éxito o error al añadir un nuevo registro. */}

            <h2>Regístrate en Turistapedia</h2>

            <form onSubmit={register}>

                <div className="form-section">
                    <h5 aria-hidden="true">Los&nbsp;campos&nbsp;marcados&nbsp;con&nbsp;*&nbsp;son&nbsp;obligatorios</h5>
                    <div className="form-group">
                        <div className="control">
                            <label htmlFor="email">Email&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="email" id="email" placeholder="Introduce tu Email" maxLength="100" onInput={handleInput} required></input>
                        </div>

                        <div className="control">
                            <label htmlFor="password">Contraseña&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="password" id="password" placeholder="********" minLength="6" maxLength="50" onInput={handlePassword} required></input>
                        </div>

                        <div className="control">
                            <label htmlFor="passwordCheck">Confirma&nbsp;tu&nbsp;contraseña&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="password" id="passwordCheck" placeholder="********" minLength="6" maxLength="50" onInput={handlePassword} required></input>
                        </div>
                        <div className="control">
                            <label htmlFor="securityQuestion"><span aria-hidden="true">¿</span>Cuál&nbsp;era&nbsp;el&nbsp;nombre&nbsp;de&nbsp;tu&nbsp;primer&nbsp;colegio?&nbsp;<span aria-hidden="true">*</span><span className="sr-only">(es obligatorio)</span></label>
                            <input type="text" id="securityQuestion" placeholder="Introduce tu respuesta" maxLength="50" onInput={handleInput} required></input>
                        </div>
                    </div>
                </div>

                <button className="button" type="submit"><span className="sr-only">Haz click aquí para </span>Enviar<span className="sr-only"> el formulario de registro</span></button>

            </form>
        </div>
    )
}