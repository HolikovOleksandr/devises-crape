import { ExcelJS } from "exceljs";

export async function getSheetNames(dbPath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(dbPath);

  let sheetNames = [];
  workbook.eachSheet((sh) => sheetNames.push(sh.name));

  return sheetNames;
}
