import { loggerService } from '../../service/logger.service.js';
import { dbService } from "../../service/db.service.js";
import { ObjectId } from 'mongodb';


const COLLECTION = 'user';


export const userService = {
    getByUser,
    getById,
    save,
    remove
}
// const users = "./data/user.json"

export async function getByUser(username) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { $regex: { username } }

        const user = await collection.findOne(criteria)
        if (!user) throw new Error("Couldn't get user")

        const miniUser = _getMiniUser(user)
        return miniUser
    } catch (err) {
        loggerService.error("Cannot get user by username")
        throw err;
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { _id: ObjectId.createFromHexString(userId) }

        const user = await collection.findOne(criteria)
        if (!user) throw new Error("Couldn't get user")

        const miniUser = _getMiniUser(user)
        return miniUser
    } catch (err) {
        loggerService.error("Cannot get user by id")
        throw err;
    }
}
async function add(user) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const res = await collection.insertOne(user)

        if (!res.acknowledged) throw new Error("Couldn't add user")
        user._Id = res.insertedId;

        return user
    } catch (err) {
        loggerService.error("Cannot add user")
        throw err;

    }
}
async function update(user) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const { _id, userWithoutId } = user;
        const criteria = { _id: ObjectId.createFromHexString(_id) }
        const res = await collection.updateOne(criteria, userWithoutId)

        if (res.modifiedCount === 0) throw new Error("Couldn't update user")
        const miniUser = _getMiniUser(user)
        return miniUser
    } catch (err) {
        loggerService.error("Cannot update user")
        throw err;

    }
}
async function remove(userId) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { _id: ObjectId.createFromHexString(userId) }
        const res = await collection.deleteOne(criteria)

        if (res.deletedCount === 0) throw new Error("Couldn't remove user")
        return userId
    } catch (err) {
        loggerService.error("Cannot remove user")
        throw err;
    }
}


function _getMiniUser(user) {
    const miniUser = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username
    }
    return miniUser
}