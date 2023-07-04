import {backendApi} from "../backend-api-sr"

export const target_income = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/finance/target'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const show = ( async (subPath) => {
        var url = '/api/finance/target/show'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/finance/target'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const destroy = ( async (subPath, reqBody) => {
        var url = '/api/finance/target/delete'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const outstanding = ( async (subPath) => {
        var url = '/api/finance/target/outstanding'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const approve = ( async (subPath, reqBody) => {
        var url = '/api/finance/target/approve'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const reject = ( async (subPath, reqBody) => {
        var url = '/api/finance/target/reject'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, store, destroy, outstanding, show, approve, reject};

})()