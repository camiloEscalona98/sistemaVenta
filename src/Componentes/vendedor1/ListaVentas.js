import React, { useEffect, useState } from 'react';
//import MaterialTable from 'material-table';
import MaterialTable from 'material-table';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { red } from '@material-ui/core/colors';
import TablaDetalle from '../secciones/TablaDetalle';

const cookies = new Cookies();
//columnas para la tabla

const columnas1 = [
    {
        title: 'ID',
        field: 'id',
        type: "numeric"
    },
    {
        title: 'Cliente',
        field: 'id_cliente'
    },
    {
        title: 'Fecha',
        field: 'fecha',
        type: "numeric"
    },
    {
        title: 'Hora',
        field: 'hora'
    },
    {
        title: 'Total',
        field: 'total_venta',
        type: "numeric"
    },
    {
        title: 'Cajas',
        field: 'total_cajas',
        type: "numeric"
    }
];
const columnas2 = [
    {
        title: 'ID',
        field: 'id',
        type: "numeric"
    },
    {
        title: 'Cliente',
        field: 'id_cliente'
    },
    {
        title: 'Vendedor',
        field: 'vendedor'
    },
    {
        title: 'Fecha',
        field: 'fecha',
        type: "numeric"
    },
    {
        title: 'Hora',
        field: 'hora'
    },
    {
        title: 'Total',
        field: 'total_venta',
        type: "numeric"
    },
    {
        title: 'Cajas',
        field: 'total_cajas',
        type: "numeric"
    }
];




const ListaVentas = () => {
    const [data, setData] = useState([]);







    useEffect(() => {

        determinar();

    }, [])

    const [tipoUsuario, conocerTipoUsuario] = useState(true);
    const determinar = () => {
        if (cookies.get('rol') === 'vendedor') {
            conocerTipoUsuario(true);
            console.log(cookies.get('rol'));
            const url = 'http://localhost/apiphp/venta.php/?vendedor=';
            const peticionGet = async () => {

                await axios.get(url + '"' + cookies.get('user') + '"')
                    .then(response => {
                        setData(response.data);
                    })
            }
            peticionGet();



        } else if (cookies.get('rol') === 'administrador') {
            conocerTipoUsuario(false);
            console.log(cookies.get('rol'));
            const peticionGet = async () => {
                await axios.get('http://localhost/apiphp/venta.php')
                    .then(response => {
                        setData(response.data);
                    })
            }
            peticionGet();
        }

    }
    //modal 
    const [ventaSeleccionada, setVentaSeleccionada] = useState({
        id: '',
        num_venta: '',
        id_cliente: '',
    })
    const [num_venta, setNum_venta] = useState();
    const seleccionarVenta = (venta, caso) => {
        setVentaSeleccionada(venta);
        abrirCerrarModalEliminar();
    }
    const [modalEliminar, setModalEliminar] = useState(false);
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);


    }
   
    const seleccionarDetalle = (detalle, caso) => {
        setVentaSeleccionada(detalle);
        abrirCerrarModalDetalle();
        if (!modalDetalle) {
            peticionGetCliente(15);
            setNum_venta(detalle.num_venta);
            console.log(num_venta);

        } else {

        }
    }
    const [modalDetalle, setModalDetalle] = useState(false);
    const abrirCerrarModalDetalle = async () => {
        setModalDetalle(!modalDetalle);

    }
    // proceso para eliminar venta
    const url = 'http://localhost/apiphp/venta.php';
    const peticionDelete = async () => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(url, f, { params: { id: ventaSeleccionada.id } })
            .then(response => {

                setData(data.filter(venta => venta.id !== ventaSeleccionada.id));
                abrirCerrarModalEliminar();

            })
    }
    // proceso para cargar detalles de la venta
    //cliente
    const [cliente, setCliente] = useState({});
    const peticionGetCliente = async (id_cliente) => {
        const url = (`http://localhost/apiphp/cliente.php/?id=${id_cliente}`);
        await axios.get(url)
            .then(response => {

                setCliente(response.data);
                console.log(cliente.id)

            })
    }




    return (
        <div>

            {tipoUsuario ? (<div>
                <MaterialTable
                    title="Tabla Ventas"
                    columns={columnas1}
                    data={data}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                ></MaterialTable>




            </div>)

                : (
                    <div>
                        <MaterialTable
                            title="Tabla Ventas"
                            columns={columnas2}
                            data={data}
                            fixedHeader
                            fixedHeaderScrollHeight="600px"
                            actions={[
                                {
                                    icon: 'details',
                                    tooltip: 'Detalles de Venta',

                                    onClick: (event, rowData) => seleccionarDetalle(rowData, "Detalle")
                                },
                                {
                                    icon: 'delete',
                                    tooltip: 'Eliminar Venta',
                                    onClick: (event, rowData) => seleccionarVenta(rowData, "Eliminar")
                                }

                            ]}
                            options={{
                                actionsColumnIndex: -1
                            }}
                        ></MaterialTable>
                    </div>
                )}
            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar la Venta ?
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




            <Modal isOpen={modalDetalle}>
                <ModalHeader>
                    Detalle
            </ModalHeader>
                <ModalBody>
                    <div className="form-group contenedor">
                        <h3>Datos del Cliente</h3>
                        <div className="table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Rut</th>
                                    <th scope="col">Comuna</th>
                                    <th scope="col">Direccion</th>

                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </div>
                        <h3>Datos de Venta</h3>
                        <table className="table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Hora</th>
                                    <th scope="col">Vendedor</th>

                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>13</td>
                                <td>15-02-2021</td>
                                <td>18:30</td>
                                <td>Erwin</td>

                                </tr>
                               

                            </tbody>

                        </table>
                        <TablaDetalle
                        numVenta = {num_venta}
                        ></TablaDetalle>


                    </div>
                </ModalBody>
                <ModalFooter>
                    <button
                        className="btn btn-secondary"
                        onClick={() => abrirCerrarModalDetalle()}>
                        Cerrar
                    </button>
                </ModalFooter>
            </Modal>



        </div>
    )
}

export default ListaVentas;