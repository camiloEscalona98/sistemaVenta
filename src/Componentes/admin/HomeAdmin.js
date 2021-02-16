import React, { Component, Fragment } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link

} from "react-router-dom";
import NuevoCliente from '../NuevoCliente';
import ListaClientes from '../ListaClientes';
import NuevaVenta1 from '../vendedor1/NuevaVenta1';
import ListaVenta from '../vendedor1/ListaVentas';
import Footer from '../Footer';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
class HomeAdmin extends Component {
    componentDidMount() {
        if (!cookies.get('username')) {
            window.location.href = "./";

        }

    }

    render() {
        console.log(cookies.get('id'));
        console.log(cookies.get('username'));
        console.log(cookies.get('user'));
        console.log(cookies.get('rol'));
        return (
            <Fragment>
                <Router>
                    <div>
                        <nav className=" navbar nav ">
                            <div className="container">
                                <form className="container-fluid justify-content-start">


                                    <div className="row">


                                        <Link to="/NuevaVenta" className="btn btn-outline-info col-md-3" type="button"> Nueva Venta</Link>
                                        <Link to="/ListaVentas" className="btn btn-outline-success col-md-3" type="button">Lista Ventas </Link>
                                        <Link to="/NuevoCliente" className="btn btn-outline-info col-md-3" type="button">Nuevo Cliente</Link>
                                        <Link to="/ListaClientes" className="btn btn-outline-success col-md-3" type="button">Lista Clientes</Link>

                                    </div>


                                </form>
                            </div>
                        </nav>
                    </div>
                    <Switch>
                        <Route path="/NuevaVenta">
                            <NuevaVenta1></NuevaVenta1>
                        </Route>
                        <Route path="/ListaVentas">
                            <ListaVenta></ListaVenta>
                        </Route>

                        <Route path="/NuevoCliente">
                            <NuevoCliente></NuevoCliente>
                        </Route>
                        <Route path="/ListaClientes">
                            <ListaClientes></ListaClientes>
                        </Route>

                    </Switch>
                </Router>
                <Footer></Footer>
            </Fragment>
        )
    }

}
export default HomeAdmin;