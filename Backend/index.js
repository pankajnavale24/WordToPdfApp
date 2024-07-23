const express = require('express')
const app = express()
const port = 3000
const multer  = require('multer')
const docxToPDF = require('docx-pdf');
const path = require('path')
const cors = require('cors');

app.use(cors());

// setting up the file storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  app.post('/convertFile', upload.single('file'), (req, res, next) => {
    try {
        if(!req.file){
            return res.status(400).send({
                message: 'No file uploaded'
            })
        }
        console.log('file', req.file);

        //defining output file path
        let outputPath = path.join(__dirname, "outputpdf",`${req.file.originalname}.pdf`);

        docxToPDF(req.file.path,outputPath ,(err,result)=>{
            if(err){
              console.log(err);
              return res.status(500).send({
                message: 'Error converting DOCX to PDF'
              })
            }
            res.download(outputPath,()=>{
            console.log("file downoladed");   
            })
            console.log('result'+result);
          });
          
    } catch (error) {
        console.error(error)
        res.status(500).send({
            message: 'Error processing the request'
        })
    }

  })

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})