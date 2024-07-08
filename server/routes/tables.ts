import express from "express";

import tablesControllers from "../controllers/tables";
const { addNewTable, getAllTables, getSingleTable } = tablesControllers;

const router = express.Router();

router.route("/").get(getAllTables).post(addNewTable);
router.route("/:id").get(getSingleTable);

export default router;
