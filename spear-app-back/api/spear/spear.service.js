import fs from "fs"


import { loggerService } from "../../service/logger.service.js";
import { utilService } from "../../service/util.service.js";

const speares = utilService.readJsonFile('./data/speares.json')
const PAGE_SIZE = 4

export const spearService = {
    query,
    getById,
    remove,
    save
}

async function query(filterBy={}) {
    let spearesToDisplay = speares
    try {
        if (filterBy?.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            spearesToDisplay = spearesToDisplay.filter(ctch => regExp.test(ctch.vendor))
        }

        if (filterBy?.minSpeed) {
            spearesToDisplay = spearesToDisplay.filter(ctch => ctch.speed >= filterBy.minSpeed)
        }

        if ('pageIdx' in filterBy) {
            const startIdx = filterBy.pageIdx * PAGE_SIZE
            spearesToDisplay = spearesToDisplay.slice(startIdx, startIdx + PAGE_SIZE)
        }

        return spearesToDisplay        
    } catch (err) {
        loggerService.error(`Couldn't get speares`, err);
        throw err
    }
}

async function getById(ctchId) {
    try {
        const ctch = speares.find(ctch => ctch._id === ctchId)
        if (!ctch) throw `Couldn't find spear with _id ${ctchId}`
        return ctch
    } catch (err) {
        loggerService.error(`Couldn't get spear`, err);
        throw err
    }
}

async function remove(spearId) {
    try {
        const spearIdx = speares.findIndex(ctch => ctch._id === spearId)
        if (spearIdx === -1) throw `Couldn't remove spear with _id ${spearId}`
        speares.splice(spearIdx, 1)
        return _saveSpearesToFile()
    } catch (err) {
        loggerService.error(`Couldn't get spear`, err);
        throw err
    }
}

async function save(spearToSave) {
    try {
        if (spearToSave._id) {
            const idx = speares.findIndex(ctch => ctch._id === spearToSave._id)
            if (idx === -1) throw `Couldn't update spear with _id ${spearToSave._id}`
            speares[idx] = spearToSave
        } else {
            spearToSave._id = utilService.makeId()
            speares.push(spearToSave)
        }
        await _saveSpearesToFile()
        return spearToSave
    } catch (err) {
        loggerService.error(`Couldn't get spear`, err);
        throw err
    }
}


function _saveSpearesToFile(path = './data/speares.json') {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(speares, null, 4)
        fs.writeFile(path, data, (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

