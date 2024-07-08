import Chance from "chance";
import { FormData } from "../controllers/tables";

const chance = new Chance();

const generateTableData = (formData: FormData) => {
  const newTableData: object[] = [];

  for (let i = 0; i < 250; i++) {
    const rowObj: {
      [key: string]: string | number | boolean | null;
    } = {};

    // for (const [key, value] of Object.entries(formData.tableColumn[i])) {
    //     rowObj[formData.tableColumn] = chance.animal();
    // }
    formData.tableColumn.forEach((columnObj) => {
      if (columnObj.canBeNull) {
        const nullChance = Math.random() - 0.25;
        if (nullChance < 0) {
          rowObj[columnObj.columnName] = null;
          return;
        }
      }

      if (columnObj.columnType === "string") {
        rowObj[columnObj.columnName] = chance.word();
      } else if (columnObj.columnType === "number") {
        rowObj[columnObj.columnName] = chance.age();
      } else if (columnObj.columnType === "boolean") {
        rowObj[columnObj.columnName] = chance.bool();
      } else {
        rowObj[columnObj.columnName] = chance.word();
      }
    });

    newTableData.push(rowObj);
  }

  const newTable = {
    name: formData.tableName,
    data: newTableData,
  };

  return newTable;
};

export default generateTableData;
