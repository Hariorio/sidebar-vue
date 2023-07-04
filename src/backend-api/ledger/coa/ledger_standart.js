import {backendApi} from "../../backend-api-sr"

export const ledger_standart = (() =>{
    const test = (() => {
        return ""
    })

    const fetchLedgerStandart = ( async (subPath) => {
        var url = '/api/accounting/gl-standard'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerStandart = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-standard'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerStandart = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-standard/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchLedgerStandart, storeLedgerStandart, updateLedgerStandart, test};

})()