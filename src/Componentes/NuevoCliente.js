import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "../estilos/nuevoCliente.css";
import axios from 'axios';
function NuevoCliente() {
    const baseUrl = "https://pruebassistemabd.000webhostapp.com/cliente.php/";

    const [valores, llenadoValores] = useState({
        id: '',
        nombre: '',
        rut: '',
        comuna: '',
        direccion: '',
        contacto: ''

    });

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        llenadoValores((prevsState) => ({
            ...prevsState,
            [name]: value

        }))
        console.log(valores);
    }
    const [data, setData] = useState([]);
    async function peticionPost(e) {
        {
            e.preventDefault();
            var f = new FormData();
            f.append("nombre", valores.nombre);
            f.append("rut", valores.rut);
            f.append("comuna", valores.comuna);
            f.append("direccion", valores.direccion);
            f.append("contacto", valores.contacto);
            f.append("METHOD", "POST");
            axios.post(baseUrl, f)
                .then(response => {
                    setData(data.concat(response.data));
    
                })
        }

    } 


    return (
        <form >
            <div className="contenedor">
                <div className="form container">
                    <div className="form-group col-md-12">
                        <label >Nombre Completo</label>
                        <input  className="form-control" name="nombre" placeholder="Nombre y Apellido" onChange={handleChange} />
                    </div>

                    <div className="form-group col-md-3">
                        <label >Rut</label>
                        <input  className="form-control" name="rut" placeholder="Rut" onChange={handleChange} />
                    </div>
                    <div className="form-group container">
                        <label >Comuna</label>
                        <select className="form-control" name="comuna" onChange={handleChange}>
                            <option>Los Alamos</option>
                            <option>Cañete</option>
                            <option>Lebu</option>
                            <option>Tirua</option>
                            <option>Curanilahue</option>
                        </select>
                    </div>



                    <div className="form-group col-md-12">
                        <label >Direccion</label>
                        <input  className="form-control" name="direccion" placeholder="Direccion" onChange={handleChange} />
                    </div>
                    <div className="form-group col-md-3">
                        <label >Contacto</label>
                        <input type="number" className="form-control" name="contacto" placeholder="Numero de contacto" onChange={handleChange} />
                    </div>
                    <button onClick={(e) => peticionPost(e)} type="submit" className="btn btn-primary mb-2 container">Registrar Cliente</button>
                </div>

            </div>


        </form>

    )
}
export default NuevoCliente