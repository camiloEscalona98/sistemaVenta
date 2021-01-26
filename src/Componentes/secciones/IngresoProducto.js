import React from 'react';

const IngresoProducto = () => {

    return (

        <div className="contenedor1  col-12 col-md-6 col-xl-4 ">
            <div className=" align-items-center justify-content-center"     >

                <label >Ingresa Producto</label>
                <div className="row">
                    <div id="exampleInputEmail1" className="dropdown col-12 col-md-6 col-xl-4">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Productos
       </button>
                        <ul className="dropdown-menu form-control" aria-labelledby="dropdownMenuButton">
                            <li></li>

                        </ul>
                    </div>
                    <div className="col-12 col-md-6 col-xl-4">
                        <div className="form-check ">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                            <label className="form-check-label" >
                                Huevo</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                            <label className="form-check-label" >
                                Helado</label>
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


    )


}
export default IngresoProducto;