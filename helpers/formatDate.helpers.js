
let getDateString = function (Date) {
    

    var dd = check(Date.getDate());
    var MM = check(Date.getMonth()+1); 
    var yyyy = Date.getFullYear();
    var HH =  check(Date.getHours());
    var mm =  check(Date.getMinutes()); 
    
    return dd+'-'+MM+'-'+yyyy+' '+HH+':'+mm;
}

function check(params) {
    if(params < 10){
        params= '0'+params;
    }
    return params;
}

module.exports = {
    getDateString:getDateString
}