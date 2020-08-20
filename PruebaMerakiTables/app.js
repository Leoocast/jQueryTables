import { Request } from './request.js'
import { Table } from '../Tables.js'

const caller = new Request();

(async function(){

    const data = await caller.fetchGET('https://jsonplaceholder.typicode.com/posts')
    
    const dataTable = data.map(r => Object.values(r))

    const test1000 = [...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable]

    const test9000 = [...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000]

    const table = new Table('table', test9000, { scrollY: '500px', delegateTask: true})

    const table2 = new Table('table2', test9000, { scrollY: '500px', delegateTask: true})
})()