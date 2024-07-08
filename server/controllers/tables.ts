import { Request, Response } from "express";
import Table from "../models/table";
import generateTableData from "../lib/generateTableData";
import asyncWrapper from "../middleware/asyncWrapper";

export type FormData = {
  tableName: string;
  tableColumn: {
    columnName: string;
    columnType: string;
    canBeNull: boolean;
  }[];
};

const getAllTables = asyncWrapper(async (req: Request, res: Response) => {
  const tables = await Table.find({});

  res.status(200).json(tables);
});

const getSingleTable = asyncWrapper(async (req: Request, res: Response) => {
  const { id } = req.params;

  const table = await Table.findOne({ _id: id });

  res.status(200).json(table);
});

const addNewTable = asyncWrapper(async (req: Request, res: Response) => {
  const tableStructure: FormData = req.body;

  const newTable = generateTableData(tableStructure);

  const table = await Table.create(newTable);

  console.log({ table });

  res.status(201).json(newTable);
});

export default {
  addNewTable,
  getAllTables,
  getSingleTable,
};
