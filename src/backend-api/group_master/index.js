import {backendApi} from "../backend-api-sr"

export const group_master = (() =>{
    const test = (() => {
        return ""
    })

    const fetchGroupMaster = ( async (subPath) => {
        var url = '/api/group_master'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, null, false, false, false)
    })

    const storeGroupMaster = ( async (subPath, reqBody) => {
        var url = '/api/group_master'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false)
    })

    const updateGroupMaster = ( async (subPath, reqBody) => {
        var url = '/api/group_master/update'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    const updateGroupMasterStatus = ( async (subPath, reqBody) => {
        var url = '/api/group_master/updateGroupMasterStatus'
        if(subPath != null || subPath != ""){
            url = url + subPath;
        }
        return await backendApi.fetchCore(url, reqBody, false, false, false, true, 'PUT')
    })

    return {fetchGroupMaster, storeGroupMaster, updateGroupMaster, updateGroupMasterStatus, test};

})()