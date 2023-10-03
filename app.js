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
getAllTours = (req, res) => {
  res.status(200).json({
    results: tours.length,
    status: 'succes',
    data: {
      tours
    }
  });
}

getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  if (!tour) {
    res.status(404).json({
      status: 'failed',
      data: {
        message: 'Invalid Id '
      }
    })
  }
  res.status(200).json({
    status: 'succes',
    data: {
      tour
    }
  });
}

addTours = (req, res) => {
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
}

deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.send(404).json({
      status: 'failed',
      message: 'Invalid ID'
    });
  }
  res.status(204).json({
    status: 'success',
    data: null
  });

}
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getTour);

// app.post('/api/v1/tours', addTours);

// app.delete('/api/v1/tour/:id', deleteTour);

app.route('/api/v1 / tours').get(getAllTours).post(addTours);

app.route('/api/v1/tour/:id').delete(deleteTour).get(getTour);

// app.patch('/api/v1/tour/:id',(req , res)=>{
//   
//   if(req.params.id*1> tours.length){
//     return res.send(404).json({
//       status:'failed',
//       message:'Invalid ID'
//     });
//   }
//   res.status(201).json({
//     status:'success',
//     data:{
//      "updated"
//     }
//   });

// })


app.listen(port, () => {
  console.log(`app runnig on port ${port}`);
})