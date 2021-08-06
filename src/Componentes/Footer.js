import React, { Component } from 'react';

import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class Footer extends Component {


    state = {
        nombre: '',
    }

    cerrarSesion = () => {
        cookies.remove('id', {path: "/"});
        cookies.remove('username', {path: "/"});
        cookies.remove('user', {path: "/"});
        cookies.remove('rol', {path: "/"});
        window.location.href='/sistemaVenta';
    }
    componentDidMount () {
        const nombre = cookies.get('user');
        this.setState({nombre: nombre});
    }

   render(){
    return(
        <div className="footer container">
        <div className="row">
        <div className="col" >
            <h5  className="float-left">{this.state.nombre}</h5>
            <button className="btn btn-danger float-right" onClick={()=>this.cerrarSesion()}> Cerrar Session</button>
        </div>
       

        </div>

        </div>
        
        )
   }

}
export default Footer;