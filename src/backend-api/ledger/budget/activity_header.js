import {backendApi} from "../../backend-api-sr"

export const activity_header = (() =>{
    const test = (() => {
        return ""
    })

    const fetchLedgerHeaderBudget = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/activity'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeLedgerHeaderBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const approveLedgerHeaderBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/approve'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateLedgerHeaderBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })    

    const getPurposeBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/getPurposeBudget'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getDetailBudgets = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/getDetailBudgets'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getDetailActivity = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/getDetailActivity'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getSumTotalDetail = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/getSumTotalDetail'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const unApproveLedgerHeaderBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/unApprove'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getReffNo = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/activity/reff_no'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const getSumTotalAprvBudget = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/activity/total-aprv-budget-act'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })
    // todo nambah filter
    const getAccountRetur = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/activity/account_retur'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const getActivityAccountRetur = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/activity/activity_account_retur'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    return {fetchLedgerHeaderBudget, storeLedgerHeaderBudget, updateLedgerHeaderBudget, test, getPurposeBudget, getDetailBudgets, getDetailActivity, getSumTotalDetail,approveLedgerHeaderBudget, unApproveLedgerHeaderBudget, getReffNo, getSumTotalAprvBudget, getAccountRetur, getActivityAccountRetur};

})()