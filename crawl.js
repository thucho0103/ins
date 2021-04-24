const Post = require('./models/post.model');

const cheerio = require('cheerio'),
    axios = require('axios'),
    url = `https://www.chotot.com/toan-quoc/mua-ban-do-dien-tu`;

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
        return arr.slice(0,1);
    })
    .then(array=>{         
        Post.find({}).then(function(data){
            console.log(data)  // Success
        }).catch(function(error){
            console.log(error)      // Failure
        });
        // Post.insertMany(array).then(function(){
        //     console.log("Data inserted")  // Success
        // }).catch(function(error){
        //     console.log(error)      // Failure
        // });
    })
    .catch(function (e) {
        console.log(e);
    });