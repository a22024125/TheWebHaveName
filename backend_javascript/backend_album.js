const express = require('express');
const url = require('url');
const app = express();
const mongoose =require("mongoose");
const port = 3000;
const cors = require('cors');
// 存取body中的json
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ limit: '50mb', extended: false });

//解決CORS問題
app.use(cors());
app.use(express.json());
// 因為要傳圖片，所以限制大小50mb
app.use(bodyParser.json({limit: '50mb'}));

//利用mongoose連接mongo
mongoose.set('strictQuery', true);
var conn = mongoose.connect(
    "mongodb://127.0.0.1:27017",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Connected to MongoDB");
      }
    }
  );

conn = mongoose.connection;
const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

app.get('/',(req,res) => {
  
    console.log("/");
    res.end("<h3>hello</h3>");
});

//圖片放入mongo資料庫
app.post('/insert_album',urlencodedParser,(req, res) => {
    console.log("enter insert_album");
    //console.log(req.body);
    //console.log(req.body.album_content);
    const data = {
        name: req.body.name,
        album_content: req.body.album_content
    };
    conn.collection('user_data').insertOne(data);
    res.sendStatus(200);
});

app.get('/get_album',urlencodedParser,(req, res) => {
  console.log("enter get_album");
  //console.log(req.body);
  //console.log(req.body.album_content);
  let conform_album = new Array();
  conn.collection('user_data').insertOne(data);
  res.sendStatus(200);

});
