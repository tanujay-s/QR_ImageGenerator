import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import qr from "qr-image";
import { fileURLToPath } from 'url';


// Manually define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = process.env.port|| 3000;



app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname)));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/generate', (req, res) => {
  const url = req.body.url;
  if (url) {
    const qr_svg = qr.image(url, { type: 'png' });
    res.type('png'); 
    qr_svg.pipe(res);

  } else {
    res.send('No URL provided');
  }
});


  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });