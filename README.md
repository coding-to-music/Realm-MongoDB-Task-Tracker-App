# Test using Data API with Atlas using Node and Axios

https://docs.mongodb.com/realm/tutorial/realm-app/#std-label-tutorial-task-tracker-create-realm-app

https://github.com/coding-to-music/Realm-MongoDB-Task-Tracker-App

Put your MongoDB Data API key in .env
```java
APIKEY=<your-api-key>
```

Run the following command to test the connection to MongoDB Atlas:
```java
npm run dev
```

## node main.js

```java
const dotenv = require('dotenv').config()
var APIKEY = process.env.APIKEY

var axios = require('axios');
var data = JSON.stringify({
    "collection": "Drudge",
    "database": "Scraping",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-vluta/endpoint/data/beta/action/findOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': APIKEY
    },
    data : data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
```

node main

```java
{"document":{"_id":"61e1fc8cdc2d3ae478dbbd89"}}
```

## node main2

```java
async function addEvent(req, callback) {
    var db = req.app.get('db');
    var event = req.body.event

    const app = await db.App.findOne({
        where: {
            owner_id: req.user_id,
        }
    });

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 6000)
    })

    let result = await promise;
}

console.log(addEvent);
```


node main2
```java
[AsyncFunction: addEvent]
```

## node main3
```java
// https://www.codeproject.com/Articles/5308531/NodeJS-await-is-only-valid-in-async-function

async function doSomethingAsync() {
    return Promise.resolve('Hello, World!');
}

(async function() {
    const response = await doSomethingAsync();
    console.log(response);
})();
```

node main3
```java
Hello, World!
```
