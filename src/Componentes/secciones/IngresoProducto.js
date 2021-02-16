import React, { Component } from 'react';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import shortid from 'shortid';
import { setDefaultHandler } from 'workbox-routing';
const url = 'http://localhost/apiphp/producto_venta.php';
class IngresoProducto extends Component {


    constructor(props) {
        super(props);
        this.state = {
            producto: [],
            opcion: 1,
            numero: 1,
            valores: {
                id: '',
                cantidad: '',
                valor: '',
            },
            id_producto: '',
            num_venta: '',
            datos: [],
            estadoTabla: 0,






        }
    }




    //inicia los metodos
    componentWillMount() {


        this.consultas();

        this.numVenta();
    }
    //actualiza los metodos, hay bucle infinito error

    consultas = async () => {
        if (this.state.opcion === 1) {
            await axios
                .get("http://localhost/apiphp/producto.php/?tipo=1")
                .then((response) => {

                    this.setState({ producto: response.data });


                })

        } else if (this.state.opcion === 2) {
            await axios
                .get("http://localhost/apiphp/producto.php/?tipo=2")
                .then((response) => {

                    this.setState({ producto: response.data });
                    console.log(this.state.producto);

                })

        }



    }
    // determinar el tipo de producto segun radio
    determinarTipo = async (tipo) => {
        if (tipo == 1) {
            await this.setState({ opcion: 1 });
            this.consultas();


        }
        else if (tipo == 2) {
            await this.setState({ opcion: 2 })
            this.consultas();

        }
        return tipo;
    }


    //toma valores de los inputs
    handleChange = e => {
        let valores = this.state.valores;
        valores[e.target.name] = e.target.value;
        this.setState({ valores: valores })

    }

    producto = async (idProducto) => {

        const id = idProducto;
        await this.setState({ id_producto: id });


    }
    numVenta = async () => {
        //determinar numero de venta

        //const num = this.props.numVenta;
        await console.log(this.props.numVenta);

        this.setState({ num_venta: this.props.numVenta });
        await console.log(this.state.num_venta);

        // await this.setState({ num_venta: num });


    }

    peticionPost = async (e) => {
        e.preventDefault();

        var id_producto = this.state.id_producto;
        var cantidad = this.state.valores.cantidad;
        var valor = this.state.valores.valor;
        var numVenta = this.state.num_venta;

        var filaDetalle = {
            id_producto: id_producto,
            cantidad: cantidad,
            valor: valor,
            numVenta: numVenta
        }
        console.log(filaDetalle);
        //metodo para enviar num_venta a la tabla

        var f = new FormData();
        f.append("id_producto", id_producto);
        f.append("cantidad", cantidad);
        f.append("valor", valor);
        f.append("num_venta", numVenta);
        f.append("METHOD", "POST");
        axios.post(url, f)
            .then(response => {

            })
        await this.setState({ estadoTabla: this.state.estadoTabla + 1 });
        const estado = this.state.estadoTabla;

        this.props.iniciarTabla(estado);
        this.limpiarFormulario(e);


    }
    limpiarFormulario = async (e) => {
        await this.setState({
            valores: {
                cantidad: '',
                valor: '',
            }
        });
        document.getElementById("formulario").reset();

    }
    crearobjeto = () => {

    }





    render() {
        const { conocerNumVenta } = this.props
        return (
            <form id="formulario">
                <div className="contenedor1  " >

                    <div className=" align-items-center justify-content-center"     >

                        <label >Ingresa Producto</label>
                        <div className="row">
                            <select className="form-control" onChange={(e) => {
                                const idProducto = e.target.value;
                                this.producto(idProducto);
                            }}  >
                                {this.state.producto.map(elemento => (
                                    <option name="id_producto"

                                        key={elemento.id_producto} value={elemento.id_producto}>{elemento.id_producto}--{elemento.producto}</option>
                                ))}
                            </select>

                            <div className="col-12 col-md-6 col-xl-4">
                                <div>
                                    <span>Huevo</span>
                                    <Radio
                                        value="1"
                                        color="primary"
                                        onChange={(e) => {
                                            const tipo = e.target.value;
                                            this.determinarTipo(tipo)
                                        }}
                                        checked={this.state.opcion === 1}
                                    ></Radio>

                                </div>
                                <div>
                                    <span>Helado</span>
                                    <Radio
                                        value="2"
                                        color="primary"
                                        checked={this.state.opcion === 2}
                                        onChange={(e) => {
                                            const tipo = e.target.value;
                                            this.determinarTipo(tipo)
                                        }}
                                    ></Radio>

                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className="row container">
                            <div className="col">
                                <div className="form-group">
                                    <label  >Ingresa Cantidad</label>
                                    <input onChange={(e) => this.handleChange(e)} name="cantidad" type="number" className="form-control " id="cantidad" placeholder="Cantidad" />

                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group " >
                                    <label  >Ingresa Valor</label>
                                    <input onChange={(e) => this.handleChange(e)} name="valor" type="number" className="form-control tamañoInput    " id="valor" placeholder="Valor" />

                                </div>
                            </div>
                        </div>
                        <button onClick={e => { this.peticionPost(e) }} type="button" className="btn btn-primary btn-lg btn-block">Ingresar</button>
                    </div>
                </div>
            </form>

        );
    }


}
export default IngresoProducto;