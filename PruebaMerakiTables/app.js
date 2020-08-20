import { Request } from './request.js'
import { Table } from '../Tables.js'

const caller = new Request();

(async function(){
    const data = await caller.fetchGET('https://jsonplaceholder.typicode.com/posts')
    
    const dataTable = data.map(r => Object.values(r))

    const test1000 = [...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable, ...dataTable]

    const test12k = [...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000, ...test1000]

    const table = new Table('table', test12k, { scrollY: 300})

    const table2 = new Table('table2', test12k, { scrollY: 300, delegateTask: true})
})()