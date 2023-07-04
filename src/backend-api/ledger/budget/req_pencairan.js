import {backendApi} from "../../backend-api-sr"

export const req_pencairan = (() =>{
    const test = (() => {
        return ""
    })

    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/req_pencairan'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const update = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const approve = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/approve'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const approve_two = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/approve_two'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const rollback = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/rollback'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const reject = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/reject'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getSumTotalApproved = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/getSumTotalApproved'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const getSumTotalPaid = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/getSumTotalPaid'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    // TODO tambah flag yang refer kesini
    const outstanding = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/req_pencairan/outstanding'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const detailOutstanding = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/req_pencairan/outstanding/show'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, store, update, test, approve, rollback, reject, getSumTotalApproved, getSumTotalPaid, outstanding, detailOutstanding, approve_two};

})()