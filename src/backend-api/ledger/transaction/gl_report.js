import {backendApi} from "../../backend-api-sr"

export const gl_report = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-reporting/gl-detail-sum'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const index_activity = ( async (subPath) => {
        var url = '/api/accounting/gl-reporting/gl-detail-activity'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    // const show = ( async (subPath, reqBody) => {
    //     var url = '/api/accounting/gl-journal-voucher/show'
    //     if(subPath != null || subPath != ""){
    //         url = url + subPath;
    //     }
    //     return await backendApi.fetchCore(url, reqBody, false, false, false)
    // })

    return {index, index_activity};

})()