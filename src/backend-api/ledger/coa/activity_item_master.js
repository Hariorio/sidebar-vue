import {backendApi} from "../../backend-api-sr"

export const activity_item_master = (() =>{
    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-activity-item-master'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-activity-item-master'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const update = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-activity-item-master/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, store, update};

})()