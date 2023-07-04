import {backendApi} from "../backend-api-sr"

export const return_budget = (() =>{

    // TODO ada filter tambahan gl flag dan flag three jg
    const index = ( async (subPath) => {
        var url = '/api/finance/budget/retur'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/finance/budget/retur'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const update = ( async (subPath, reqBody) => {
        var url = '/api/finance/budget/retur/delete-detail'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const destroy = ( async (subPath, reqBody) => {
        var url = '/api/finance/budget/retur/delete'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const show = ( async (subPath) => {
        var url = '/api/finance/budget/retur/show'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const approve = ( async (subPath, reqBody) => {
        var url = '/api/finance/budget/retur/approve'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const reject = ( async (subPath, reqBody) => {
        var url = '/api/finance/budget/retur/reject'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, store, update, destroy, show, approve, reject};

})()