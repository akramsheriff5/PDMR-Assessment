const fs = require('fs');
const path = require('path');

const fLocation =  path.join(__dirname, 'a.txt')
const destination =path.join(__dirname, 'public/a.txt')

fs.copyFile(fLocation, destination, (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });