import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/login', { email, password });
}
const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
}
const deleteUserService = (userId) => {

    return axios.delete('/api/delete-user', {
        data: {
            id: userId
        }
    });
}
const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}
const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}
const saveDetailDoctor = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}
const getDetailInforDoctor = (id) => {
    return axios.get(`/api/get-detail-infor-doctor/${id}`);
};
const saveBulkSchedule = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}
const getDoctorScheduleService = (doctorId, date) => {
    return axios.get(`/api/get-schedule-of-day-doctor`, {
        params: {
            doctorId,
            date,
        },
    });
};

const getDoctorInfor = (id) => {
    return axios.get(`/api/get-doctor-infor/${id}`);
};

const getProfileDoctor = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?id=${id}`)
}
export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctor,
    getDetailInforDoctor,
    saveBulkSchedule,
    getDoctorScheduleService,
    getDoctorInfor,
    getProfileDoctor
};