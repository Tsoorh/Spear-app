import { loggerService } from "../../service/logger.service.js";
import { spearService } from "./spear.service.js";

export async function getSpears(req, res) {
    const filterBy = {
        weight: req.query.weight,
        startDate: req.query.startdate,
        endDate: req.query.enddate,
        fishname: req.query.fishname,
        user: req.query.user
    }
    try {
        const spears = await spearService.query(filterBy);
        res.send(spears);
    } catch (err) {
        loggerService.error('Cannot get speares', err);
        res.status(400).send('Cannot get speares');
    }
}
export async function getSpear(req, res) {
    const { spearId } = req.params
    try {
        const spear = await spearService.getById(spearId)
        if (!spear) return {msg:'No spear found'}
    } catch (err) {
        loggerService.error("Couldn't get spear")
        res.status(400).send("Couldn't get spear")
    }
}
export async function updateSpear(req, res) {
    const spear = req.body
    try {
        const spearRes = await spearService.save(spear);
        return spearRes;
    } catch (err) {
        loggerService.error("Couldn't")
        res.status(400).send()
    }
}
export async function addSpear(req, res) {
    const spear = req.body
    try {
        const spearWithId = await spearService.save(spear)
        return spearWithId;
    } catch (err) {
        loggerService.error("Couldn't")
        res.status(400).send()
    }
}
export async function removeSpear(req, res) {
    const { spearId } = req.params;
    try {
        const removedId = await spearService.remove(spearId)
        return removedId
    } catch (err) {
        loggerService.error("Couldn't")
        res.status(400).send()
    }
}