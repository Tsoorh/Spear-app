import { loggerService } from "../../service/logger.service.js"
import { diveService } from "./dive.service.js"


export async function getDives(req, res) {
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
        res.status(401).send("Could't get dives")
    }
}
export async function getById(req, res) {
    const { diveId } = req.params
    try {
        const dive = await diveService.getById(diveId)
        res.send(dive)
    } catch (err) {
        console.log("🚀 ~ getById ~ err:", err)
        loggerService.error("Couldn't get dive")
        res.status(401).send("Couldn't get dive")
    }
}
export async function saveDive(req, res) {
    const dive = req.body
    try {
        let diveToSend = dive
        if (dive._id) {
            diveToSend = await diveService.update(dive)
        } else {
            diveToSend = await diveService.add(dive)
        }
        res.json(diveToSend);
    } catch (err) {
        console.log("🚀 ~ saveDive ~ err:", err)
        loggerService.error("Couldn't save dive")
        res.status(401).send("Couldn't save dive")
    }
}
export async function removeDive(req, res) {
    const { diveId } = req.params
    try {
        const removedDiveId = await diveService.remove(diveId)
        res.send(removedDiveId)
    } catch (err) {
        console.log("🚀 ~ removeDive ~ err:", err)
        loggerService.error("Couldn't remove dive")
        res.status(401).send("Couldn't remove dive")
    }
}
