const ExcelJS = require("exceljs");
const parseProductData = require("./asdasda.js");

//
// Функція для отримання назв всіх вкладок файлу Excel
//
async function getSheetNames() {
  sheetNames = [];
  workbook.eachSheet((sheet) => {
    sheetNames.push(sheet.name);
  });

  return sheetNames;
}

//
// Функція для парсингу даних з Excel-файлу
//
async function parseExcelData(sheetName) {
  // Відкриваємо файл Excel
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("db.xlsx");

  // Отримуємо потрібну вкладку
  const sheet = workbook.getWorksheet(sheetName);

  // Проходимося по кожному рядку
  productLinks = [];
  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    // Пропускаємо перший рядок
    if (rowNumber !== 1) {
      const firstColumnValue = row.getCell(1).value;
      productLinks.push(firstColumnValue.hyperlink);
    }
  });

  return await productLinks;
}

const main = async () => {
  const link =
    "https://www.x-kom.pl/p/1092860-myszka-bezprzewodowa-deltaco-gam-120-w-24g-bt.html";

  parseProductData(link)
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

main();
