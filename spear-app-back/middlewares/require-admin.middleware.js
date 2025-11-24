import { asyncLocalStorage } from "../service/als.service.js";

export async function requireAdmin(req,res,next){
    const {loggedinUser} = asyncLocalStorage.getStore()
    if(!loggedinUser.isAdmin) return 'No permission!'

    next()
}