# Shop API

Node API simulating a shop where a Merchant can List, Create, Update, Delete products for the sellers to buy.

It has a cart/order system per Customer where they can Add, Update, Checkout the products that they like.

This shop simulation is integrated to Paymaya Checkout System which allows the customer to pay using thier card or maya wallet

---
## Requirements

For development, you will only need Node.js and a node global package, installed in your environement.

## Install

    $ git clone https://github.com/Ezzzzzzy/shop-api.git
    $ cd shop-api
    $ npm install

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```
ENV=dev
PORT=8080
JWT_KEY=JWTKEYTHATYOUSHOULDUSEFORSHOPAPI
MONGOTESTURI=mongodb+srv://shopDBuser:admintestUser@cluster0.mqubs.mongodb.net/salesDB?retryWrites=true&w=majority
MONGOURI=mongodb+srv://shopDBuser:admintestUser@cluster0.mqubs.mongodb.net/salesDB?retryWrites=true&w=majority
```

## Running the project

    $ npm run dev

## Testing the project

    $ npm run test

## Users

### Register a Merchant/Customer or login using existing accounts

| Email              | Password         | Role     |
|--------------------|------------------|----------|
| merchant@gmail.com | merchantpassword | Merchant |
| customer@gmail.com | customerpassword | Customer |

#### As Merchant
You can Get, Add, Update, Delete products

#### As Customer
You can Create,Edit and Checkout your Ordered Items

## API Documentation
Access api documentation [Here](https://documenter.getpostman.com/view/2319149/Uz5CLdQ7)

## Test Cards
In the checkout page you can use test cards provided by maya [Here](https://developers.maya.ph/reference/sandbox-credentials-and-cards#sandbox-cards)
