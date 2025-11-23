import express from "express";
import { getSpeares } from "./spear.controller.js";

const router = express.Router();


router.get('/', getSpeares);



export const spearRouter = router;
