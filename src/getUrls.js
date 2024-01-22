export async function getUrls(sheetName, dbPath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(dbPath);

  const sheet = workbook.getWorksheet(sheetName);

  let productLinks = [];
  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    //
    // Skip first row with table's name
    if (rowNumber !== 1) {
      const firstColumnValue = row.getCell(1).value;
      productLinks.push(firstColumnValue.hyperlink);
    }
  });

  return productLinks;
}
