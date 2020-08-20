import { FetchError } from './error.js'

export class Request {

    constructor(){
        this.config =  {
            method: 'POST',
            body: '',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
    }

    setCofig(config){
        this.config = config
    }

    async fetchGET(url){
        
        try {
            return fetch(url)
                .then((response) => {
                    if(response.status === 200)
                        return response.json()
                    else if (response.status == 404)
                        throw new Error("Not found")
                })
                .catch( ex => { 
                    throw new FetchError(url, {message: 'Service not found'}, 'Is this correct? ' + url)
                })
        } catch (error) {
            error.consoleError()
            return null
        }

    }

    async fetchPOST(url, data = null){
        
        try {
            if(data != null)
                this.config.body = JSON.stringify(data)

            return fetch(url, this.config)
                .then(response => response.json())
                .then(res => {
                   
                    this.config.body = ''

                    if(res.Message){
                        if(res.Message.includes('Falta un valor') ||
                           res.Message.includes('issing')){
                            const param = res.Message.split("'")[1]
                            throw new Error(`Missing value '${param}'`)
                        }
                        else if(res.Message.includes(`No se puede convertir`) ||
                                res.Message.includes(`convert`)){
                            throw new Error(`The sent object has not json format`)
                        }
                    } 
                    else 
                        return res
                })
                .catch( ex => { 
                    if(ex.message.includes('Request with GET/HEAD'))
                        throw new FetchError(url, ex, 'Remove body from the request or change the request to post')
                    else if(ex.message.includes('Missing value'))
                        throw new FetchError(url, ex, `Add the property '${ex.message.split("'")[1]}' to your data`)
                    else if(ex.message.includes('json format'))
                        throw new FetchError(url, ex, `Verify that you are sending a json object`)
                    else if(url === undefined)
                        throw new FetchError("Oops! You haven't set any URL", {message: 'Missing URL to fetch'}, `Set an URL in your request`)
                    else
                        throw new FetchError(url, {message: 'Service not found'}, 'Is this correct? ' + url)
                })
        } catch (error) {
            error.consoleError()
            return error
        }
    }

    async fetchAll(colection){
        return Promise.all(
            colection.map( r => 
                r.data !== undefined
                ?
                this.fetch_POST(r.url, r.data)
                :
                this.fetch_GET(r.url)
                )
        ).then(results => results)
        .catch( err => {
            err.consoleError()
            return null
        })
    }
}