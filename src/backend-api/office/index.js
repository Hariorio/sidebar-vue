import {backendApi} from "../backend-api-sr"

export const office = (() =>{
    const test = (() => {
        return ""
    })

    const fetchOffice = ( async (subPath) => {
        var url = '/api/app/branch-office'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeOffice = ( async (subPath, reqBody) => {
        var url = '/api/app/branch-office'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateOffice = ( async (subPath, reqBody) => {
        var url = '/api/app/branch-office/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchOffice, storeOffice, updateOffice, test};

})()