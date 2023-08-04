const nodemailer=require('nodemailer')

const mailManager=async(to,text,html,subject)=>{
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7b15f0304bf444",
          pass: "19e8674ac48c2a",
        },
      });
    
      await transport.sendMail({
        to: to,
        from: "info@expensetracker.com",
        text: text,
        html:html,
        subject:subject
      });
}
module.exports=mailManager