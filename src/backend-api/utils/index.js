import {backendApi} from "../backend-api-sr"

export const utility = (() =>{

    const fetchSysDate = ( async (subPath) => {
        var url = '/api/sys-date'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    return {fetchSysDate};

})()