const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

//1] Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})
const port = 3000;



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server side !', app: 'natours' });
// });
// app.post('/', (req, res) => {
//   res.status(200).json("yes post methoed is working ");
// })

// 2] Route Handlers
getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    requestedAt: req.requestTime,
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

// 3] Routes
app.route('/api/v1/tours').get(getAllTours).post(addTours);
app.route('/api/v1/tour/:id').delete(deleteTour).get(getTour);
app.route('api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/user/:id').get(getUserById).put(UpdateUser).delete(deleteUser);

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

// 4] Start server
app.listen(port, () => {
  console.log(`app runnig on port ${port}`);
})