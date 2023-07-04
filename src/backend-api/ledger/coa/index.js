import {backendApi} from "../../backend-api-sr"

export const ledger_coa = (() =>{

    const fetchLedgerCoa = ( async (subPath) => {
        var url = '/api/accounting/gl'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const glFlag = ( async (subPath) => {
        var url = '/api/accounting/master/gl_flag'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerCoa = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerCoa = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchLedgerCoa, storeLedgerCoa, updateLedgerCoa, glFlag};

})()