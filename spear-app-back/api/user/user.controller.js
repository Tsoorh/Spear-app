import { loggerService } from "../../service/logger.service.js"
import { userService } from "./user.service.js";

export async function getUsers(req, res) {
    const filterBy = {
        txt: req.query.txt
    }
    try {
        const users = await userService.query(filterBy);
        res.send(users);
    } catch (err) {
        loggerService.error('Cannot get users', err);
        res.status(400).send('Cannot get users');
    }
}
export async function getById(req, res) {
    const { userId } = req.params
    try {
        const user = await userService.getById(userId)
        if (!user) return { msg: 'No user found' }
    } catch (err) {
        console.log("🚀 ~ getById ~ err:", err)
        loggerService.error('Cannot get user', err)
        throw err;
    }
}
export async function saveUser(req, res) {
    const user = req.body
    try {
        var resUser = user;
        if (user._id) {
            resUser = await userService.update(user)
        } else {
            resUser = await userService.add(user)
        }
        return resUser;
    } catch (err) {
        console.log("🚀 ~ saveUser ~ err:", err)
        loggerService.error('Cannot save user', err)
    }
}
export async function removeUser(req, res) {
    const { userId } = req.params;
    try {
        const removedId = await userService.remove(userId)
        return removedId
    } catch (err) {
        loggerService.error("Couldn't remove user")
        res.status(400).send("Couldn't remove user")
    }
}