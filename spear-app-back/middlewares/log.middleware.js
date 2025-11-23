import { loggerService } from "../service/logger.service.js";

export function log(req,res,next){
    loggerService.info('visiting ' + req.originalUrl)

    next();
}