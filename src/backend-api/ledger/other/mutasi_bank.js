import {backendApi} from "../../backend-api-sr"

export const mutasi_bank = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/kas-bank/mutasi-kas-bank'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    return {index};

})()