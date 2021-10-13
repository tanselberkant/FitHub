const logger = require('../logger')
const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
  logger.info(req.session.userID);
  res.status(200).render('index', { 
    page_name:'index'
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name:'about'
  });
};

exports.getGalleryPage = (req, res) => {
  res.status(200).render('gallery', {
    page_name:'gallery'
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name:'contact'
  });
};

exports.getServicesPage = (req, res) => {
  res.status(200).render('services', {
    page_name:'services'
  });
};

exports.getTrainersPage = async (req, res) => {
  const trainers = await User.find({role : 'trainer'}).populate('proficiency')

  res.status(200).render('trainer', {
    page_name : 'trainer',
    trainers
  })
};

exports.getLoginPage = (req,res) => {
  res.status(200).render('login');
}

exports.getRegisterPage = (req,res) => {
  res.status(200).render('register');
}

exports.sendEMail = async (req,res) => {
  try {
    const outputMessage = `
    <h1> Mail Details </h1>
    <ul>
      <li> Name : ${req.body.name} </li>
      <li> Email : ${req.body.email} </li>
      <li> Phone : ${req.body.phone} </li>
    </ul>
    <h1> Message </h1>
    <p>${req.body.message}</p>
    `;

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'berkantostanselix@gmail.com', // generated ethereal user
        pass: 'ofscosrmiplszleu', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fithub🏋️‍♂️" <berkantostanselix@gmail.com>', // sender address
      to: 'tanselberkant@gmail.com', // list of receivers
      subject: 'Fithub🏋️‍♂️ | New Message', // Subject line
      html: outputMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    req.flash("success","We received your message successfully")
    return res.status(200).redirect('/contact');
  } catch (error) {
    req.flash("error", 'Something bad happened !')
    return res.status(200).redirect('/contact')
  }
}