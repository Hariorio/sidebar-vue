import {backendApi} from "../backend-api-sr"

export const application = (() =>{
    const test = (() => {
        return ""
    })

    const fetchApplication = ( async (subPath) => {
        var url = '/api/aplikasi'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeApplication = ( async (subPath, reqBody) => {
        var url = '/api/aplikasi'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateApplication = ( async (subPath, reqBody) => {
        var url = '/api/aplikasi/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateApplicationStatus = ( async (subPath, reqBody) => {
        var url = '/api/aplikasi/updateAplikasiStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchApplication, storeApplication, updateApplication, updateApplicationStatus, test};

})()