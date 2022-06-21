const sgMail = require("@sendgrid/mail");

require("dotenv").config();

const orderConfirmed = (orderInfo) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
        to:`${orderInfo.email}`,
        from: "oscar.niklasson941@gmail.com",
        subject: "Order confirmed",
        text: "Your order has been confirmed and is being packed",
        html: `<h1 style="color: red; text-transform: uppercase"> Howdy ${orderInfo.firstname}, your order has been confirmed!</h1>
        <p>Thank you for shopping with us, we hope you will return soon!</p>`,
    };
    sgMail
    .send(msg)
    .then(() => {
        console.log("Email sent");
    })
    .catch((error) => {
        console.error(error);
    });
}

const orderFailed = (orderInfo) => {
    sgMail.setApiKey(process.env.SENDGRID_KEY);
    const msg = {
        to:`${orderInfo.email}`,
        from: "oscar.niklasson941@gmail.com",
        subject: "Order Failed",
        text: "FAILED",
        html: `FAILED`,
    };
    sgMail
    .send(msg)
    .then(() => {
        console.log("Email sent");
    })
    .catch((error) => {
        console.error(error);
    });
}

module.exports = { orderFailed };
module.exports = { orderConfirmed };