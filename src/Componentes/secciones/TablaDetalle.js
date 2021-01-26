import React from 'react';

const TablaDetalle = () => {
    return (
        <div>
            <table className="table container table-striped table-condensed table-responsive">
                <thead>
                    <tr>
                        <th className="th" scope="col">#</th>
                        <th className="th" scope="col">ID Producto</th>
                        <th className="th" scope="col">Producto</th>
                        <th className="th" scope="col">Valor</th>
                        <th className="th" scope="col">Cantidad</th>
                        <th className="th" scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th className="td" scope="row">1</th>
                        <td className="td">334</td>
                        <td className="td">Palo Palito</td>
                        <td className="td">4500</td>
                        <td className="td">5</td>
                        <td className="td"><button type="button" className="btn btn-danger">Eliminar</button></td>
                    </tr>
                    <tr>
                        <th className="td" scope="row">2</th>
                        <td className="td">335</td>
                        <td className="td">Choco Fru</td>
                        <td className="td">4550</td>
                        <td className="td">4</td>
                        <td className="td"><button type="button" className="btn btn-danger">Eliminar</button></td>


                    </tr>




                </tbody>
            </table>
        </div>
    )
}
export default TablaDetalle;