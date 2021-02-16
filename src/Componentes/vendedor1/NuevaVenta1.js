
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../estilos/nuevaVenta.css';
import IngresoProducto from '../secciones/IngresoProducto';
import TablaDetalle from '../secciones/TablaDetalle';
import axios from 'axios';
import shortid from 'shortid';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const urlPost = 'http://localhost/apiphp/venta.php';
class nuevaVenta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cliente: [],
            id_cliente: '',
            datosCliente: [
                {
                    id: '',
                    nombre: '',
                    comuna: '',
                    direccion: '',
                }
            ],
            num_venta: '',
            numero: 1,
            vendedor: '',
            hora: '',
            fecha: '',
            estadoTabla: 0,
            estadoNumVenta: false,
            mostrarCliente: false,


        }
    }





    componentDidMount() {

        this.numVenta();
        axios
            .get("http://localhost/apiphp/cliente.php/")
            .then((response) => {
                this.setState({ cliente: response.data });
            })

        this.conocerVendedor();
        this.conocerFecha();




    }
    conocerVendedor = async () => {

        const vendedor = cookies.get('user');
        await this.setState({ vendedor: vendedor });

    }
    conocerFecha = async () => {
        const fechaActual = new Date();
        const fecha = new Date().toISOString().slice(0, 10);

        const hora = fechaActual.toLocaleTimeString();


        await this.setState({ hora: hora });
        await this.setState({ fecha: fecha });


    }


    peticionGet = async (selectCliente) => {

        const idCliente = selectCliente;
        await this.setState({ id_cliente: idCliente });
        const url = (`http://localhost/apiphp/cliente.php/?id=${idCliente}`);
       await axios.get(url)
            .then(response => {
                this.setState({ datosCliente: response.data });
                console.log(this.state.datosCliente);
                this.setState({mostrarCliente: true});
                
            })
    }



    registrarVenta = async (e) => {

        var id_cliente = this.state.id_cliente;
        var vendedor = this.state.vendedor;
        var num_venta = this.state.num_venta;
        var hora = this.state.hora;
        var fecha = this.state.fecha;
        console.log(fecha);
        var f = new FormData();
        f.append("id_cliente", id_cliente);
        f.append("vendedor", vendedor);
        f.append("num_venta", num_venta);
        f.append("hora", hora);
        f.append("fecha", fecha);

        f.append("METHOD", "POST");
        axios.post(urlPost, f)
            .then(respose => {
                console.log("enviado");
            });
        alert("Venta Registrada");
        this.numVenta();
        this.reiniciar();

    }
    reiniciar = async () => {
      const rol =  cookies.get('rol') ;
       if(rol == 'administrador'){
           window.location.href="/HomeAdmin"
       }else if(rol == 'vendedor'){
        window.location.href="/HomeVendedor"
    }
    }
    cambiarEstadoNumVenta = async () => {
        await this.setState({ estadoNumVenta: true });
    }
    numVenta = async () => {
        //determinar numero de venta

        const num = shortid.generate();
        await this.setState({ num_venta: num });
        console.log(this.state.num_venta);


    }
    iniciarTabla = async (estadoTabla) => {
        this.setState({ estadoTabla: estadoTabla });


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
                                <option key={elemento.id} value={elemento.id}>{elemento.id} -- {elemento.nombre}</option>
                            ))}
                        </select>


                    </div>
                    <hr></hr>
                    <div>
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Comuna</th>
                                        <th scope="col">Direccion</th>
                                    </tr>
                                </thead>
                                {this.state.mostrarCliente ? (

                                    <tbody>
                                   


                                            <tr className="table-primary" key={this.state.datosCliente.id}>
                                                <td>{this.state.datosCliente.id}</td>
                                                <td>{this.state.datosCliente.nombre}</td>
                                                <td>{this.state.datosCliente.comuna}</td>
                                                <td>{this.state.datosCliente.direccion}</td>
                                            </tr>


                                     
                                    </tbody>

                                ) : null}

                            </table>
                        </div>
                    </div>

                    <div className="row ">

                        <div className="col">
                            <IngresoProducto
                                numVenta={this.state.num_venta}
                                iniciarTabla={this.iniciarTabla}
                            ></IngresoProducto>

                        </div>
                        <div className="contenedor2 col-12 col-md-6 col-xl-8">
                            <div className="tablaProductos">
                                <hr></hr>
                                <div>
                                    <TablaDetalle
                                        numVenta={this.state.num_venta}
                                        estadoTabla={this.state.estadoTabla}
                                        estadoNumVenta={this.state.estadoNumVenta}
                                    ></TablaDetalle></div>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <button onClick={e => { this.registrarVenta(e) }} type="button" className="btn btn-primary btn-lg btn-block">Ingresar Venta</button>
                </div>
            </div>
        );
    }
}

export default nuevaVenta;