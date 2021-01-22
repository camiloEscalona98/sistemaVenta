import React, { Fragment, useState } from 'react';
import logo from '../img/logo.jpg';
import '../estilos/login.css';

const Login = ({loguear}) => {


    //crear State de login
    const [login, ingresarLogin] = useState({
        nombre: '',
        contrasenha: '',
        logueado: false
    });

    //crear state del error
    const [error, actualizarError] = useState(false);

    //funcion que se ejecuta al escribir en el input
    const actualizarState = e => {
        ingresarLogin({
            //guarda estado actual del login
            ...login,
            //lee el contenido y lo guarda
            [e.target.name]: e.target.value

        })
    }

    //envio de valores
    const { nombre, contrasenha } = login;


    //funcion para enviar formulario de logueo
    const submitLogin = e => {
        e.preventDefault();

        //Validar inputs vacios 
        if (nombre.trim() === '' || contrasenha.trim() === '') {
            //Error
            actualizarError(true);
            return;
        }
        //limpiar error
        actualizarError(false);
        //loguear  / hacer la ruta a la otra pagina
        loguear (
            ingresarLogin({
                nombre: nombre,
                contrasenha: contrasenha,
                logueado: true
            }),
            console.log("bien")
        )

    }



    return (
        <Fragment>
            <div className="wrapper fadeInDown container">
                <div id="formContent">

                    <div className="fadeIn first">
                        <img src={logo} id="icon" alt="User Icon" />
                    </div>

                    {error ?  <p className=" alerta-error">Todos los campos son obligatorios</p>    : null}
                    <form
                        onSubmit={submitLogin}
                    >
                        <input
                            type="text"
                            className="fadeIn second"
                            name="nombre"
                            placeholder="Ingresa Nombre"
                            onChange={actualizarState}
                            value={nombre} />
                        <input
                            type="password"
                            className="fadeIn third"
                            name="contrasenha"
                            placeholder="Ingresa Contraseña"
                            onChange={actualizarState}
                            value={contrasenha} />
                        <input type="submit" className="fadeIn fourth" value="Ingresar" />
                    </form>




                </div>
            </div>
        </Fragment>

    );
}
export default Login;