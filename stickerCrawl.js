const axios = require('axios');
const url = `http://beta.gateway.techres.vn:8080/api/queues`;

var data = {
    "params": {
       
    },
    "os_name": "aloline_ios",
    "project_id": 1485,
    "is_production_mode": 0,
    "group_id" : "609651e6978999544f6832e0",
    "request_url": "/api/stickers/category",
    "http_method": 0
}

axios.post(url, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlX3VzZXIiOjEsInVzZXJuYW1lIjoiMDM5MjY4NjM0MCIsInBhc3N3b3JkIjoiMTEyMjMzIiwidXNlcl9pZCI6MTI2NywiaWF0IjoxNjE5OTY1NDcyfQ.nY2mWfZZBZUAYZW74ruQ8Na6neYXngXQjWficL7fwfg'
    },
    data
})      
.then((response) => {
    console.log(response.data);
})
.catch((error) => {
    console.log(error);
})
