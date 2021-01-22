
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {

//state para conocer cual es el boton selecionado
const [navegacion, conocerNavegacion] = useState();

const nuevaVenta = e => {
    e.preventDefault();
    conocerNavegacion(1);
    console.log(navegacion);
    <Router>
        <switch>
            <Route path="/nuevaVenta">
            <nuevaVenta></nuevaVenta>
            </Route>           
        </switch>
    </Router>   
}
const listaVenta = e => {
    e.preventDefault();
    conocerNavegacion(2);
    console.log(navegacion);
    <Router>
        <switch>
            <Route path="/listaVenta">
              <ListaVenta></ListaVenta>
            </Route>           
        </switch>
    </Router>   
}
//reiniciar navegacion




    return (
        <nav className="navbar navbar-light bg-light">
            <form className="container-fluid justify-content-start">
                <button className="btn btn-outline-success me-2" type="button">Nueva Venta</button>
                <button className="btn btn-outline-success me-2" type="button">Lista Ventas</button>
                <button className="btn btn-outline-success me-2" type="button">Nuevo Cliente</button>
                <button className="btn btn-outline-success me-2" type="button">Lista Clientes</button>
                
            </form>
        </nav>
    );
}
export default Navbar;