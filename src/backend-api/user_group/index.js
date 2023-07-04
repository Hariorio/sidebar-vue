import {backendApi} from "../backend-api-sr"

export const user_group = (() =>{
    const test = (() => {
        return ""
    })

    const fetchUserGroup = ( async (subPath) => {
        var url = '/api/group'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeUserGroup = ( async (subPath, reqBody) => {
        var url = '/api/group'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateUserGroup = ( async (subPath, reqBody) => {
        var url = '/api/group/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchUserGroup, storeUserGroup, updateUserGroup, test};

})()