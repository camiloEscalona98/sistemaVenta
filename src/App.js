import React, { Fragment, useState } from 'react';
import Login from './Componentes/Login';
import NuevaVenta1 from './Componentes/vendedor1/NuevaVenta1';
import "bootstrap/dist/css/bootstrap.min.css";
import ListaVenta from './Componentes/vendedor1/ListaVentas';
import NuevoCliente from './Componentes/NuevoCliente';
import ListaClientes from './Componentes/ListaClientes';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link

} from "react-router-dom";




function App() {
  //state para saber si usuario ya se encuentra logueado
  const [activo, logearUsuario] = useState(true);
 
  //funcion loguear
  const loguear = e => {
    logearUsuario(false);
  }
  //funcion en caso de que no este loqueado
  const desconectado = e => {
    //
  }
 
  const [nombre, conocerNombre] = useState([
    
  ]) 


  //  <Link to="/NuevaVenta" className="btn btn-outline-success me-2" type="button"> <i></i> </Link>
  //  <Link to="/ListaVentas" className="btn btn-outline-success me-2" type="button">Lista Ventas </Link>
  //         <Link to="/NuevoCliente" className="btn btn-outline-success me-2" type="button">Nuevo Cliente</Link>
  //       <Link to="/ListaClientes" className="btn btn-outline-success me-2" type="button">Lista Clientes</Link>


  //if(activo = true || activo.nombre = 'helado'){
              
  //}




  return (
    <Fragment>
      <Router>
        <div className="App">
          {activo ? (


          
            <Login
              loguear={loguear}
              nombre={conocerNombre}
            ></Login>
          ) : (

              // definir rol del usuario => pendiente
              // enviar a home segun corresponda 
            
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



            )}

           


        </div>
      </Router>
    </Fragment>
  );
}

export default App;
