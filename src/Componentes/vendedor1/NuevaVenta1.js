
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../estilos/nuevaVenta.css';
import IngresoProducto from '../secciones/IngresoProducto';
import TablaDetalle from '../secciones/TablaDetalle';
import axios from 'axios';


class nuevaVenta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cliente: [],
            idCliente: '',
            consulta: false,
            datosCliente: []
        }
    }





    componentDidMount() {

        axios
            .get("https://pruebassistemabd.000webhostapp.com/cliente.php/")
            .then((response) => {
                console.log(response);
                this.setState({ cliente: response.data });
                
            })
    }




    peticionGet = (selectCliente) => {
        const idCliente = selectCliente;
        console.log(idCliente);
        const url = (`https://pruebassistemabd.000webhostapp.com/cliente.php/?id=${idCliente}`);
        axios.get(url)
            .then(response => {
                this.setState({ datosCliente: response.data });
              
            })
    }








    render() {
        return (
            <div className="fondo">
                <div className="container">
                    <div className="form-group contenedor">
                        <h3>Datos del Cliente</h3>
                        <select name="acliente" className="form-control" onChange={(e) => {
                            const selectCliente = e.target.value;
                           
                            
                          
                            this.peticionGet(selectCliente);



                        }}  >
                            {this.state.cliente.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.id}--{elemento.nombre}</option>
                            ))}

                        </select>





                        <table className="separacion table-responsive  table-borderles">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Comuna</th>
                                    <th scope="col">Direccion</th>
                                </tr>
                            </thead>
                            <tbody>
                            {console.log(this.state.datosCliente)}
                          
                           


                            </tbody>
                        </table>


                    </div>
                    <hr></hr>

                    <div className="row ">

                        <IngresoProducto></IngresoProducto>
                        <div className="contenedor2 col-12 col-md-6 col-xl-8">
                            <div className="tablaProductos">
                                <hr></hr>
                                <TablaDetalle></TablaDetalle>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <button type="button" className="btn btn-primary btn-lg btn-block">Ingresar Venta</button>
                </div>
            </div>
        );
    }
}

export default nuevaVenta;