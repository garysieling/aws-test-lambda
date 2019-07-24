exports.handler = (event, context, cb) => {
  const aws4 = require('aws4');
  const https = require('https');
 
  // Update this to match the AWS url you want to test.
  const signed = aws4.sign(
    {
      host: 'test.us-east-1.es.amazonaws.com', 
      path: '/'
    });
 
  console.log("Requesting " + signed);
 
  https.get(signed, (resp) => {
    let data = '';
 
    resp.on('data', (chunk) => {
      console.log('received ' + chunk);
      data += chunk;
    });
 
    resp.on('end', () => {
      console.log('DATA COMPLETE: ' + JSON.parse(data).explanation);
      cb();
    });
  }).on("error", (err) => {
    console.log("ERRORED OUT: " + err.message);
 
    cb();
  });
};
