import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

const columnas = [
    {
        title: 'ID',
        field: 'id',
        type: "numeric"
    },
    {
        title: 'Nombre Completo',
        field: 'nombre'
    },
    {
        title: 'Rut',
        field: 'rut',
        type: "numeric"
    },
    {
        title: 'Comuna',
        field: 'comuna'
    },
    {
        title: 'Direccion',
        field: 'direccion'
    },
    {
        title: 'Contacto',
        field: 'contacto',
        type: "numeric"
    }
];

const baseUrl = "https://pruebassistemabd.000webhostapp.com/cliente.php/";

function ListaClientes() {

    const [data, setData] = useState([]);
    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
            })
    }
    useEffect(() => {
        peticionGet();
    }, [])




    return (
        <div>
            <MaterialTable
                title="Tabla Clientes"
                columns={columnas}
                data={data}
                fixedHeader
                fixedHeaderScrollHeight="600px"

            ></MaterialTable>
        </div>
    )


}
export default ListaClientes;