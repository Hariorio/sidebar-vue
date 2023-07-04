import Vue from "vue";
import axios from 'axios';
import store from '../store'
import router from '../router'

export const backendApi = (() =>{
    const test = (() => {
        return ""
    })

    const fetchCore = async (subPath, reqBody, outputObj = false, outputJson = false, cancelToken=false, token=true, methode='') => {

        if (methode === 'PUT' && reqBody && token === true) {
            try {

                const response = await axios.put(process.env.VUE_APP_URL + subPath, reqBody, { 
                    headers: { Authorization: `Bearer ${store.getters.isTokenUser}` } 
                })
                return response;
                // Work with the response...
            } catch (err) {
                // Handle error
                if (err.response.status === 401) {
                    router.push('/')
                }

                return err.response;
            }
        } else if (methode === 'DELETE' && reqBody && token === true) {
            try {

                const response = await axios.delete(process.env.VUE_APP_URL + subPath, reqBody, { 
                    headers: { Authorization: `Bearer ${store.getters.isTokenUser}` } 
                })
                return response;
                // Work with the response...
            } catch (err) {
                // Handle error
                if (err.response.status === 401) {
                    router.push('/')
                }

                return err.response;
            }
        } else if (reqBody && token === true) {
            try {

                const response = await axios.post(process.env.VUE_APP_URL + subPath, reqBody, { 
                    headers: { Authorization: `Bearer ${store.getters.isTokenUser}` } 
                })
                return response;
                // Work with the response...
            } catch (err) {
                // Handle error
                if (err.response.status === 401) {
                    router.push('/')
                }

                return err.response;
            }
        } else if (token === true) {
            try {
                const response = await axios.get(process.env.VUE_APP_URL + subPath, { 
                    headers: { Authorization: `Bearer ${store.getters.isTokenUser}` } 
                })

                return response;

            } catch (err) {
                // Handle error
                if (err.response.status === 401) {
                    router.push('/')
                }

                return err.response;
            }
            
        } else {

            if (reqBody){

                try {

                    const response = await axios.post(process.env.VUE_APP_URL + subPath, reqBody)
        
                    return response;
                    // Work with the response...
                } catch (err) {
                    
                    return err.response;
                }
    

            } else{
                try {
                    const response = await axios.get(process.env.VUE_APP_URL + subPath)

                    return response;

                } catch (err) {

                    return err.response;
                }
            }
            
                
        }

            

    }

    return {fetchCore, test};
})()