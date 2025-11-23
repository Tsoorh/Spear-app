import { loggerService } from "../../service/logger.service"

export async function getUsers(req,res){
    try {
        const use = await userService.query();
    } catch (err) {
        loggerService.error('Cannot get user',err)
    }
}
export async function getById(req,res){
    try {
        
    } catch (err) {
        loggerService.error('Cannot get user',err)
    }
}
export async function saveUser(req,res){
    
    try {
        
    } catch (err) {
        loggerService.error('Cannot save user',err)
    }
}