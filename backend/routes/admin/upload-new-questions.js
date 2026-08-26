const QuestionService = require('../../services/questionService');
const router = require('express').Router();
const ExcelJS = require("exceljs");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: '../../uploads/' })

const fs = require('fs');

const workbook = new ExcelJS.Workbook();


router.post('/', upload.single('uploaded_file'), async function (req, res) {
  let rows = [];
  const fullPath = fs.realpathSync('/uploads/' + req.file.filename);

  await workbook.xlsx.readFile(fullPath).then(() => {
    const worksheet = workbook.getWorksheet(1); // Get the first sheet
    // Iterate through each row in the worksheet
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        cells = []
        row.eachCell((cell, index) => {
          cells.push(cell.value);
        });
        rows.push(cells);
        QuestionService.create(cells, res, req.body.categoryId, req.body.subjectId);
      }
    });
  });

  res.status(200).send(rows);

});

module.exports = router;