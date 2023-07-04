import {backendApi} from "../../backend-api-sr"

export const ledger_sub_parent = (() =>{
    const test = (() => {
        return ""
    })

    const fetchLedgerSubParent = ( async (subPath) => {
        var url = '/api/accounting/gl-sub-parent'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerSubParent = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-sub-parent'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerSubParent = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-sub-parent/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchLedgerSubParent, storeLedgerSubParent, updateLedgerSubParent, test};

})()