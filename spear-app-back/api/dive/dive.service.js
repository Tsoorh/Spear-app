import { ObjectId } from "mongodb"
import { dbService } from "../../service/db.service.js"
import { loggerService } from "../../service/logger.service.js"

const COLLECTION = 'dive'

export const diveService = {
    query,
    getById,
    update,
    add,
    remove
}

async function query(filterBy={}){
    
    try {
        const collection =await dbService.getCollection(COLLECTION)
        const criteria = _getCriteria(filterBy)
        const divesCursor = await collection.find(criteria)
        const dives = divesCursor.toArray()

        return dives
    } catch (err) {
        loggerService.error("Couldnt get dives from db")
        throw err
    }
}
async function getById(diveId){
    try {
        const collection =await dbService.getCollection(COLLECTION)
        const criteria = {_id: ObjectId.createFromHexString(diveId)}
        const dive = await collection.findOne(criteria)
        
        if (!dive) throw new Error ("Couldn't find dive")
        return dive
    } catch (err) {
        loggerService.error("Couldnt get dive from db")
        throw err
    }
}
async function update(dive){
    try {
        const collection = await dbService.getCollection(COLLECTION)
        const {_id,...noIdDiveObj} = dive
        const criteria = {_id}
        const res = await collection.updateOne(criteria,noIdDiveObj)

        if(res.modifiedCount === 0) throw new Error ("Couldnt update dive")
        return dive;
    } catch (err) {
        loggerService.error("Could't update dive to db")
        throw err
    }
}
async function add(dive){
    try {
        const collection =await dbService.getCollection(COLLECTION)
        const res = await collection.insertOne(dive);
        
        if(!res.acknowledged) throw new Error("Couldn't add dive")
        
        dive._id = res?.insertedId
        return dive
    } catch (err) {
        loggerService.error("Could't add dive to db")
        throw err
    }
}
async function remove(diveId){
    try {
        const collection =await dbService.getCollection(COLLECTION)
        const criteria = {id:ObjectId.createFromHexString(diveId)}
        const res = await collection.deleteOne(criteria)
        
        if(res.deletedCount ===0) throw new Error("Couldn't remove dive")
    } catch (err) {
        loggerService.error("Couldn't remove dive from db")
        throw err
    }
}

function _getCriteria(filterBy){
    const criteria ={}    
    if(filterBy.startDate){
        criteria.startDate= {$gt:filterBy.startDate}
    }
    if(filterBy.endDate){
        criteria.endDate= {$lt:filterBy.endDate}
    }
    if(filterBy.fishId){
        criteria.fishId = filterBy.fishId
    }
    if(filterBy.owner){
        criteria.owner ={$regex: filterBy.owner}
    }
    return 
}

