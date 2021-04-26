const Post = require('./models/post.model');

const cheerio = require('cheerio'),
    axios = require('axios'),
    url = `https://xe.chotot.com/mua-ban-xe`;

axios.get(url)
    .then((response) => {
        let $ = cheerio.load(response.data);
        var arr = [];
        //console.log($('.wrapperAdItem___2woJ1 > a > div > div > div > noscript').text());    
        $('.wrapperAdItem___2woJ1 > a').each(function (i, e) {   
            
            const imgtag = $(e).find('div > div > div > noscript').text();
            const img = imgtag.slice($(e).text().indexOf('src=')+5);
            //console.log(img.slice(img,img.indexOf('"')));

            //console.log(imgtag);

            const title = $(e).find('.adTitle___3SoJh').text();
            const price = $(e).find('.adPriceNormal___puYxd').text();        
            var post = {
                img :img.slice(img,img.indexOf('"')),
                title :title,
                price :price,
            }  
            arr.push(post);           
        })
        console.log(arr);
    })
    .catch(function (e) {
        console.log(e);
    });