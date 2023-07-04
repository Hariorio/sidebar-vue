import {backendApi} from "../backend-api-sr"

export const sec_right = (() =>{
    const test = (() => {
        return ""
    })

    const fetchSecRight = ( async (subPath) => {
        var url = '/api/sec_right'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeSecRight = ( async (subPath, reqBody) => {
        var url = '/api/sec_right'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateSecRight = ( async (subPath, reqBody) => {
        var url = '/api/sec_right/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateSecRightStatus = ( async (subPath, reqBody) => {
        var url = '/api/sec_right/updateSecRightStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchSecRight, storeSecRight, updateSecRight, updateSecRightStatus, test};

})()