import {backendApi} from "../backend-api-sr"

export const appl_constant = (() =>{
    const test = (() => {
        return ""
    })

    const fetchApplConstant = ( async (subPath) => {
        var url = '/api/app/constant'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeApplConstant = ( async (subPath, reqBody) => {
        var url = '/api/app/constant'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateApplConstant = ( async (subPath, reqBody) => {
        var url = '/api/app/constant'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchApplConstant, storeApplConstant, updateApplConstant, test};

})()