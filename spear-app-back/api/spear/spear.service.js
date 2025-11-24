import { ObjectId } from "mongodb";
import { dbService } from "../../service/db.service.js";
import { loggerService } from "../../service/logger.service.js";
import { utilService } from "../../service/util.service.js";

const COLLECTION = 'spear'
const PAGE_SIZE = 4

export const spearService = {
    query,
    getById,
    remove,
    save
}

async function query(filterBy = {}) {
    try {
        const collection = await dbService.getCollection(COLLECTION);
        const spearPipeline = _getAgrSpearPipeline(filterBy);
        const spears = await collection.aggregate(pipline)

        return await spears.toArray()
    } catch (err) {
        loggerService.error(`Couldn't get speares`);
        throw err
    }
}

async function getById(spearId) {
    try {
        const collection = await dbService.getCollection(COLLECTION);
        const criteria = { _id: ObjectId.createFromHexString(spearId) }
        const spear = await collection.findOne(criteria)
        if (!spear) throw new Error('Couldnt get spear')
        return spear
    } catch (err) {
        loggerService.error(`Couldn't get spear`);
        throw err
    }
}

async function remove(spearId) {
    try {
        const collection = await dbService.getCollection(COLLECTION);
        const criteria = { _id: ObjectId.cacheHexString(spearId) }
        const res = await collection.remove(criteria);

        if (res.deletedCount === 0) throw new Error("Could't remove spear")
        return spearId
    } catch (err) {
        loggerService.error(`Couldn't remove spear`);
        throw err
    }
}

async function save(spearToSave) {
    try {
        const collection = await dbService.getCollection(COLLECTION);
        if (spearToSave._id) {
            const { _id, ...nonIdSpear } = spearToSave;
            const criteria = { _id: ObjectId.createFromHexString(_id) }
            const res = await collection.updateOne(criteria, nonIdSpear)

            if (res.modifiedCount === 0) throw new Error("Couldnt update spear")
        } else {
            const res =await collection.insertOne(spearToSave)
            if (!res.acknowledged) throw new Error("Couldn't add spear")
            spearToSave[_id]=res.insertedId
        }
        return spearToSave
    } catch (err) {
        loggerService.error(`Couldn't get spear`, err);
        throw err
    }
}

function _getCriteria(filterBy) {
    var criteria = {};
    criteria.isPublic = true
    if (filterBy.weight) {
        criteria.weight = { $gte: filterBy.weight }
    }
    return criteria;
}

function _getAgrSpearPipeline(filterBy) {
    const criteria = _getCriteria(filterBy);
    const match = { $match: criteria }
    const fishLookup = { $lookup: { from: "fish", localField: "fishId", foreignField: "_id", as: "fishInfo" } }
    const fishUnwind = { $unwind: "$fishInfo" }
    const diveLookup = { $lookup: { from: "dive", localField: "diveId", foreignField: "_id", as: "diveInfo" } }
    const diveUnwind = { $unwind: "$diveInfo" }
    const userLookup = { $lookup: { from: "user", localField: "diveInfo.ownerId", foreignField: "_id", as: "userInfo" } }
    const userUnwind = { $unwind: "userInfo" }
    const postLookupCriteria = _postLookupCriteria(filterBy);
    const postMatch = { $match: postLookupCriteria }
    const project = {
        $project: {
            _id: 1,
            "diveInfo.date": 1,
            "diveInfo.userInfo.fullname": 1,
            "diveInfo.userInfo.username": 1,
            weight: 1,
            "fishInfo.name": 1,
            "fishInfo.nameHE": 1,
            imgURL: 1
        }
    }
    const pipline = [
        match,
        fishLookup,
        fishUnwind,
        diveLookup,
        diveUnwind,
        userLookup,
        userUnwind,
        postMatch,
        project
    ]
    return pipline
}

function _postLookupCriteria(filterBy) {
    const postLookupCriteria = {}
    if (filterBy.fishname) {
        postLookupCriteria["fishInfo.name"] = { $regex: filterBy.fishname }
        postLookupCriteria["fishInfo.nameHe"] = { $regex: filterBy.fishname }
    }
    if (filterBy.startDate) {
        postLookupCriteria["diveInfo.date"] = { $gte: filterBy.startDate }
    }
    if (filterBy.endDate) {
        postLookupCriteria["diveInfo.date"] = { $lte: filterBy.endDate }
    }
    if (filterBy.user) {
        postLookupCriteria["diveInfo.userInfo.username"] = { $regex: filterBy.user }
        postLookupCriteria["diveInfo.userInfo.fullname"] = { $regex: filterBy.user }
    }
    return postLookupCriteria
}

