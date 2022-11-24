const request = require('request');
const fs = require('fs');

const URL = process.argv[2];
const filePath = process.argv[3];

request(`${URL}`, (error, response, body) => {
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  // console.log('body:', body);

  if (response.statusCode !== 200) {
    console.log(`The URL given was invalid. Please give a valid URL.`)
    return;
  }

  fs.access(`${filePath}`, fs.R_OK, (err) => {
    if (!err) { 
      console.log("File exists");
    }
    else {
      fs.writeFile(`${filePath}`, body, err => {
        if (err) {
          console.error(err);
        }
        const fileSize = fs.statSync(`${filePath}`);
        const size = fileSize.size;
        console.log(`Downloaded and saved ${size} bytes to ${filePath}`);
      });
    }
  });
});