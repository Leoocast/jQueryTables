import { Table } from '../Tables.js' 

const table = new Table('table', null, { scrollY: 550 })

$('.ui.sidebar').sidebar({context: $('.bottom.segment')}).sidebar('attach events', '.btn-menu')

$('.ui.dropdown').dropdown({allowAdditions: true})

$('#table_filter')[0].children[0].childNodes[1].classList.add('btn-dataTable-buscar')

$("#btnBuscar").click(()=>{
    $('#divTable').transition('fade down')
    table._adjust()
})