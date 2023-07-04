import {backendApi} from "../backend-api-sr"

export const realisasi_anggaran = (() =>{

    const index = ( async (subPath) => {
        var url = '/api/accounting/realisasi-anggaran'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    return {index};

})()