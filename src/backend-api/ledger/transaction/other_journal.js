import {backendApi} from "../../backend-api-sr"

export const other_journal = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/other-journal'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const show = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-journal/show-detail'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-journal'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const destroy = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-journal/delete'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, show, store, destroy};

})()