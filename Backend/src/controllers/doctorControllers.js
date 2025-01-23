import doctorService from '../services/doctorService'
let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit)
        return res.status(200).json(response)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: -1,
            message: 'Error from server...'
        })
    }
}
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getALlDoctors();
        return res.status(200).json(doctors)

    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.saveDetailInforDoctor(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let getDetailInforDoctor = async (req, res) => {
    try {
        let id = req.params.id;
        let doctor = await doctorService.getDetailInforDoctorService(id);
        return res.status(200).json(doctor)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let bulkCreateSchedule = async (req, res) => {
    try {
        let schedules = await doctorService.bulkCreateScheduleService(req.body);
        return res.status(200).json(schedules);
    } catch (error) {
        return res.status(500).json({
            errCode: -1,
            errMessage: "Error from server"
        });
    }
}
let getScheduleByDoctorId = async (req, res) => {
    try {
        let { doctorId, date } = req.query;
        // Kiểm tra thiếu tham số
        if (!doctorId || !date) {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters: doctorId or date",
            });
        }
        const normalizedDate = new Date(parseInt(date));
        normalizedDate.setHours(0, 0, 0, 0);
        let schedules = await doctorService.getDoctorScheduleService(doctorId, normalizedDate);

        return res.status(200).json({
            errCode: 0,
            errMessage: "Fetch doctor schedule succeed!",
            data: schedules,
        });
    } catch (error) {
        console.error("Error fetching doctor schedule:", error);

        return res.status(500).json({
            errCode: -1,
            errMessage: "Failed to get schedule for the doctor",
            errorDetail: error.message,
        });
    }
};

let getDoctorInfor = async (req, res) => {
    try {
        let id = req.params.id;
        let doctorInfor = await doctorService.getDoctorInforService(id);
        return res.status(200).json(doctorInfor)
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctors: getAllDoctors,
    postInforDoctor: postInforDoctor,
    getDetailInforDoctor: getDetailInforDoctor,
    bulkCreateSchedule: bulkCreateSchedule,
    getScheduleByDoctorId: getScheduleByDoctorId,
    getDoctorInfor: getDoctorInfor
}