
const cheerio = require('cheerio'),
axios = require('axios'),
url = `https://www.chotot.com/toan-quoc/mua-ban-do-dien-tu`;

const puppeteer = require('puppeteer');

axios.get(url)
.then((response) => {
    let $ = cheerio.load(response.data);
    var arr = [];
    //console.log($('.wrapperAdItem___2woJ1 > a > div > div > div > noscript').text());    
    $('.wrapperAdItem___2woJ1 > a').each(function (i, e) {                        
        //console.log($(e).attr('href'));
        if(i==1){
            (async () => {
                const browser = await puppeteer.launch({ headless: true });
                const page = await browser.newPage();
                await page.goto('https://www.chotot.com/'+$(e).attr('href'));
              
                let electronicData = await page.evaluate(() => {
                  let products = [];
                  let product_wrapper = document.querySelectorAll('.imageWrapper___1gA_1');             
                  product_wrapper.forEach((product) => {
                    let d;
                    try {
                      d = product.querySelector('img').src;
                    }
                    catch (err) {
                        console.log(err)
                    }
                  products.push(d);
                  });

                  let dt = {};                   
                    dt.title = document.querySelector('.adTilte___3UqYW').innerText;
                    dt.price = document.querySelector('.price___2UkjD').innerText;
                    dt.content = document.querySelector('.adBody___ev-xe').innerText;

                    let arr =[];
                    let detail = document.querySelectorAll('.adParamValue___25KeI');
                    detail.forEach(ele=>{
                        arr.push(ele.innerText);
                    });
                    console.log(arr);
                    dt.details = arr;
                    dt.images = products;
                  return dt;
                });           
                console.log(electronicData);

                await browser.close();
                })();      
        }          
    })
    //console.log(arr);
})
.catch(function (e) {
    console.log(e);
});

