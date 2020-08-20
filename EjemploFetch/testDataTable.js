import { Table } from './Tables.js'

const data = [
    [1, 'Leo', 'Castellanos', 24, 1],
    // [2, 'Suker', 'Castellanos', 18, 2],
    [2, 'Alberto', 'Correa', 27, 2],
    [3, 'Irving', 'Flores', 31, 3],
    [4, 'Gisselle', 'Rielivazquez', 26, 4],
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

const tabla = new Table('table', data)

// //Obtiene las rows de la tabla
// const rows = tabla.rows()
// const row  = tabla.rowById(4)


// console.log(row.children)

// //Obtiene los datos de la tabla
// const tData = tabla.data()
// const tDataId  = tabla.dataById(5)
// const tDataKey  = tabla.dataByKey('Castellanos', 2)
// const tDataFilter = tabla.dataFilter('Flores')


// //Se puede añadir un solo elemento
// tabla.add([6, 'Javier', 'Chimeo', '30', 6])

// //O un arreglo de elementos
// tabla.add([
//     [7, 'Omar', 'Silva', 31, 7],
//     [8, 'Enrique', 'Montiel', 'Sabe', 8],
// ])

// //Se puede remover por id, o por key e index
// tabla.remove(3)
// tabla.remove('Castellanos', 2)

// // //Esta es peligrosa si hay muchos datos en la tabla, solo es para casos MUY específicos
// // //o si la tabla tiene menos de 1k registros.
// const button = (id) => `<button data-id="${id}" class="btn btn-default">Editar</button>`
// tabla.template(4, button)