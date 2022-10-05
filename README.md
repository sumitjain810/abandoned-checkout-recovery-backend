Prerequisites
1. Mongo Database with name "abandoned-checkout-recovery-db"
(Database name can be configured through config/db.config.js)

Steps
1. npm install
2. nodemon index.js

Notification can be configured using constants/constants.js
(Here, we are only printing a log instead of sending actual notification)

Sample Request
URL: localhost:8080/cart/abandoned
Request Type: POST
Body: {
    "userId": "123"
}

Response
{
    "_id": "633df5ae7c8ae6b8c5d0a27e",
    "userId": "123",
    "status": "abandoned",
    "notificationCount": 2,
    "createdAt": "2022-10-05T21:22:54.716Z",
    "updatedAt": "2022-10-05T21:25:56.585Z",
    "__v": 0
}