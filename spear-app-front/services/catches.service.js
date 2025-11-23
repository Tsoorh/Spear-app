import Axios from 'axios';

const axios = Axios.create({
    withCredentials:true
})

const BASE_URL = "http://localhost:3030/api/catch/";


async function query(filterBy = {}) {
 try {
    return await axios.get(BASE_URL).then(res=>res.data)
} catch (err) {
    console.log("Cannot get catches ", err);
}   
}

async function getById(catchId){
    try {
        return await axios.get(BASE_URL+catchId).then(res=>res.data)
    } catch (err) {
        console.log(`Cannot get catch by id ${catchId}` , err);
    }
}

async function remove(catchId) {
    try{
        return await axios.delete(BASE_URL+catchId).then(res=>res.data);
    }catch(err){
        console.log(`Cant remove catch ${catchId}`, err)
    }
}

async function save(catchItem) {
    try {
        if(catchItem._id) return await axios.put(BASE_URL,catchItem).then(res=>res.data);
        return await axios.post(BASE_URL,catchItem).then(res=>res.data);
    } catch (err) {
        console.log(`Can't save catch`, err)
    }
}






export const catchService = {
    query,
    getById,
    remove,
    save
}