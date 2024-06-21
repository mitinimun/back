import nodeMailer from "nodemailer";

const defaultEmailData = { from: "noreply@node-react.com" };

export const sendEmail = (emailData) => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "a.sherchankv19@gmail.com",
      pass: "ailz mrpr hfrw mixo",
    },
  });
  return transporter
    .sendMail(emailData)
    .then((info) => console.log(`Message sent: ${info.response}`))
    .catch((err) => console.log(`Problem sending email: ${err}`));
};
