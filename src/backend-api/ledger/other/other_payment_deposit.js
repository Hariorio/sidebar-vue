import {backendApi} from "../../backend-api-sr"

export const other_payment_deposit = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/other-payment-deposit'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-payment-deposit'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const show = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-payment-deposit/show'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const update = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-payment-deposit/delete-detail'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const delete_payment = ( async (subPath, reqBody) => {
        var url = '/api/accounting/other-payment-deposit/delete-header'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, store, show, update, delete_payment};

})()