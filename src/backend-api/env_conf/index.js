import {backendApi} from "../backend-api-sr"

export const env_conf = (() =>{
    const test = (() => {
        return ""
    })

    const fetchMenuEnv = ( async (subPath) => {
        var url = '/api/env_conf'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeMenuEnv = ( async (subPath, reqBody) => {
        var url = '/api/env_conf'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateMenuEnv = ( async (subPath, reqBody) => {
        var url = '/api/env_conf/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateMenuItemStatus = ( async (subPath, reqBody) => {
        var url = '/api/env_conf/updateEnvConfStat'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const getEnvVarConfUser = ( async (subPath) => {
        var url = '/api/get_env_var_conf'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    return {fetchMenuEnv, storeMenuEnv, updateMenuEnv, updateMenuItemStatus, test, getEnvVarConfUser};

})()