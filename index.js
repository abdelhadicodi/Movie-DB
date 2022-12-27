const express = require('express');
const app = express();
const port = 4000;
app.get('/:test1?/:test2?', (req,res) =>{
    let test1 = req.params.test1;
    let test2 = req.params.test2;

if (test1 == undefined){
    res.send("ok");
}   
else if (test1 == "test"){
    const answers ={
        status:200,
        message:"ok"
    };
    res.send(answers)
}
else if (test1 == "time"){
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}`;
    let answers = {status:200, message:time};
    res.send (answers);
}
else if (test1 == "hello"){
    test2 == undefined
   ? res.send({ status: 200, message: "Hello"})
   : res.send({status:200,message:`Hello, ${test2}`})
}

else if (test1 == "search"){
    if (test1 == "search" && test2 == undefined){
        let search = {status:500, message:"you have to provide a search"}
        res.send(search)
        
    }
    else{
        let search = { status:200 , message: "ok"};
        res.send(search)
    }
}
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})