const express = (require('express'));
const mongoose = require('mongoose')
const app = express()
mongoose.set('strictQuery')
const PORT = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/testExpress.js', (req, res) => {
    res.send('Hello everyone')
});
app.listen(PORT, () => {
    console.log('The app is listening on ' + PORT)
})

const customers = [
  {
    "customerId": 1,
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1-202-555-0147",
    "address": {
      "street": "123 Maple Street",
      "city": "Springfield",
      "state": "IL",
      "zip": "62704"
    },
    "loyaltyPoints": 250
  },
  {
    "customerId": 2,
    "name": "David Kim",
    "email": "david.kim@example.com",
    "phone": "+1-202-555-0199",
    "address": {
      "street": "456 Oak Avenue",
      "city": "Seattle",
      "state": "WA",
      "zip": "98101"
    },
    "loyaltyPoints": 120
  },
  {
    "customerId": 3,
    "name": "Maria Lopez",
    "email": "maria.lopez@example.com",
    "phone": "+1-202-555-0173",
    "address": {
      "street": "789 Pine Road",
      "city": "Austin",
      "state": "TX",
      "zip": "73301"
    },
    "loyaltyPoints": 400
  },
  {
    "customerId": 4,
    "name": "James Smith",
    "email": "james.smith@example.com",
    "phone": "+1-202-555-0125",
    "address": {
      "street": "321 Birch Lane",
      "city": "Denver",
      "state": "CO",
      "zip": "80202"
    },
    "loyaltyPoints": 180
  },
  {
    "customerId": 5,
    "name": "Sophia Patel",
    "email": "sophia.patel@example.com",
    "phone": "+1-202-555-0188",
    "address": {
      "street": "654 Cedar Court",
      "city": "San Francisco",
      "state": "CA",
      "zip": "94102"
    },
    "loyaltyPoints": 320
  }
]
