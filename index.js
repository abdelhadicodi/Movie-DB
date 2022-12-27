const express = require('express');
const app = express();
const port = 4000;

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الارهاب و الكباب', year: 1992, rating: 6.2 }
]
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
else if (test1 == "movies"){
     test2 == "create"
    ? res.send("create movie")
    : test2 == "read"
    ? res.send ({status:200, data:movies})
    : test2 == "update"
    ? res.send ("update movie")
    : test2 == "delete"
    ? res.send("delete movie")
    : res.send("choose what you need from movies (create, read, update, delete)")
}
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})