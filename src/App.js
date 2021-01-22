import React, { Fragment, useState } from 'react';
import Login from './Componentes/Login';
import NuevaVenta1 from './Componentes/vendedor1/NuevaVenta1';
import "bootstrap/dist/css/bootstrap.min.css";
import ListaVenta from './Componentes/vendedor1/ListaVentas';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link

} from "react-router-dom";




function App() {
  //state para saber si usuario ya se encuentra logueado
  const [activo, logearUsuario] = useState(true);


  const loguear = e => {
    logearUsuario(false);
  }





  return (
    <Fragment>
      <Router>
        <div className="App">
          {activo ? (
            <Login
              loguear={loguear}
            ></Login>
          ) : (

              // definir rol del usuario => pendiente
              // enviar a home segun corresponda 
              <Router>
              <div>
                <nav className="container  navbar navbar-light bg-light">
                  <div className="container">
                  <form className="container-fluid justify-content-start">
                    <Link to="/NuevaVenta" className="btn btn-outline-success me-2" type="button">Nueva Venta </Link>
                    <Link to="/ListaVentas" className="btn btn-outline-success me-2" type="button">Lista Ventas </Link>
                    <Link to="/NuevoCliente" className="btn btn-outline-success me-2" type="button">Nuevo Cliente</Link>
                    <Link to="/ListaClientes" className="btn btn-outline-success me-2" type="button">Lista Clientes</Link>

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
                
              </Switch>
              </Router>



            )}
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
