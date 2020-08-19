import { Table } from './Tables.js'

const data = [
    [1, 'Leo', 'Castellanos', 24, 1],
    [2, 'Suker', 'Castellanos', 18, 2],
    [3, 'Irving', 'Flores', 31, 3],
    [4, 'Alberto', 'Correa', 27, 4],
    [5, 'Gisselle', 'Rielivazquez', 26, 5],
]

const columns = [
    { data: 0 },
    { data: 1 },
    { data: 2 },
    { data: 3 },
    {
        data: 4,
        render: (id) => `<span class="badge badge-primary">${id}</span></h6>`,
        sortable: false
    }
]

const tabla = new Table('table', data, { columns: columns })

//Obtiene las rows de la tabla
const rows = tabla.rows()
const row  = tabla.rowById(4)
const rowsContains = tabla.rowsFilter("Castellanos")

//Obtiene los datos de la tabla
const tData = tabla.data()
const tDataId  = tabla.dataById(5)
const tDataKey  = tabla.dataByKey('Castellanos', 2)
const tDataFilter = tabla.dataFilter('Flores')

console.log(tDataId)

//Se puede añadir un solo elemento
tabla.add([6, 'Javier', 'Chimeo', '30', 6])

//O un arreglo de elementos
tabla.add([
    [7, 'Omar', 'Silva', 31, 7],
    [8, 'Enrique', 'Montiel', 'Sabe', 8],
])

//Se puede remover por id, o por key e index
tabla.remove(3)
tabla.remove('Castellanos', 2)

//También se puede remover por cualquier posición que contenga la key
tabla.removeFilter(27) //<- Removería cada row donde alguna columna tenga 27 en INT

//Esta es peligrosa si hay muchos datos en la tabla, solo es para casos MUY específicos
//o si la tabla tiene menos de 1k registros.
const button = (id) => `<button data-id="${id}" class="btn btn-default">Editar</button>`
tabla.template(4, button)