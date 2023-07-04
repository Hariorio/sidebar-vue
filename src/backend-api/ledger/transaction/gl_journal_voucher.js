import {backendApi} from "../../backend-api-sr"

export const gl_journal_voucher = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-journal-voucher'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const show = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-journal-voucher/show'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, show};

})()