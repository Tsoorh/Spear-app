import { loggerService } from "../../service/logger.service.js"

export async function getUsers(req,res){
    try {
        const use = await userService.query();
    } catch (err) {
        console.log("🚀 ~ getUsers ~ err:", err)
        loggerService.error('Cannot get user',err)
    }
}
export async function getById(req,res){
    try {
        
    } catch (err) {
        console.log("🚀 ~ getById ~ err:", err)
        loggerService.error('Cannot get user',err)
    }
}
export async function saveUser(req,res){
    
    try {
        
    } catch (err) {
        console.log("🚀 ~ saveUser ~ err:", err)
        loggerService.error('Cannot save user',err)
    }
}