import { loggerService } from '../../service/logger.service.js';
import { dbService } from "../../service/db.service.js";
import { Collection, ObjectId } from 'mongodb';


const COLLECTION = 'user';


export const userService = {
    query,
    getByUser,
    getById,
    add,
    update
}
// const users = "./data/user.json"

async function query(filterBy){
    try {
        const criteria = _getCriteria(filterBy)
        const collection =await dbService.getCollection(COLLECTION)
        const usersCurser =await collection.find(criteria);
        const users = usersCurser.toArray()

        return users;
    } catch (err) {
        loggerService.error("Cannot get users")
        throw err;
    }
}

async function getByUser(username) {
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const criteria = { $regex: { username } }

        const user = await collection.findOne(criteria)
        if (!user) return undefined

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
        console.log("🚀 ~ getById ~ criteria:", criteria)

        const user = await collection.findOne(criteria)
        if (!user) throw new Error("No user found")

        const miniUser = _getMiniUser(user)
        console.log("🚀 ~ getById ~ miniUser:", miniUser)
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

        const miniUser = _getMiniUser(user)
        return miniUser
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

function _getCriteria(filterBy){
    var criteria = {}
    if(filterBy.txt){
        criteria.username = {$regex:filterBy.txt}
        criteria.fullname = {$regex:filterBy.txt}
    }
    return criteria
}

function _getMiniUser(user) {
    const miniUser = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username
    }
    return miniUser
}