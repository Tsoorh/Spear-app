import { loggerService } from '../../service/logger.service';

export const userService={
    getByUser
}
const users = "./data/user.json"

export async function getByUser(username){
try {
    const user = users.find(user=> user.username===username)
    if(!user) return 'Unknown user';
    return user;
} catch (err) {
   loggerService.error("Cannot get by user - ",err) 
   throw err;
}
}

async function getById(){
    try {
                
    } catch (err) {
        
    }
}
async function save(){
    try {
        
    } catch (err) {
        
    }
}
async function remove(){
    try {
        
    } catch (err) {
        
    }
}
