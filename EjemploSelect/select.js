import { TableSelect, Table } from '../Tables.js'
import { Request } from '../PruebaMerakiTables/request.js'

(async function(){
    const dataEstatica = [
        [1, 'Leo', 'Castellanos', 24],
        [2, 'Alberto', 'Correa', 27],
        [3, 'Irving', 'Flores', 18],
        [4, 'Gisselle', 'Rielivazquez', 26],
        [5, 'Omar', 'Silva', 26],
        [6, 'Javier', 'Chimeo', 23],
    ]

    const tableSelectedConfig = {
        scrollCollapse : false, 
        scrollY: "75vh"
    }
    const tableSelected = new Table('tableSelected', [], tableSelectedConfig)

    const config = {
        onSelectRow: row => { tableSelected.add(row) },
        onDeselectRow: row => { tableSelected.removeById(row[0])},
        // onSelectRow: row => { tableSelected.clear(); tableSelected.add(row);},
        scrollCollapse: false,
        scrollY: "75vh"
    }
    
    const table = new TableSelect('table', dataEstatica, config)
  
    // --------- Events -------- //
    clearSelected(table)

    viewSelected(table)

    removeSelected(table)

    filterBySelected(table)

    resetFilter(table)
})()

function clearSelected(table){
    document.querySelector('#clearSelected').addEventListener('click', () =>{
       table.clearSelected()
    })
}

function viewSelected(table){
    document.querySelector('#viewSelected').addEventListener('click', () =>{
        const selectedData = table.selectedData()
        const selectedIds = table.selectedIds()
        const selectedRows = table.selectedRows()
        const selectedRowsColumns = table.selectedRowsColumns()
    
        console.log("Data: ", selectedData)
        console.log("Ids: ", selectedIds)
        console.log("Rows: ", selectedRows)
        console.log("RowsColumns: ", selectedRowsColumns)
    
    })
}

function removeSelected(table){   
    document.querySelector('#removeSelected').addEventListener('click', () =>{
        const removedData = table.removeSelectedRows()

        console.log("Removed data: ", removedData)
        console.log("Remanent data: ", table.data())
    })
}

function filterBySelected(table){
    document.querySelector('#filterBySelected').addEventListener('click', () =>{
       table.setFilter(r => r[3] < 25)
    })
}

function resetFilter(table){
    document.querySelector('#resetFilter').addEventListener('click', () =>{
       table.reset()
    })
}

async function getHugeData(){
    const data = await caller.fetchGET('https://jsonplaceholder.typicode.com/photos')

    const dataTable = data.map(r => Object.values(r)).map(x => [x[1], x[2], x[3], x[4]])

    const test20 = [...dataTable, ...dataTable, ...dataTable, ...dataTable ]

    return test20
}