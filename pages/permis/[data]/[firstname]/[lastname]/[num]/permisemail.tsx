import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { connectionDB } from "../../../../../../config/database";
import Navbar from "../../../../../../components/navbar";
import nodemailer from "nodemailer";
import { db } from "../../../../../../config/firebase";

const NoEmploye: React.FC = (props) => {
  const router = useRouter();
  router.push("/dashboard");
  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="mt-6 font-bold flex justify-center">LOADING ...</div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    console.log(context.params);
    
    const firstName = context.params.firstname;
    const lastName = context.params.lastname;
    const numAgent = context.params.num;
    let data = context.params.data;
    data = JSON.parse(context.params.data);
    data = data[0];
    const numPermis = data.numpermis;
    const dateExpiration = data.dateexpiration;
    const numEntre = data.numentre;

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Site web SecuriteCLB.com", <siteweb@securiteclb.com> ', // sender address
      to: "rhd@securiteclb.com", // list of receivers
      subject: `Information sur le renouvellement du permis de ${firstName} ${lastName}`, // Subject line
      text: `Numero d'agent : ${numAgent} - Nouveau numéro de permis d'agent : ${numPermis} - Nouvelle date d'expiration : ${dateExpiration} - Nouveau numéro date d'entrée en vigueur : ${numEntre}`  // plain text body
    });

    console.log("Message sent: %s", info.messageId);

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return {
      props: {},
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default NoEmploye;
