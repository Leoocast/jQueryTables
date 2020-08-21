import { TableCheck, Table } from '../Tables.js'
import { Request } from '../PruebaMerakiTables/request.js'

const caller = new Request();

//Normal table
(async function(){
    const data = await caller.fetchGET('https://jsonplaceholder.typicode.com/photos')
    
    const dataTable = data.map(r => Object.values(r)).map(x => [x[1], x[2], x[3], x[4]])

    const test20 = [...dataTable, ...dataTable, ...dataTable, ...dataTable ]
    
    const tableSelected = new Table('tableSelected', [], { scrollCollapse : false, scrollY: 230})
    
    const dataNulos = dataTable.filter(r => r == null)
    
    console.log(dataNulos, dataNulos.length);

    const config = {
        onSelectRow: row => { tableSelected.add(row) },
        onDeselectRow: row => { tableSelected.removeById(row[0])},
        scrollCollapse: false,
        scrollY: 230
    }
    
    
    const table = new TableCheck('table', dataTable, config)
    
    document.querySelector('#checkSelected').addEventListener('click', () =>{
        const selectedData = table.selectedData()
        const selectedIds = table.selectedIds()
        const selectedRows = table.selectedRows()
        const selectedRowsColumns = table.selectedRowsColumns()
    
        console.log("Data: ", selectedData)
        console.log("Ids: ", selectedIds)
        console.log("Rows: ", selectedRows)
        console.log("RowsColumns: ", selectedRowsColumns)
    
    })
    
    document.querySelector('#removeSelected').addEventListener('click', () =>{
        const removedData = table.removeSelectedRows()
    
        console.log("Removed data: ", removedData)
        console.log("Remanent data: ", table.data())
    })
    
    
})()


