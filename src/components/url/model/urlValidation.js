import {validacionGeneral, ValidationStructure} from './validation.js'

export const resetUrlModel =  class {

    constructor(id, newUrl) {
        this.id = id;
        this.newUrl = newUrl;
    }

    validModel(status){
        const campos = [
            new ValidationStructure(this.id, 'id', 'id', true),
            new ValidationStructure(this.newUrl,'url', 'nueva url', true)
        ]

        return validacionGeneral(campos, status)
    }

}