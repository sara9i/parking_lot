const throwError = (message) => {
    throw new Error(message)
};

const validateCarNumber = (req) => {
    //validation checks
};


exports.park = async (req, res) => {
    try {
        validateCarNumber(req.body);
        // parking logic
        res.json({Response: true, Message: 'Car Parked Successfully.', Data: null});
    }
    catch(e){
        res.json({Response: false, Message: e.message, Data: null});
    }
};

exports.unpark = async (req, res) => {
    try {
        if (!req.params.slot_number) {
            res.json({Response: false, Message: 'Please Enter Your Appointment Id.', Data: null});
        } else {
            let Unpark = true;
            //unpark logic
            if (Unpark) {
                res.json({Response: true, Message: 'Parking Slot Emptied Successfully.', Data: null});
            } else {
                res.json({Response: false, Message: 'Parking Slot Not Found.', Data: null});
            }
        }
    } catch (e) {
        res.json({Response: false, Message: e.message, Data: null});
    }
};

exports.get_info = async (req, res) => {
    try {
        if (!req.params.slot_number) {
            res.json({Response: false, Message: 'Please Enter Your Appointment Id.', Data: null});
        } else {
            //slot and car information logic
            res.json({Response: true, Message: 'OK', Data: null});
        }
    } catch (e) {
        res.json({Response: false, Message: e.message, Data: null});
    }
};