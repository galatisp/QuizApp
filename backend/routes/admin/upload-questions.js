const QuestionService = require('../../services/questionService');
const router = require('express').Router();
const ExcelJS = require("exceljs");
const path = require("path");
const multer = require("multer");
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded();


const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname);
    }
});

// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;

let uploaded_file;
let categoryId;
let subjectId;

const upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        // Set the filetypes, it is optional
        // const filetypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        //     console.log("File name = " + file.originalname);

        //     const mimetype = filetypes.test(file.mimetype);
        //    console.log("File Mime type = " + file.mimetype);
        const filetypes = /xlx|xlsx|xlsm/;
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        console.log("File extensions = " + extname);
        // if (mimetype && extname) {
        if (extname) {
            return cb(null, true);
        }

        cb(
            "Error: File upload only supports the " +
            "following filetypes - " +
            filetypes
        );
    }

    // mypic is the name of file attribute
}).single("myfile");



const workbook = new ExcelJS.Workbook();

async function read_excel(req, res, filename) {

    res.status(200).send("Questions for category " + categoryId + " and Subject " + subjectId);

    let rows = [];
    const fullPath = fs.realpathSync('/app/uploads/' + filename);
    console.log("File " + fullPath);

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

    res.status(200).send(rows);

}

router.post("/", urlencodedParser, function (req, res, next) {
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    const rawBody = req.body;
    // console.log('Modern Approach:', rawBody.toString('utf-8'));

   
    if (!rawBody) res.send("No body");
    categoryId = rawBody.categoryId;
    subjectId = rawBody.subjectId;
    console.log("Questions for category " + categoryId);
    console.log("Subject " + subjectId);

    if (!rawBody.myfile) res.send("No File");
    console.log("File name : " +rawBody.myfile.originalname);


    // upload(req, res, function (err) {
    //     if (err) {
    //         // ERROR occurred (here it can be occurred due
    //         // to uploading image of size greater than
    //         // 1MB or uploading different file type)
    //         res.send(err);
    //     } else {
    //         // SUCCESS, File successfully uploaded
    //         console.log("Uploaded file : " + uploaded_file);
    //        // read_excel(req, res, uploaded_file);

    //     }
    // });
});


module.exports = router;