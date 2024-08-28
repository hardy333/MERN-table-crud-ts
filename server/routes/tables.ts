import express from "express";

import tablesControllers from "../controllers/tables";
const { addNewTable, getAllTables, updateTable, getSingleTable, deleteTable } =
  tablesControllers;

const router = express.Router();

router.route("/").get(getAllTables).post(addNewTable);
router.route("/:id").get(getSingleTable).post(updateTable).delete(deleteTable);

export default router;
