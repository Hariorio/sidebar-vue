import {backendApi} from "../../backend-api-sr"

export const ledger_parent = (() =>{
    const test = (() => {
        return ""
    })

    const fetchLedgerParent = ( async (subPath) => {
        var url = '/api/accounting/gl-parent'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerParent = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-parent'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerParent = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-parent/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchLedgerParent, storeLedgerParent, updateLedgerParent, test};

})()