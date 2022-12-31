const express = require('express');
const app = express();
const port = 4000;

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الارهاب و الكباب', year: 1992, rating: 6.2 }
]
app.get('/',(req,res)=>{
    res.send("ok")
    })
app.get('/test',(req,res)=>{
    const answers = {
        status:200 , message:"ok"
    }
    res.send(answers)
    })
app.get('/time',(req,res)=>{
    let date = new Date();
    let time = `${date.getHours()}:${date.getMinutes()}`;
    let answers = {status:200, message:time};
    res.send (answers);
    })
app.get('/hello/:test2',(req,res)=>{
    let test2 = req.params.test2;
        test2 == undefined
    ? res.send({ status: 200, message: "Hello"})
    : res.send({status:200,message:`Hello, ${test2}`});
    })
app.get('/search',(req,res)=>{
    if (req.query.s == "" || req.query.s == undefined) {
        let search = {status:500, message:"you have to provide a search"}
            res.status(500)
            res.send(search)    
            }
             else{
                 let search = { status:200 , message: "ok" };
                 res.send(search)
             }
    })
app.post('/movies/create',(req,res)=>{
            var title = req.query.title;
            var year = req.query.year;
            var yearDig = year.toString().length;
            var newmovie;
    if (title == undefined || year == undefined || yearDig != 4) {
            res.status(403)
            .send({status:403, error:true, message:`you cannot create a movie without providing a title and a year`});
            } 
    else {
    if (    req.query.rating == undefined || req.query.rating >10){
            newmovie = { title: req.query.title, year: req.query.year, rating: 4 };
        } 
    else{
            newmovie = {title: req.query.title, year: req.query.year, rating: req.query.rating};
        }
            }
            movies.push(newmovie);
            res.send(movies);  
    })
app.get('/movies/read/:test3?/:test4?',(req,res)=>{
    let test3 = req.params.test3;
    let test4 = req.params.test4;
        if (test3 == undefined){
            res.send({status:200, data:movies})}
        else if (test3 == "by-date"){
            var movieorder
            movieorder = movies.sort((a,b)=>{
                return a.year - b.year;
            });
        }
    
                
        if (test3 == "by-rating"){
            movieorder = movies.sort((a, b) =>{
                return b.rating - a.rating
            });
                }
        if (test3 == "by-title"){
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
        if (test3 == "id") {
            if (test4 == undefined) {
                res.send("enter an available id")
                    } 
            else if (test4<=0 || test4>movies.length){
                res.status(404)
                .send({status:404, error:true, message:`the movie with id ${test4} does not exist `})
                    }
            else{
                res.send({ status: 200, data: movies[test4 - 1] })
                    }
                }
    })
app.delete('/movies/delete/:test3?',(req,res)=>{
    let test3 = req.params.test3;
        if(test3 == undefined || test3 < 0 || test3 > movies.length){
            res.status(404)
            .send({status:404, error:true, message: `the movie ${test3} does not exist`})
        }
        else{
            movies.splice(test3 -1,1 );
            res.send({data: movies})
        }
    })        
app.put('/movies/update/:test3',(req,res)=>{
    let test3 = req.params.test3;
    if(test3>movies.length){
        res.send({message: `id ${test3} is not available`})
    }
    else{
        var newmovie = movies[test3 - 1]
        if (req.query.title) newmovie.title = req.query.title;
        if (req.query.rating) newmovie.rating = req.query.rating;
        if (req.query.year) newmovie.year = req.query.year;
        res.send({data: movies })
    }
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})