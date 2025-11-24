import express from "express";
import { getSpears,getSpear,updateSpear,addSpear,removeSpear } from "./spear.controller.js";

const router = express.Router();


router.get('/', getSpears);
router.get('/:spearId', getSpear);
router.put('/:spearId', updateSpear);
router.post('/', addSpear);
router.delete('/:spearId', removeSpear);




export const spearRouter = router;
