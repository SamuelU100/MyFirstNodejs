const express = require('express');
const bodyParser = require('body-parser'); 
const axios = require ('axios');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html');
    //response.send("<h1> Hello world </h1>");
});
app.get('/kontakt', (request, response)=>{
response.send("+372 556678 332 3");
});
app.post('/', (request, response)=>{
    let userChoice = request.body.currency;
    console.log(userChoice);
    axios.get("https://api.coindesk.com/v1/bpi/currentprice/eur.json").then(res=> {
        let eur = res.data.bpi.EUR.rate;
        let usd = res.data.bpi.USD.rate;
        console.log('EUR', eur);
        console.log('USD', usd);
        let message = '';
        if (userChoice === 'EUR') {
            message = 'EUR' + eur;
        } else {
            message = 'USD' + usd;
        }
        response.send(message);
    });
})
app.listen(2000, ()=> {
    console.log('Server is running port 2000');
});