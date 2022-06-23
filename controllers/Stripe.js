var Secret_Key = 'sk_test_51L5DYnJY45Iwosw61GZWIMwcTlNpNrmYQd3oN0dKLr0BCd1fdj8VZJH7EPIS8CS51XiJknJl1BUNyqB8lOOgOocL003FlSX1NY'

const stripe = require('stripe')(Secret_Key)

const get = (req, res) => {
    res.render('buy', {
    key: process.env.PUBLISHABLE_KEY
    })
}
 
const buy = (req, res) => {
 
    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gautam Sharma',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
        }
    })
    .then((customer) => {
 
        return stripe.charges.create({
            amount: 10000,    // Charing Rs 25
            description: 'Cla Computing Mermbership',
            currency: 'USD',
            customer: customer.id
        });
    })
    .then((charge) => {
        res.send("Success") // If no error occurs
    })
    .catch((err) => {
        res.send(err)    // If some error occurs
    });
}

module.exports = { get, buy };