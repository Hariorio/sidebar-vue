import {backendApi} from "../backend-api-sr"

export const account_bank = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-account-bank'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const show = ( async (subPath) => {
        var url = '/api/accounting/gl-account-bank/show/' + subPath
        
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const showAcNum = ( async (subPath) => {
        var url = '/api/accounting/gl-account-bank/showAcNum/' + subPath
        
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-account-bank'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const update = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-account-bank/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, show, showAcNum, store, update};

})()