const fs = require('fs');
const express = require('express');


const app = express();
const port = 3000;
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'hello from the server side !', app: 'natours' });
// });

// app.post('/', (req, res) => {
//   res.status(200).json("yes post methoed is working ");
// })

app.get('/api/v1/tours',(req ,res)=>{
   res.status(200).json({
    results:tours.length,
    status:'succes',
    data:{
      tours
    }
   });
});
app.listen(port, () => {
  console.log(`app runnig on port ${port}`);
})