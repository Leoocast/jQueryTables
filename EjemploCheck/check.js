import { TableCheck, Table } from '../Tables.js'

const data = [
    [1, 'Leo', 'Castellanos', 24, 1],
    [2, 'Alberto', 'Correa', 27, 2],
    [3, 'Irving', 'Flores', 18, 3],
    [4, 'Gisselle', 'Rielivazquez', 26, 4],
    [5, 'Omar', 'Silva', 26, 4],
    [6, 'Javier', 'Chimeo', 23, 4],
]

const tableSelected = new Table('tableSelected', [], { scrollCollapse : false, scrollY: 230})

const config = {
    onSelectRow: row => { tableSelected.add(row)},
    onDeselectRow: row => { tableSelected.removeById(row[0])},
    scrollCollapse: false,
    scrollY: 230,
}

const table = new TableCheck('table', data, config)

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
