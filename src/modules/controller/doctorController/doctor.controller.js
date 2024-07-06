import DocModel from "../../../../DB/models/doctorModel/doctor.model.js";

// addNewDoc
export const addNewDoc = async (req, res) => {
    try {
        const registeredDoc = await DocModel.findOne({ email: req.body.email });
        if (registeredDoc) {
            res.json({ success: false, message: 'Doctor is already Exists' });
        } else {
            const newDoc = await DocModel.create(req.body)
            res.json({ success: true, message: 'Registration Successfully' });
        }
    } catch (error) {
        console.log(error);
        res.json({
            success: false, message: `Register Controller ${error.message}`,
        });
    }
}

// get Doctors for Search
export const DocSearch = async (req, res) => {
    try {

        // console.log(req.body);
        let { specialization, city, area, docName } = req.body;

        if (specialization === 'all-specialties')
            specialization = "";
        if (city === 'Egypt')
            city = "";
        if (area === 'All-Area')
            area = "";
        const query = {
            ...(specialization ? { specialization } : {}),
            ...(city ? { city } : {}),
            ...(area ? { area } : {}),
            ...(docName ? { name: { $regex: docName, $options: 'i' } } : {}),
        };



        const doctors = await DocModel.find(query);
        if (doctors.length > 0) {
            res.json({ success: true, message: 'doctors is found Successfully', result: doctors });
        } else {
            res.json({ success: false, message: 'doctors is not found' });
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false, message: `Register Controller ${error.message}`,
        });
    }
}

// get Doctor by id
export const getDocById = async (req, res) => {
    try {
        const doctor = await DocModel.findOne({ _id: req.params.id });
        if (!doctor) {
            return res.json({ success: false, message: 'doctor not found' })
        } else {
            return res.json({ success: true, message: 'doctor is found successfully', result: doctor })
        }

    } catch (error) {
        console.log(error);
        res.json({
            success: false, message: `Register Controller ${error.message}`,
        });
    }
}