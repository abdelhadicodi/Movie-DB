const express = require('express');
const app = express();
const port = 4000;

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الارهاب و الكباب', year: 1992, rating: 6.2 }
]
app.get('/:test1?/:test2?/:test3?/:test4?', (req,res) =>{
    let test1 = req.params.test1;
    let test2 = req.params.test2;
    let test3 = req.params.test3;
    let test4 = req.params.test4;

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
if (test1 == "movies" && test2 == "create"){
      res.send("create movie")}
        else if (test1 == "movies" && test2 == "update"){
          res.send ("update movie")}
        else if (test1 == "movies" && test2 == "delete"){
          res.send("delete movie")}
        else if (test1 == "movies" && test2 == undefined){
          res.send("choose what you need from movies (create, read, update, delete)")}  

if (test1 == "movies" && test2 == "read"){
        if (test3 == undefined){
            res.send({status:200, data:movies})}
        else if (test3 == "by-date"){
            var movieorder
            movieorder = movies.sort((a,b)=>{
                return a.year - b.year;
            });
            }
        else if (test3 == "by-rating"){
            movieorder = movies.sort((a, b) =>{
                return b.rating - a.rating
            });
            }
        else if (test3 == "by-title"){
            movieorder = movies.sort((a, b) =>{
                if (a.title <  b.title){
                    return -1;
                    }
                if (a.title > b.title){
                    return 1;
                    }
                    return 0;
                })
            } 
    else if (test3 == "id") {
        if (test4 == undefined) {
            res.send("enter an available id")
             } 
        else if (test4<=0 || test4>movies.length || test4 != parseInt ){
            res.send({status:404, error:true, message:`the movie with id ${test4} does not exist `})
             }
        else {
             res.send({ status: 200, data: movies[test4 - 1] })
             }
        }
    }

})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})