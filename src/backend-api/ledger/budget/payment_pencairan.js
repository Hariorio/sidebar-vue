import {backendApi} from "../../backend-api-sr"

export const payment_pencairan = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/payment_pencairan'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const outstanding = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/payment_pencairan/outstanding'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const cekPayment = ( async (subPath) => {
        var url = '/api/accounting/gl-budget/payment_pencairan/cek_payment'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const store = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/payment_pencairan'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const detailPayment = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/payment_pencairan/detailPayment'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const update = ( async (subPath, reqBody) => {
        var url = '/api/accounting/gl-budget/payment_pencairan/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    return {index, store, detailPayment, update, outstanding, cekPayment};

})()