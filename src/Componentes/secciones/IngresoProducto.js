import React from 'react';

const IngresoProducto = () => {
  
      return (

        <div className="contenedor1  col-12 col-md-6 col-xl-4 ">
        <div className=" align-items-center justify-content-center"     >       
        <label for="exampleInputEmail1">Ingresa Producto</label>
        <div id="exampleInputEmail1" className="dropdown">
            <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
       </button>
            <ul className="dropdown-menu form-control" aria-labelledby="dropdownMenuButton">
                <li></li>

            </ul>
        </div>
        <div className="row container">
            <div>
                <div className="form-group">
                    <label for="cantidad">Ingresa Cantidad</label>
                    <input type="number" className="form-control tamañoInput" id="cantidad" placeholder="Cantidad" />

                </div>
            </div>
            <div>
                <div className="form-group " >
                    <label for="valor">Ingresa Valor</label>
                    <input type="number" className="form-control tamañoInput" id="valor" aria-describedby="emailHelp" placeholder="Valor" />

                </div>
            </div>
        </div>
        <button type="button" class="btn btn-primary btn-lg btn-block">Ingresar</button>
        </div>
    </div>


      )

    
}
export default IngresoProducto;