const express = require('express');
const app = express();
const port = 4000;
app.get('/',(req,res) =>{
    res.send("ok");
});
app.get('/test', (req, res) => {
    const answers ={
        status:200,
        message:"ok"
    };
  res.send(answers)
});
app.get('/time', (req,res) =>{
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}`;
    let answers = {status:200, message:time};
    res.send (answers);
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})