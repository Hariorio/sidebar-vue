import {backendApi} from "../backend-api-sr"

export const menu_header = (() =>{
    const test = (() => {
        return ""
    })

    const fetchMenuHeader = ( async (subPath) => {
        var url = '/api/menu_header'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeMenuHeader = ( async (subPath, reqBody) => {
        var url = '/api/menu_header'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateMenuHeader = ( async (subPath, reqBody) => {
        var url = '/api/menu_header/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateMenuHeaderStatus = ( async (subPath, reqBody) => {
        var url = '/api/menu_header/updateMenuHeaderStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchMenuHeader, storeMenuHeader, updateMenuHeader, updateMenuHeaderStatus, test};

})()