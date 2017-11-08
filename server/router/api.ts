import { Router } from "express";
import chirps from "./chirps";

const router = Router();

router
    .use("/chirps", chirps)

export default router