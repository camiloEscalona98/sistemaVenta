
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../estilos/nuevaVenta.css';
import IngresoProducto from '../secciones/IngresoProducto';
import TablaDetalle from '../secciones/TablaDetalle';
const nuevaVenta = () => {
    return (
        <div className="fondo">
            <div className="container">
                <div className="form-group contenedor">
                    <h3>Datos del Cliente</h3>
                    
                    <div id="exampleInputEmail1" className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Cliente
                       </button>
                        <ul className="dropdown-menu form-control" aria-labelledby="dropdownMenuButton">
                            <li></li>

                        </ul>
                    </div>
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
                            <tr>
                                <th scope="row">1</th>
                                <td>Juan Garcia</td>
                                <td>Los Alamos</td>
                                <td>Trespinos 334</td>
                            </tr>

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
                <button  type="button" className="btn btn-primary btn-lg btn-block">Ingresar Venta</button>
            </div>
        </div>
    );
}
export default nuevaVenta;