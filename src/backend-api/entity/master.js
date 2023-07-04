import {backendApi} from "../backend-api-sr"

export const entity = (() =>{
    const test = (() => {
        return ""
    })

    const fetchEntity = ( async (subPath) => {
        var url = '/api/entity'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeEntity = ( async (subPath, reqBody) => {
        var url = '/api/entity'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateEntity = ( async (subPath, reqBody) => {
        var url = '/api/entity/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateEntityStatus = ( async (subPath, reqBody) => {
        var url = '/api/entity/updateEntityStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchEntity, storeEntity, updateEntity, updateEntityStatus, test};

})()