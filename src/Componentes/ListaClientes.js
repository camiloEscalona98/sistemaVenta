import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
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




function ListaClientes() {







    const [data, setData] = useState([]);
    const peticionGet = async () => {
        determinar();
        await axios.get('http://localhost/apiphp/cliente.php')
            .then(response => {
                setData(response.data);
            })
    }
    useEffect(() => {
        peticionGet();

    }, [])

    //estado para conocer el tipo de usuario, parte en false = administrador
    const [tipoUsuario, conocerTipoUsuario] = useState(true);
    const determinar = () => {
        if (cookies.get('rol') === 'vendedor') {
            conocerTipoUsuario(true);
            console.log(cookies.get('rol'));
        } else if (cookies.get('rol') === 'administrador') {
            conocerTipoUsuario(false);
            console.log(cookies.get('rol'));
        }

    }
    const [clienteSeleccionado, setClienteSeleccionado] = useState({
        id: '',
        nombre: '',
        rut: '',
    })
    const seleccionarCliente = (cliente, caso) => {
        setClienteSeleccionado(cliente);
        abrirCerrarModalEliminar();
    }

    const [modalEliminar, setModalEliminar] = useState(false);
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);

    }


    const url = 'http://localhost/apiphp/cliente.php/';
    const peticionDelete = async () => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(url, f, { params: { id: clienteSeleccionado.id } })
            .then(response => {

                setData(data.filter(cliente => cliente.id !== clienteSeleccionado.id));
                abrirCerrarModalEliminar();

            })
    }




    return (
        <div>

            {tipoUsuario ? (<div>
                <MaterialTable
                    title="Tabla Clientes"
                    columns={columnas}
                    data={data}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                ></MaterialTable>




            </div>)

                : (

                    <div>
                        <MaterialTable
                            title="Tabla Clientes"
                            columns={columnas}
                            data={data}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            actions={[
                                {
                                    icon: 'delete',
                                    tooltip: 'Eliminar Cliente',
                                    onClick: (event, rowData) => seleccionarCliente(rowData, "Eliminar")
                                }
                            ]}
                            options={{
                                actionsColumnIndex: -1

                            }}
                        ></MaterialTable>


                    </div>)}
            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar el Cliente ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger"
                        onClick={() => peticionDelete()}
                    >
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => abrirCerrarModalEliminar()}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>

        </div>
    )


}
export default ListaClientes;