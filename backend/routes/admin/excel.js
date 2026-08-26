const QuestionService = require('../../services/questionService');
const router = require('express').Router();
const ExcelJS = require("exceljs");

const fs = require('fs');


const workbook = new ExcelJS.Workbook();

async function read_excel(req, res) {
    let categoryId = req.params.categoryId;
    let subjectId = req.params.subjectId;
    console.log("Questions for category "+categoryId);
    console.log("Subject "+subjectId);
    res.status(200).send("Questions for category "+categoryId+" and Subject "+subjectId );
    
    let rows = [];
    const fullPath = fs.realpathSync('/app/excel/diktya.xlsx')
    await workbook.xlsx.readFile(fullPath).then(() => {
        const worksheet = workbook.getWorksheet(1); // Get the first sheet
        // Iterate through each row in the worksheet
        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                cells = []
                // console.log(`Row ${rowNumber}: `);
                

                row.eachCell((cell, index) => {
                    // console.log(`Cell ${index}: ${cell.value}`);
                    cells.push(cell.value);

                });
                rows.push(cells);
                QuestionService.create(cells);

            }
        });
    });
    
   // res.status(200).send(rows);

}

router.get('/:categoryId/:subjectId', read_excel);

module.exports = router;