import {backendApi} from "../backend-api-sr"

export const env_var = (() =>{
    const test = (() => {
        return ""
    })

    const fetchEnvVar = ( async (subPath) => {
        var url = '/api/env_var'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeEnvVar = ( async (subPath, reqBody) => {
        var url = '/api/env_var/store'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateEnvVar = ( async (subPath, reqBody) => {
        var url = '/api/env_var/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateEnvVarStatus = ( async (subPath, reqBody) => {
        var url = '/api/env_var/updateEnvVarStat'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchEnvVar, storeEnvVar, updateEnvVar, updateEnvVarStatus, test};

})()