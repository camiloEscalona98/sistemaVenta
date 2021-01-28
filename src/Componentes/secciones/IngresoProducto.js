import React, { Component } from 'react';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
class IngresoProducto extends Component {


    constructor(props) {
        super(props);
        this.state = {
            producto: [],
            opcion: 1


        }
    }

   //inicia los metodos
    componentWillMount() {
        this.consultas();
    }
    //actualiza los metodos, hay bucle infinito
    componentWillUpdate(){
        this.consultas();
    }
    consultas = () => {
        if (this.state.opcion === 1) {
            axios
                .get("https://pruebassistemabd.000webhostapp.com/producto.php/?tipo=1")
                .then((response) => {

                    this.setState({ producto: response.data });

                })

        } else if (this.state.opcion === 2) {
            axios
                .get("https://pruebassistemabd.000webhostapp.com/producto.php/?tipo=2")
                .then((response) => {

                    this.setState({ producto: response.data });

                })

        }

    }

    determinarTipo = (tipo) => {
        if (tipo == 1) {
            this.setState({ opcion: 1 })
        }
        else if (tipo == 2) {
            this.setState({ opcion: 2 })
        }
        return tipo;
    }


    render() {
        return (

            <div className="contenedor1  col-12 col-md-6 col-xl-4 " >
                <div className=" align-items-center justify-content-center"     >

                    <label >Ingresa Producto</label>
                    <div className="row">
                        <select name="acliente" className="form-control" onChange={(e) => {
                            const selectProducto = e.target.value;
                        }}  >
                            {this.state.producto.map(elemento => (
                                <option key={elemento.id} value={elemento.id}>{elemento.id}--{elemento.producto}</option>
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
                        <div>
                            <div className="form-group">
                                <label >Ingresa Cantidad</label>
                                <input type="number" className="form-control tamañoInput" id="cantidad" placeholder="Cantidad" />

                            </div>
                        </div>
                        <div>
                            <div className="form-group " >
                                <label >Ingresa Valor</label>
                                <input type="number" className="form-control tamañoInput" id="valor" aria-describedby="emailHelp" placeholder="Valor" />

                            </div>
                        </div>
                    </div>
                    <button type="button" className="btn btn-primary btn-lg btn-block">Ingresar</button>
                </div>
            </div>


        );
    }


}
export default IngresoProducto;