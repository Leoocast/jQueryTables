import { Table } from '../Tables.js' 

const table = new Table('table')

setTimeout(() => {
    table.setFilter(r => r[2] == 94)
}, 2000)


setTimeout(() => {
    table.reset()
}, 5000)