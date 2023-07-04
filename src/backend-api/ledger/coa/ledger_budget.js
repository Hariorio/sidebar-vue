import {backendApi} from "../../backend-api-sr"

export const ledger_budget = (() =>{
    const test = (() => {
        return ""
    })

    const fetchLedgerBudget = ( async (subPath) => {
        var url = '/api/accounting/gl-budget'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const getDetailBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/getDetailBudget'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/getBudget'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const showBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/showBudget'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {fetchLedgerBudget, storeLedgerBudget, updateLedgerBudget, test, getDetailBudget, getBudget, showBudget};

})()