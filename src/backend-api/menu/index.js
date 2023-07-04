import {backendApi} from "../backend-api-sr"

export const menu = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/get_menu'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const menu_item = ( async (subPath, reqBody) => {
        var url = '/api/get_menu_item'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    
    return {index, menu_item};

})()