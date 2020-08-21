import { TableCheck, Table } from '../Tables.js'
import { jQuery as $ } from '../src/js/dataTable.js'

const data = [
    [1, 'Leo', 'Castellanos', 24, 1],
    [2, 'Alberto', 'Correa', 27, 2],
    [3, 'Irving', 'Flores', 31, 3],
    [4, 'Gisselle', 'Rielivazquez', 26, 4],
]

const table = new TableCheck('table', data)