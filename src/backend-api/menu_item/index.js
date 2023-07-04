import {backendApi} from "../backend-api-sr"

export const menu_item = (() =>{
    const test = (() => {
        return ""
    })

    const fetchMenuItem = ( async (subPath) => {
        var url = '/api/menu'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeMenuItem = ( async (subPath, reqBody) => {
        var url = '/api/menu'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateMenuItem = ( async (subPath, reqBody) => {
        var url = '/api/menu/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateMenuItemStatus = ( async (subPath, reqBody) => {
        var url = '/api/menu/updateMenuStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchMenuItem, storeMenuItem, updateMenuItem, updateMenuItemStatus, test};

})()