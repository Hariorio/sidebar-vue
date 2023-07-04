import {backendApi} from "../../backend-api-sr"

export const ledger_finance = (() =>{
    const test = (() => {
        return ""
    })

    const fetchLedgerFinance = ( async (subPath) => {
        var url = '/api/accounting/glFinance'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerFinance = ( async (subPath, reqBody) => {
        var url = '/api/accounting/glFinance'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerFinance = ( async (subPath, reqBody) => {
        var url = '/api/accounting/glFinance/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchLedgerFinance, storeLedgerFinance, updateLedgerFinance, test};

})()