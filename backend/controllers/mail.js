const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')
sgMail.setApiKey(process.env.SENDGRID_API)


exports.confirmOrder =(req, res)=>{

    const {_id ,email, username} = req.user;
    
    const token = jwt.sign({_id, email, username} ,process.env.JWT_SECRET,{expiresIn:'1d'})
    const emailData = {
        to: email,
        from: process.env.EMAIL_FROM,
        subject: `BOOKSTORE confirm order email`,
        html: `
        <h4>Please use the following link to activate your account</h4>
        
        <p>${process.env.CLIENT_URL}/auth/oreder/confirm/${token}</p>
        <hr/>
        <p>This email contain sensitive information</p>
        <p>http</p>
        `
    }

    sgMail.send(emailData)
            .then(sent => {
                return res.json({
                    message: `Email has been sent to ${email}, please follow the instruction`
                })
            }).catch(err => {
                console.log(err);
            })
}