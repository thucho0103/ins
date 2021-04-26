
const cheerio = require('cheerio'),
    axios = require('axios'),
    url = `https://xe.chotot.com/mua-ban-xe`;

axios.get(url)
    .then((response) => {
        let $ = cheerio.load(response.data);
        var arr = [];
        //console.log($('.wrapperAdItem___2woJ1 > a > div > div > div > noscript').text());    
        $('.ctAdlisting > ul > li > a').each(function (i, e) {                        
            //console.log($(e).attr('href'));
            if(i==1){
                getDetail($(e).attr('href'));
            }
            //console.log(imgtag);
            // const title = $(e).find('.adTitle___3SoJh').text();
            // const price = $(e).find('.adPriceNormal___puYxd').text();        
            // var post = {
            //     img :img.slice(img,img.indexOf('"')),
            //     title :title,
            //     price :price,
            // }  
            // arr.push(post);           
        })
        //console.log(arr);
    })
    .catch(function (e) {
        console.log(e);
    });

function getDetail(params) {
    axios.get('https://xe.chotot.com'+params)
    .then((response) => {
        let $ = cheerio.load(response.data);  
        $('.slick-slide > div > div > div > div').each(function (i, e) {              
            //console.log($(e).html().slice($(e).html().indexOf('img')-1)); 
            let img = cheerio.load($(e).html().slice($(e).html().indexOf('img')-1));
            //console.log(img('img').attr('src'));  
        });

        $('h1').each(function (i, element) {              
            //console.log($(element).text());  
        });
        
        $('.styles__Price-sc-14jh840-4').each(function (i, element) {              
            console.log($(element).text());  
        });
        $('.styles__DescriptionAd-sc-14jh840-7').each(function (i, element) {              
            console.log($(element).text());  
        });
        $('.media-body').each(function (i, element) {              
            console.log($(element).text());  
        });
        
    })
    .catch(function (e) {
        console.log(e);
    });
}