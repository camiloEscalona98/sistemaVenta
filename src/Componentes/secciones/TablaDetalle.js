import axios from 'axios';
import React, { } from 'react';
import { Fragment } from 'react';
import { Component } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const url = 'http://localhost/apiphp/producto_venta.php/?num_venta=';
const urlDelete = 'http://localhost/apiphp/cliente.php?id=';
class TablaDetalle extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: '',
            sumatoria: '',
            numVenta: '',
            estado: '',
            tipoPeticion: false,


        }
    }


    // componentWillUpdate() {
    //     this.peticionGet();
    // }

    componentWillMount() {
        this.conocerNumVenta();
        this.conocerTipoPeticion();
    }

    componentDidMount() {

        console.log(this.state.numVenta);

    }
    componentDidCatch(error, info) {
        console.log("error");
    }
    shouldComponentUpdate = async (nextProps, nextState) => {
        if (this.props.estadoTabla !== nextProps.estadoTabla) {

            await this.peticionGet();
            return true;
        }
    }
    // conocer tipo de peticion con ayuda de los props para saber si se debe mostrar el boton de eliminar
    conocerTipoPeticion = async () => {
        const tipoPeticion = this.props.tipoPeticion;
        await this.setState({ tipoPeticion: tipoPeticion });
        console.log(this.state.tipoPeticion);
    }
    // conocer el num_venta con ayuda de los props enviados del componente padre
    conocerNumVenta = async () => {

        await console.log("este es el nummventa" + this.props.numVenta);
        const numVenta = this.props.numVenta;
        await this.setState({ numVenta: numVenta });
        this.peticionGet();
    }

    condicion = async () => {
        await this.setState({ estado: this.props.estadoTabla });
        this.peticionGet();

    }
    //peticion get a la api, necesario el num_venta
    peticionGet = async () => {
        const numVenta = this.state.numVenta;
        await axios.get(url + "'" + numVenta + "'")
            .then(response => {
                this.setState({ data: response.data });
                console.log(response.data);


            })



    }
    seleccionarDetalle = (detalle) => {

        this.peticionDelete(detalle);
    }
    peticionDelete = (detalle) => {
        const id = detalle.id;
        var f = new FormData();
        f.append("METHOD", "DELETE");
        axios.delete(urlDelete + id)
            .then(response => {
                console.log("bien");
            })
    }


    render() {
        let total = 0;
        let sumatoriaCajas = 0;
        return (
            <Fragment>
                {this.state.tipoPeticion ? (<div>
                    <table className="table container table-striped table-condensed table-responsive">
                        <thead>
                            <tr >
                                <th className="th" scope="col">#</th>

                                <th className="th" scope="col">Producto</th>
                                <th className="th" scope="col">Cantidad</th>
                                <th className="th" scope="col">Valor</th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.data.map((elemento, index) => {
                                total += elemento.valor * elemento.cantidad;
                                sumatoriaCajas = parseFloat(sumatoriaCajas) + parseFloat(elemento.cantidad);

                                return (
                                    <Fragment key={index}>
                                        <tr >
                                            <td  >{index + 1}</td>
                                            <td >{elemento.producto}</td>
                                            <td  >{elemento.cantidad}</td>
                                            <td >${elemento.valor}</td>

                                        </tr>
                                    </Fragment>

                                )

                            })}

                            <tr className="table-success">
                                <td>Total:</td>
                                <td></td>
                                <td>{sumatoriaCajas}</td>
                                <td>${total}</td>
                                
                                
                            </tr>

                        </tbody>
                    </table>


                </div>) :



                    (<div>
                        <div>
                            <table className="table container table-striped table-condensed table-responsive">
                                <thead>
                                    <tr >
                                        <th className="th" scope="col">#</th>

                                        <th className="th" scope="col">Producto</th>
                                        <th className="th" scope="col">Cantidad</th>
                                        <th className="th" scope="col">Valor</th>
                                        <th className="th" scope="col">Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map((elemento, index) => {
                                        total += elemento.valor * elemento.cantidad;
                                        sumatoriaCajas = parseFloat(sumatoriaCajas) + parseFloat(elemento.cantidad);

                                        return (
                                            <Fragment key={index}>
                                                <tr >
                                                    <td  >{index + 1}</td>
                                                    <td >{elemento.producto}</td>
                                                    <td  >{elemento.cantidad}</td>
                                                    <td >${elemento.valor}</td>
                                                    <td onClick={() => this.seleccionarDetalle(elemento)} className="btn btn-danger">eliminar</td>
                                                </tr>
                                            </Fragment>

                                        )

                                    })}

                                    <tr className="table-success">
                                        <td>Total:</td>
                                        <td></td>
                                        <td>{sumatoriaCajas}</td>
                                        <td>${total}</td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </table>


                        </div>
                    </div>)}

            </Fragment>

        );

    }
}
export default TablaDetalle;