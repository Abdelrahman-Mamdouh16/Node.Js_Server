import ReservationModel from "../../../../DB/models/ReservationModel/Reservation.Model.js";
import DocModel from "../../../../DB/models/doctorModel/doctor.model.js";
import userModel from "../../../../DB/models/patientModel/patient.model.js";
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import Stripe from 'stripe';
import doctorOnTelehealth from './../../../../DB/models/doctorModelOnTelehealth/doctorOnTelehealth.model.js';
import ReservationOnTelehealthModel from "../../../../DB/models/ReservationOnTelehealthModel/ReservationOnTelehealth.Model.js";
const stripe = new Stripe('sk_test_51PbOY3AwDFvErNViudw9pFMxaUkt9FZbBBiQYwQfHupVn3Y4umjZuViFBevMHCAm6mGGEkoqk7SUwlPPkQdkVkLW00tUGDQsiN');

export const checkReservationOnSide = async (req, res) => {
    try {
        // console.log(req.body);
        const { doctorId, userId, date, timeStart, timeEnd, status } = req.body;
        const reservation = await ReservationModel.findOne({
            userId,
            doctorId,
            date,
            timeStart,
            timeEnd,
            status
        });
        // console.log(reservation);
        if (!reservation) {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        else {
            return res.json({ success: true, message: 'Reservation found successfully' });
        }

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
}

export const createReservationOnSide = async (req, res) => {
    try {
        console.log(req.body); // Log request body for debugging

        // Validate and sanitize required fields
        const { userId, doctorId, date, status, timeStart, timeEnd } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: 'Invalid or missing user ID' });
        }
        if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.json({ success: false, message: 'Invalid or missing doctor ID' });
        }
        if (!date) {
            return res.json({ success: false, message: 'Date is required' });
        }

        if (!status) {
            // Handle missing status gracefully (e.g., set a default value)
            status = "pending"; // Set a default value

            return res.json({ success: false, message: 'status is required (status set to "pending")' });
        }

        if (!timeStart) {
            return res.json({ success: false, message: 'Time start is required' });
        }

        if (!timeEnd) {
            return res.json({ success: false, message: 'Time end is required' });
        }
        const [user, doctor] = await Promise.all([
            userModel.findById(userId),
            DocModel.findById(doctorId),
        ]);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        // Create reservation with sanitized data
        const reservation = new ReservationModel({
            userId: user._id,
            // userInfo:user,
            doctorId: doctor._id,
            // doctorInfo:doctor,
            date,
            status,
            timeStart,
            timeEnd,
        });

        await reservation.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "bedo.lela32@gmail.com",
                pass: "ekasgpofbqyvnmkj",
            },
        });
        const info = await transporter.sendMail({
            from: '"Abdelrahman Mamdouh" <bedo.lela32@gmail.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Booking Confirmation on Online Doctor app", // Subject line
            // text: "Hello world?", // plain text body
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email with Logo, Image, and Text</title>
  <style>
    /* General email styles */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    /* Container styles */
    .container {
      width: 600px; /* Adjust width as needed */
      margin: 0 auto; /* Center the container */
      background-color: #fff;
      padding: 20px;
    }

    .logo img {
      width: 200px; /* Adjust logo width */
      height: auto; /* Maintain aspect ratio */
    }

    /* Image styles */
    .image {
      display: block;
      margin-bottom: 20px;
    }

    .image img {
      width: 100%; /* Make image responsive */
      height: auto; /* Maintain aspect ratio */
    }

    /* Text styles */
    .text {
      font-size: 16px;
      line-height: 1.5;
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">

    <div class="image">
      <img src="https://res.cloudinary.com/dvr3bltmg/image/upload/v1720020782/TopOffers/a0kf3pdiolysettql2kr.png" alt="Image">
    </div>

    <div class="text">
        <h2> Dear ${user.name},</h2>
                    <p>Your booking has been confirmed!</p> 
                    <p>Details:</p>
                    <p>- Doctor: ${doctor.name}</p>
                    <p>- Date: ${reservation.date}</p>
                    <p>- Time: ${reservation.timeStart} - ${reservation.timeEnd}</p>
                    <h3>first-come  , first-served</h3>
                    <p>To show this Reservation or Delete it you can check this link : 
                    <br/>
                    https://online-doc-app.vercel.app/Account/getAppointment/${reservation._id}</p>
                    <p>Thank you for choosing our services!</p>
                    Sincerely,
                    The Booking Team of Online Doctor app 
                    <h3>BY : Abdelrahman Mamdouh</h3>
                    </div>
  </div>
</body>
</html>
`

            , // html body
        });

        return res.json({ success: true, message: 'Reservation created successfully' });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error ${error}` });
    }
};

export const getAllReservation = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await ReservationModel.find({ userId });

        if (!reservations) {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        if (reservations.length === 0) {
            return res.json({ success: false, message: 'Not found Reservation' });
        }

        const reservationsWithDoctorDataPromises = reservations.map(async (reservation) => {
            const doctor = await DocModel.findById(reservation.doctorId);
            const { name, description, area, city } = doctor
            return { reservation, doctorData: { name, description, area, city } };
        });

        const reservationsWithDoctorData = await Promise.all(reservationsWithDoctorDataPromises);

        return res.json({ success: true, message: 'Reservation found successfully', result: reservationsWithDoctorData });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(_id);
        const reservation = await ReservationModel.findById(_id);

        if (!reservation) {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        // const reservationsWithDoctorDataPromises = reservation.map(async (reservation) => {
        const doctor = await DocModel.findById(reservation.doctorId);
        const { name, description, area, city } = doctor
        // return ;
        // });

        const reservationsWithDoctorData = { reservation, doctorData: { name, description, area, city } };
        return res.json({ success: true, message: 'Reservation found successfully', result: reservationsWithDoctorData });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
};

export const deleteReservation = async (req, res) => {
    try {
        // console.log(req);
        const { _id } = req.params;
        const reservation = await ReservationModel.findById(_id);
        // console.log(reservation);
        if (!reservation) {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        if (reservation.status == 'deleted') {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        await reservation.updateOne({ status: 'deleted' })
        await reservation.save()
        return res.json({ success: true, message: 'Reservation deleted successfully' });


    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
};

export const checkReservationOnTelehealth = async (req, res) => {
    try {
        // console.log(req.body);
        const { doctorId, userId, date, timeStart, timeEnd, status } = req.body;
        const reservation = await ReservationOnTelehealthModel.findOne({
            userId,
            doctorId,
            date,
            timeStart,
            timeEnd,
            status
        });
        // console.log(reservation);
        if (!reservation) {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        else {
            return res.json({ success: true, message: 'Reservation found successfully' });
        }

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
};

export const createCheckoutSessionOnTelehealth = async (req, res, next) => {
    try {
        const { doctor, userId } = req.body
        const user = await userModel.findById(userId)
        const Doctor = await DocModel.findById(doctor._id)

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'egp',
                        unit_amount: req.body.cost * 100,
                        product_data: {
                            name: user.name,
                            description: `Doctor : ${doctor.name} , On Telehealth Consultation`,
                        },
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://online-doc-app.vercel.app/reservation/Thank-You`,
            cancel_url: `https://online-doc-app.vercel.app/`,
            customer_email: user.email,
            client_reference_id: user._id

        });
        if (!session)
            return res.json({ success: false, message: 'The Checkout Session not created' });
        else {
            return res.json({ success: true, message: 'The Checkout Session is created', result: session });
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
};

export const createReservationOnTelehealth = async (req, res) => {
    try {
        console.log(req.body); // Log request body for debugging

        // Validate and sanitize required fields
        const { userId, doctorId, date, status, timeStart, timeEnd } = req.body;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: 'Invalid or missing user ID' });
        }
        if (!doctorId || !mongoose.Types.ObjectId.isValid(doctorId)) {
            return res.json({ success: false, message: 'Invalid or missing doctor ID' });
        }
        if (!date) {
            return res.json({ success: false, message: 'Date is required' });
        }

        if (!status) {
            // Handle missing status gracefully (e.g., set a default value)
            status = "pending"; // Set a default value

            return res.json({ success: false, message: 'status is required (status set to "pending")' });
        }

        if (!timeStart) {
            return res.json({ success: false, message: 'Time start is required' });
        }

        if (!timeEnd) {
            return res.json({ success: false, message: 'Time end is required' });
        }
        const [user, doctor] = await Promise.all([
            userModel.findById(userId),
            doctorOnTelehealth.findById(doctorId),
        ]);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (!doctor) {
            return res.json({ success: false, message: 'Doctor not found' });
        }

        // Create reservation with sanitized data
        // const where
        const reservation = new ReservationOnTelehealthModel({
            userId: user._id,
            doctorId: doctor._id,
            date,
            status,
            timeStart,
            timeEnd,
            where: 'On Telehealth Call'
        });

        await reservation.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "bedo.lela32@gmail.com",
                pass: "ekasgpofbqyvnmkj",
            },
        });
        const info = await transporter.sendMail({
            from: '"Abdelrahman Mamdouh" <bedo.lela32@gmail.com>', // sender address
            to: `${user.email}`, // list of receivers
            subject: "Booking Confirmation on Online Doctor app", // Subject line
            // text: "Hello world?", // plain text body
            html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email with Logo, Image, and Text</title>
          <style>
            /* General email styles */
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }

            /* Container styles */
            .container {
              width: 600px; /* Adjust width as needed */
              margin: 0 auto; /* Center the container */
              background-color: #fff;
              padding: 20px;
            }

            .logo img {
              width: 200px; /* Adjust logo width */
              height: auto; /* Maintain aspect ratio */
            }

            /* Image styles */
            .image {
              display: block;
              margin-bottom: 20px;
            }

            .image img {
              width: 100%; /* Make image responsive */
              height: auto; /* Maintain aspect ratio */
            }

            /* Text styles */
            .text {
              font-size: 16px;
              line-height: 1.5;
              color: #333;
            }
          </style>
        </head>
        <body>
          <div class="container">

            <div class="image">
              <img src="https://res.cloudinary.com/dvr3bltmg/image/upload/v1720020782/TopOffers/a0kf3pdiolysettql2kr.png" alt="Image">
            </div>

            <div class="text">
                <h2> Dear ${user.name},</h2>
                            <p>Your booking has been confirmed!</p> 
                            <p>Details:</p>
                            <p>- Doctor: ${doctor.name}</p>
                            <p>- Date: ${reservation.date}</p>
                            <p>- Time: ${reservation.timeStart} - ${reservation.timeEnd}</p>
                            <h3>On Telehealth Call</h3>
                            <p>To show this Reservation or Delete it you can check this link : 
                            <br/>
                            https://online-doc-app.vercel.app/Account/getAppointment/${reservation._id}</p>
                            <p>Thank you for choosing our services!</p>
                            Sincerely,
                            The Booking Team of Online Doctor app 
                            <h3>BY : Abdelrahman Mamdouh</h3>
                            </div>
          </div>
        </body>
        </html>
        `

            , // html body
        });

        return res.json({ success: true, message: 'Reservation created successfully' });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error ${error}` });
    }
};