import { loggerService } from "../../service/logger.service.js";
import { spearService } from "./spear.service.js";

export async function getSpeares(req,res) {
    try {
        const speares = await spearService.query();
        res.send(speares);
    } catch (err){
        loggerService.error('Cannot get speares',err);
        res.status(400).send('Cannot get speares');
    }
}
