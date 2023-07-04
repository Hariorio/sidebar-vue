import {backendApi} from "../backend-api-sr"

export const user = (() =>{
    const test = (() => {
        return ""
    })

    const fetchUser = ( async (subPath) => {
        var url = '/api/user'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeUser = ( async (subPath, reqBody) => {
        var url = '/api/user'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateUser = ( async (subPath, reqBody) => {
        var url = '/api/user/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateStatusUser = ( async (subPath, reqBody) => {
        var url = '/api/user/updateStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchUser, storeUser, updateUser, updateStatusUser, test};

})()