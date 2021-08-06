import React, { Component, Fragment } from 'react';
import logo from '../../img/logo.jpg';
import '../../estilos/login.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import '../vendedor1/HomeV1'


const url = "http://localhost/apiphp/usuario.php/?username=";
const cookies = new Cookies();
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                username: '',
                password: '',
                tipo: false
            }
        }
    }

 


    componentDidMount() {
        if (cookies.get('rol') === 'administrador') {
            window.location.href="./HomeAdmin";
            
        }else if (cookies.get('rol') === 'vendedor'){
            window.location.href="./HomeVendedor";
        }

    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });

    }

    iniciarSesion = async () => {

        await axios.get(url + this.state.form.username)
            .then(response => {

                if (this.state.form.password === response.data.password) {
                    return response.data;
                }
                else {
                    alert("Datos de ingreso incorrectos");
                }





            })
            .then(response => {

                cookies.set('id', response.id, { path: "/" });
                cookies.set('username', response.username, { path: "/" });
                cookies.set('user', response.user, { path: "/" });
                cookies.set('rol', response.rol, { path: "/" });
                alert(`Bienvenido ${response.user}`);
                if (response.rol == 'administrador') {

                    this.setState({ tipo: false });
                    window.location.href="./HomeAdmin";
                }
                else if (response.rol === 'vendedor') {
                    this.setState({ tipo: true });
                    window.location.href="./HomeVendedor";
                }



            })

            .catch(error => {
                console.log(error);
            })
    }



    render() {
        return (
            <Fragment>
                <div className="wrapper fadeInDown container">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <img src={logo} id="icon" alt="User Icon" />
                        </div>


                        <form
                        //   onSubmit={submitLogin}
                        >
                            <input
                                type="text"
                                className="fadeIn second"
                                name="username"
                                placeholder="Ingresa Nombre"
                                onChange={this.handleChange}
                            //   value={nombre}
                            />
                            <input
                                type="password"
                                className="fadeIn third"
                                name="password"
                                placeholder="Ingresa Contraseña"
                                onChange={this.handleChange}
                            //  value={contrasenha}
                            />
                            <input type="button" onClick={() => this.iniciarSesion()} className="fadeIn fourth btn btn-primary btn-lg" value="Ingresar" />
                        </form>




                    </div>
                </div>
            </Fragment>

        )
    }
}
export default Login;