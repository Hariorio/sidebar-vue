import {backendApi} from "../../backend-api-sr"

export const gl_year = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-year'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const show = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-year/show'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, show};

})()