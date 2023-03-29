const http = require('http')
const server = require('./src/frameworks_drivers/server/server')
const sequelize = require('./src/frameworks_drivers/database/sequelize')
const cron = require('node-cron');
const async = require('async'),
moment = require('moment'),
request = require('request')
Q = require('q'),
_ = require('underscore');
const nodemailer = require("nodemailer");

//const nodemailer = require("nodemailer");
const { QueryTypes } = require('sequelize');
//const https = require('http')
//const { sample } = require('lodash');
const port = process.env.PORT || 3003
try {
    //connecting and syncing to the database
    sequelize.sync()
 } catch (error) {   
    console.log(error); 
    console.log('Could not connect to the database')
}
try {
     // creating express server
     const myserver = http.createServer(server)
     myserver.listen(port)
} catch (error) {
    console.log('failed to start the server')
}
cron.schedule('02 00 * * *', async function () {
     let date = moment().add(0, 'days').format('YYYY-MM-DD');
  
  console.log(date);
  
  const data = await sequelize.query(
    `select * from membership m inner join patients p on p.id = m.patient_id where date(m.expiry_date) ='${date}' and p.clinic_id !=1911 order by date(m.created_date) asc`,
    {
      bind: { status: 'active' },
      type: QueryTypes.SELECT
          }
  );
  console.log(data.length);
  for (let i = 0; i < data.length; i++) {
    console.log(data[i]);
    var deferred = Q.defer();

    console.log("Ramireddy.....")
    sendMail();
  // email alert to evaidya HUB team for Membership expiry
    function sendMail() {
      console.log("Ramireddy1.....")
       mailTransporter = nodemailer.createTransport({
        service: 'gmail',
          auth: {
          user: 'no-reply@evaidya.com',
          pass: 'ehealthaccess'
        }
      }) 
    };    
    let mailDetails = {
      from: '"Rupayee Vaidyam Clinic" <no-reply@evaidya.com>',
      to: 'rupayeevaidyam.1@evaidya.com',
      cc: 'dr.surender@evaidya.com',
      bcc: 'venkata.babu@evaidya.com, venkataramireddy.b@evaidya.com, arunkumar.p@evaidya.com, sasikumar.a@evaidya.com,riyazuddin.sk@evaidya.com',
      subject: `Membership Expired for ${data[i].name},${data[i].mobile} and Ra/0000/${data[i].id} on ${data[i].mem_exp_date}`, // Subject line
      text: `Hello Hub Team , \n\nBelow membership id is expired \n\nPatient Name: ${data[i].name} \n\nPatient Mobile No: ${data[i].mobile} \n\nPatient Membership-id: Ra/0000/${data[i].id},\n\nPatient UID: ${data[i].uid},\n\nPatient-id: ${data[i].id},\n\nPatient DOB: ${data[i].dob},\n\nPatient Membership-Expirey-Date: ${data[i].mem_exp_date},\n\nPatient E-mail Id: ${data[i].email} \n\nkindly followup with the user and renew the subscription to avail the services. \n\nBest Regards,\neVaidya`, // plain text body

    };

    // Sending Email
    mailTransporter.sendMail(mailDetails,
      function (err, data) {
        if (err) {
          console.log("Error Occurs", err);
        } else {
          console.log("Email sent successfully");
        }
      });
    
      // SMS alert for Membership expiry
    let message = "Dear Member" + data[i].membership_id + ", your subscription for RUPAYEE VAIDHYAM clinic will expire on Date" + data[i].mem_exp_date + ", kindly renew the subscription to avail the services. \n\evaidya.com";
    let url = `http://tra.bulksmshyderabad.co.in/websms/sendsms.aspx?userid=eVaidya&password=He2020@!&sender=EVAIDH&mobileno=${data[i].mobile.trim()}&msg=${message}&peid=1201161373776965113&tpid=1207166808181982174`
      request.get(url, (err, res, body) => {
        console.log(body);
        console.log('---------------- evry message ------------');
        deferred.resolve(body);
        return deferred.promise;
            })
    
  }
});