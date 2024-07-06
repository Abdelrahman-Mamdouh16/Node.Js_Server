import ReservationModel from "../../../../DB/models/ReservationModel/Reservation.Model.js";
import DocModel from "../../../../DB/models/doctorModel/doctor.model.js";
import userModel from "../../../../DB/models/patientModel/patient.model.js";
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';


export const checkReservation = async (req, res) => {
    try {
        // console.log(req.body);
        const { doctorId, userId, date, timeStart, timeEnd } = req.body;
        const reservation = await ReservationModel.findOne({
            userId,
            doctorId,
            date,
            timeStart,
            timeEnd,
        });
        // console.log(reservation);
        if (!reservation) {
            return res.json({ success: false, message: 'Reservation not found' });
        }
        else {
            return res.json({ success: true, message: 'Reservation found successfully', result: reservation });
        }

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: `Internal server error :${error}` });
    }
}

export const createReservation = async (req, res) => {
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

            return res.json({ success: false, message: 'Date is required (status set to "pending")' });
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
                    <h3>first-come , required Reservation , first-served</h3>
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

