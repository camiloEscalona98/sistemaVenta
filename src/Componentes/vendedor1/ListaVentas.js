import React, { Component, Fragment } from 'react';
//import MaterialTable from 'material-table';
import DataTable from 'react-data-table-component';
import '../../estilos/buscador.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import '../../estilos/buscador.css'
//datos para la tabla
const tablaData = [
    { id: 1, cliente: "Juan Perez", fecha: "20-01-2021", total: "50000", detalle: <button type="button" className="btn btn-info">Datalle</button> },
    { id: 2, cliente: "Ismael Saez", fecha: "20-01-2021", total: "43000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 3, cliente: "Esteban Contreras", fecha: "20-01-2021", total: "32400", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 4, cliente: "Cristobal Paredes", fecha: "22-01-2021", total: "18000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 5, cliente: "Felipe Maldonado", fecha: "20-01-2021", total: "9000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 6, cliente: "Cristian Gaete", fecha: "20-01-2021", total: "12000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 7, cliente: "Maria Muñoz", fecha: "20-01-2021", total: "14000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 8, cliente: "Javiera Garcia", fecha: "20-01-2021", total: "34000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 9, cliente: "Luisa Mora", fecha: "20-01-2021", total: "78900", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 10, cliente: "Catalina Paredes", fecha: "20-01-2021", total: "59000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 11, cliente: "Hugo Perez", fecha: "20-01-2021", total: "4500", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 12, cliente: "Nicolas Muñoz", fecha: "20-01-2021", total: "320000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 13, cliente: "Alvaro Pacheco", fecha: "20-01-2021", total: "100000", detalle: <button type="button" className="btn btn-info">Detalle</button> },
    { id: 14, cliente: "Diego Muñoz", fecha: "20-01-2021", total: "99990", detalle: <button type="button" className="btn btn-info">Detalle</button> },



];
//columnas para la tabla
const columnas = [
    {
        name: 'ID',
        selector: 'id',
        sortable: true
    },
    {
        name: 'Cliente',
        selector: 'cliente',
        sortable: true,
        //columna mas grande
        grow: 2
    },
    {
        name: 'Fecha',
        selector: 'fecha',
        sortable: true
    },
    {
        name: 'Total',
        selector: 'total',
        sortable: true
    },
    {
        name: 'Detalle',
        selector: 'detalle',
        sortable: true,


    },
];
//cambiar paginacion a español
const paginacionOpciones = {
    rowsPerPageText: 'Filas por Página',
    rangeSeparatorText: 'de',
    selectAllRowItem: true,
    SelectAllRowsItemsText: 'Todos'

}


class ListaVentas extends Component {

    state = {
        busqueda: '',
        ventas: []
    }
    onChange = async e => {
        e.persist();
        await this.setState({ busqueda: e.target.value });
        this.filtrarElementos();
    }
    filtrarElementos = () => {

     //           item.id.toString().includes(this.state.busqueda  )
     //           item.cliente.toLowerCase().includes(this.state.busqueda) || 
     //           item.fecha.toLowerCase().includes(this.state.busqueda)
       
        var search = tablaData.filter(item => {
            if (item.cliente.toLowerCase().includes(this.state.busqueda) ||
            item.id.toString().includes(this.state.busqueda  ) || 
            item.fecha.toLowerCase().includes(this.state.busqueda)
            ) {
                return item;
            }
        });
        this.setState({ ventas: search })
    }
    componentDidMount() {
        this.setState({ ventas: tablaData });
    }


    render() {
        return (
            <Fragment>
                  <div className="container">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="textField"
                        name="busqueda"
                        value={this.state.busqueda}
                        onChange={this.onChange}
                    ></input>
                    <button
                        type="button"
                        className="btnBuscar">
                        {""}
                        <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                    </button>
                </div>
            <div className="table-responsive">

              


                <DataTable
                    columns={columnas}
                    data={this.state.ventas}
                    title="Lista de Ventas"
                    pagination
                    paginationComponentOptions={paginacionOpciones}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                ></DataTable>
            </div>
            </Fragment>
        )
    }
}

export default ListaVentas;