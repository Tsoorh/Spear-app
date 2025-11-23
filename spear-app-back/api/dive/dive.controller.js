import { loggerService } from "../../service/logger.service.js"

async function getDives(req, res) {
    const filterBy = {
        startDate: req.query.startdate,
        endDate: req.query.enddate,
        fishId: req.query.fishId,
        owner: req.query.owner
    }
    try {
        const dives = await diveService.query(filterBy)
        res.send(dives)
    } catch (err) {
        console.log("🚀 ~ getDives ~ err:", err)
        loggerService.error("Could't get dives", err)
        res.send(401).json("Could't get dives")
    }
}
async function getById(req, res) {
    const { diveId } = req.params
    try {
        const dive = await diveService.getById(diveId)
        res.send(dive)
    } catch (err) {
        console.log("🚀 ~ getById ~ err:", err)
        loggerService.error("Couldn't get dive")
        res.send(401).json("Couldn't get dive")
    }
}
async function saveDive(req, res) {
    const { dive } = req.body
    try {
        var diveToSend
        if (dive._id) {
            diveToSend = await diveService.update(dive)
        } else {
            diveToSend = await diveService.add(dive)
        }
        res.send(diveToSend);
    } catch (err) {
        console.log("🚀 ~ saveDive ~ err:", err)
        loggerService.error("Couldn't save dive")
        res.send(401).json("Couldn't save dive")
    }
}
async function removeDive(req, res) {
    const { diveId } = req.params
    try {
        const removedDiveId = await diveService.remove(diveId)
        res.send(removedDiveId)
    } catch (err) {
        console.log("🚀 ~ removeDive ~ err:", err)
        loggerService.error("Couldn't remove dive")
        res.send(401).json("Couldn't remove dive")
    }
}
