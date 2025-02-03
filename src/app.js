const express = require('express');
const claimRoutes = require('./routes/claimRoutes');
const policyRoutes = require('./routes/policyRoutes');
const policyholderRoutes = require('./routes/policyholderRoutes');

const app = express();
app.use(express.json());

app.use('/api', claimRoutes);
app.use('/api', policyRoutes);
app.use('/api', policyholderRoutes);

app.use('/',(req,res)=>{
  res.send(console.log("The claim management site is running"))
})
app.listen(3001, () => console.log("Server running on port 3001"));
