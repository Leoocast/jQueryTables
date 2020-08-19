import { jQuery as $ } from './js/dataTable.js'

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

    remove(id, index = null){

        let filteredData = []

        if (index !== null) 
            filteredData = this._data.filter(r => r[index] !== id)
        else 
            filteredData = this._data.filter(r => r[0] !== id)

        this._setData(filteredData, true)

        this._refresh()
    }

    removeFilter(key){

        const filteredData = this._data.filter(r => !r.some(x => x === key))

        this._setData(filteredData, true)

        this._refresh()
    }

    rows(){
        const rows = this._getRows()
        return rows
    }

    rowById(id){
        const rows = this._getRows()

        return rows.filter(r => r[0] === id)[0]
    }

    rowsFilter(key){
        const rows = this._getRows()
        const filteredData = rows.filter(r => r.some(x => x === key))
        return filteredData
    }

    set(data){
        if (this._source !== null) {
            this._source.destroy()
            this._config.data = data

            this.create()
        } else{
            throw new Error("Need to create table first")
        }
    }

    template(index, action){

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

        this.destroy()
        this._createRoot(this._data, {columns: columns }, true)
        this._adjust()
    }

    //<-------- Private --------->
    _addRows(data){
        if (Array.isArray(data[0])) 
            data.forEach(row => this._source.row.add(row).draw(false))
        else  
            this._source.row.add(data).draw(false)  
    }
    _createRoot(data, config, create){
        this._data = data
        this._config = getConfig(data, config)

        if (create)
            this.create()
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
    
            this._source.rows().every(function(){
               const data = this.data()
                rows.push(data)
            })
    
            this._rows = rows
            this._dataChange = false
        }

        return this._rows
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

    _refresh(){
        this._source.clear()
        this._source.rows.add(this._data)
        this._adjust()
    }
    
    _adjust(){
        this._source.columns.adjust().draw()
    }
}

export class TableCheck extends Table {
    constructor(id, data = null, config = null, create = true){
        super(id, data, config, create)
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
        language: toSpanish()
    }

    if (data !== null) 
        defaultConfig.data = data

    return Object.assign(defaultConfig, config)
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