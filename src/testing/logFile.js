const EventEmmitter = require("events");
const fsPromises = require("fs").promises;
const path = require("path");
const { v4: uuid } = require("uuid");
const format = require("date-format");


// simple events emmitter for logs 
const dataEmmitter = new EventEmmitter();

dataEmmitter.on("dataChange", (type, details) => {
  const childId = uuid();

  const timeStamp = format(new Date(), "yyyy-MM-dd");
  const logId = uuid();
  const today = new Date();
  const cleanDate = format(today, "dd-MM-yy");
  console.log(`Childs id => ${childId}`);
  console.log(`todays date => ${cleanDate}`);

  console.log(`LOG - ${logId}`);
  console.log(`Time => ${timeStamp}`);
  console.log(`type of data => ${type}`);
  console.log(`Details => ${JSON.stringify(details)}`);
});


// to test the emmitter 
dataEmmitter.emit('dataChange', 'BABY_PROFILE_CREATED', {
    childId: uuid(),
    name: 'Michael',
    dob: '2025-09-22',
    gender: 'Male'
}); 