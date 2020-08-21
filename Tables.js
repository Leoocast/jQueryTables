import { jQuery as $ } from './src/js/dataTable.js'

export class Table {
   
    constructor(id, data = null, config = null, create = true){
        this.id = id
        this.element = document.querySelector("#" + id)
        this.$element = $('#' + id)

        this._source = []
        this._config = []
        this._rows = []
        this._data = []

        this._dataChange = true
        this._isCreated = false

        this._createRoot(data, config, create)
    }

    add(data){
        this._setData(data)
        this._addRows(data)
    }
    create(){
        this._source = this.$element.DataTable(this._config)
        this._isCreated = true

        this._fix()
    }

    data(){
       return this._data
    }

    dataById(id){
        return this._data.filter(r => r[0] === id)
    }

    dataByKey(key, index){
        return this._data.filter(r => r[index] === key)
    }

    dataFilter(key){
        return this._data.filter(r => r.some(x => x === key))
    }

    destroy(hide = false){
        if(hide)
            this.element.style.display = 'none'

        if (this._source !== null)
            this._source.destroy()
    }

    remove(key, index = null){

        let filteredData = []

        if (index !== null) 
            filteredData = this._data.filter(r => r[index] !== key)
        else 
            filteredData = this._data.filter(r => r[0] !== key)

        this._setData(filteredData, true)
        this._removeRow(key, index)

        this._dataChange = true
    }

    rows(){
        const rows = this._getRows()
        return rows
    }

    rowById(id){
        const rows = this._getRows()
        return rows.filter(r => r.children[0].innerHTML == id)[0]
    }

    set(data){
        if (this._source !== null) {
            this._data = data
            this._source.destroy()
            this._config.data = data

            this.create()
        } else{
            throw new Error("Need to create table first")
        }
    }

    template(index, action){

        const columns = this._configColumn(index, action)

        if(this._isCreated)
            this.destroy()
        
        this._createRoot(this._data, {columns: columns }, true)
        this._adjust()
    }

    //<-------- Private --------->
    _addRows(data){
        if (Array.isArray(data[0])) 
            this._source.rows.add(data).draw(false)  
        else  
            this._source.row.add(data).draw(false)  
    }

    _adjust(){
        this._source.columns.adjust().draw()
    }

    _createRoot(data, config, create){

        if(data === null)
            this._data = getHtmlData(this.element)
        else
            this._data = data
    
        this._config = getConfig(data, config)

        if (create)
            if (this._config.delegateTask) 
                setTimeout(() => {
                    this.create()
                }, 0)
            else
                this.create()

    }

    _configColumn(index, action){
        const columns = []

        this._data[0].forEach((item, i) => {

            if(i !== index)
                columns.push({ data: i })
            else
                columns.push({ 
                            data: i, 
                            render: action,
                            sortable: false    
                        })
        })

        return columns
    }

    _fix(){
        const classElement = document.querySelector('.dataTables_info')
        classElement.parentElement.classList.remove('col-md-5')
    
        this._source.on('search.dt', () => {
            const x = window.scrollX
            const y = window.scrollY
    
            window.onscroll = () => {
                window.scrollTo(x, y)
    
                setTimeout(() => {
                    window.onscroll = null
                }, 100)
            }
        })
    }

    _getRows(){
        if (this._dataChange) {
            if(this._source === null) return []
       
            let rows = []
    
            this._source.rows().every(function(x){
                const data = this.node()
                rows.push(data)
            })
    
            this._rows = rows
            this._dataChange = false
        }

        return this._rows
    }
    
    _refresh(){
        this._source.clear()
        this._source.rows.add(this._data)
        this._adjust()
    }
    
    //Hay que ver como se desenvuelve esto y a partir de ahí
    //buscar otra alternativa o quedarse con esta solución.
    _removeRow(key, index){
        const rows = this._getRows()

        index = index !== null ? index : 0

        rows.forEach(row => {
            const keyInTable = row.children[index].innerHTML  

            if(key == keyInTable)
                this._source.row(row).remove().draw()
        })
    }

    _setData(data, newData = false){
        if(newData)
            this._data = data
        else
            if (Array.isArray(data[0])) 
                this._data = [...this._data, ...data]
            else            
                this._data = [...this._data, data]
        
        this._dataChange = true
        this._config.data = this._data
    }
}

export class TableCheck extends Table {
    constructor(id, data = null, config = null, create = true){
        super(id, data, config, false)
        
        const checkConfig = this._getCheckConfig()

        this._config = Object.assign(this._config, checkConfig)

        if(create)
            this.create()

    }

    _getCheckConfig(){
        const checkColum = this._configColumn(0, () => '')

        const checkMultiple = this._config.multiple === undefined ? true : this._config.multiple

        const checkConfig = {
            columns: checkColum,
            columnDefs : [
                {
                    orderable: false,
                    className: 'select-checkbox',
                    targets:   0,
                }
            ],
            select: {
                style:    checkMultiple ? '' : 'os',
                selector: 'td:first-child'
            },
            order: [[ 0, 'asc' ]]
        }

        return checkConfig
    }




}

//Core functions ------------------------------------------------------------------------------
function getConfig(data, config){
    
    const defaultConfig = {
        scrollY: '300px',
        scrollCollapse: false,
        bSort: true,
        // scrollX: true,
        paging: false,
        language: toSpanish(),
        deferRender: true,
        scroller: true,
        paging: true,
        delegateTask: false
    }

    if (data !== null) 
        defaultConfig.data = data

    return Object.assign(defaultConfig, config)
}

function getHtmlData(table){
    const tableRows = Array.from(table.children[1].children)

    const rows = tableRows.map(r => [Array.from(r.children).map(c => c.innerHTML)][0])

    return rows
}

//Core const ----------------------------------------------------------------------------------
const toSpanish = () => ({
    sProcessing: "Procesando...",
    sLengthMenu: "Mostrar _MENU_ registros",
    sZeroRecords: "No se encontraron resultados",
    sEmptyTable: "Ningún dato disponible en esta tabla",
    sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
    sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
    sInfoPostFix: "",
    sSearch: "Buscar:",
    sUrl: "",
    sInfoThousands: ",",
    sLoadingRecords: "Cargando...",
    oPaginate: {
        sFirst: "Primero",
        sLast: "Último",
        sNext: "Siguiente",
        sPrevious: "Anterior"
    },
    oAria: {
        sSortAscending: ": Activar para ordenar la columna de manera ascendente",
        sSortDescending: ": Activar para ordenar la columna de manera descendente"
    }
})