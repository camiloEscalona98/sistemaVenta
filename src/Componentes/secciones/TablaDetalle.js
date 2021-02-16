import axios from 'axios';
import React, { } from 'react';
import { Fragment } from 'react';
import { Component } from 'react';
import { Form } from 'reactstrap';

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


        }
    }


    // componentWillUpdate() {
    //     this.peticionGet();
    // }

    componentWillMount() {
        this.conocerNumVenta();
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

    conocerNumVenta = async () => {

        await console.log("este es el nummventa"+this.props.numVenta);
        const numVenta = this.props.numVenta;
        await this.setState({ numVenta: numVenta });
        this.peticionGet();
    }

    condicion = async () => {
        await this.setState({ estado: this.props.estadoTabla });
        this.peticionGet();

    }

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
                <div>
                    <table className="table container table-striped table-condensed table-responsive">
                        <thead>
                            <tr >
                                <th className="th" scope="col">#</th>

                                <th className="th" scope="col">Producto</th>
                                <th className="th" scope="col">Valor</th>
                                <th className="th" scope="col">Cantidad</th>
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
                                            <td >${elemento.valor}</td>
                                            <td  >{elemento.cantidad}</td>
                                            <td onClick={() => this.seleccionarDetalle(elemento)} className="btn btn-danger">eliminar</td>
                                        </tr>
                                    </Fragment>

                                )

                            })}

                            <tr className="table-success">
                                <td>Total:</td>
                                <td></td>
                                <td>${total}</td>
                                <td>{sumatoriaCajas}</td>
                                <td> </td>
                                <td></td>
                            </tr>

                        </tbody>
                    </table>


                </div>

            </Fragment>

        );

    }
}
export default TablaDetalle;