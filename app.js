const fs = require('fs');
const express = require('express');


const app = express();
app.use(express.json());
const port = 3000;



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server side !', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).json("yes post methoed is working ");
// })
/////////get methoed
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    results: tours.length,
    status: 'succes',
    data: {
      tours
    }
  });
});


////getby id 
app.get('/api/v1/tours/:id', (req, res) => {
  console.log(req.params);
  const tour = tours.find(el => el.id === req.params);
  res.status(200).json({
    // results: tours.length,
    // status: 'succes',
    // data: {
    //   tours
    // }
  });
});



///////////////////Post methoed 
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTours = Object.assign({ id: newId }, req.body);
  tours.push(newTours);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTours
      }
    });

  });
});


app.listen(port, () => {
  console.log(`app runnig on port ${port}`);
})