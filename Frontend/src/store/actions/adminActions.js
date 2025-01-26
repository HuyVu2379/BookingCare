import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserService, getAllUsers,
    deleteUserService, editUserService, getTopDoctorHomeService,
    getAllDoctors, saveDetailDoctor, getDetailInforDoctor, saveBulkSchedule,
    getDoctorScheduleService, getDoctorInfor, getProfileDoctor
} from '../../services/userService'
import { toast } from "react-toastify"
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (error) {
            dispatch(fetchGenderFailed());
            console.log('fectchGenderStart err', error)
        }
    };

};
export const fetchTimeSchedule = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS })
            let res = await getAllCodeService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    schedule: res.data
                });
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                });
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            });
            console.log('fetch time schedule err', error)
        }
    };

};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (error) {
            dispatch(fetchPositionFailed());
            console.log('fectchPositionStart err', error)
        }
    };

};

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (error) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed err', error)
        }
    };

};

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create new user succed!")
                dispatch(createUserSuccess(res.data));
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Create new user failed!")
                dispatch(createUserFailed());
            }
        } catch (error) {
            dispatch(createUserFailed());
            console.log('Save user failed', error)
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const createUserFailed = () => ({
    type: actionTypes.CREATE_USER_FALIED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            console.log("check data getAllUser: ", res);
            if (res.users && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            }
            else {
                toast.error("Fetch all user error!")
                dispatch(fetchAllUsersFailed());
            }
        } catch (error) {
            dispatch(fetchAllUsersFailed());
            console.log('Fetch all user error!', error)
        }
    };

};

export const fetchAllUsersSuccess = (dataInput) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data: dataInput
})

export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete succeed!")
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Delete failed!")
                dispatch(deleteUserFailed());
            }
        } catch (error) {
            console.log('Save user failed', error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS

})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update user succeed!")
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Update a user failed!")
                dispatch(editUserFailed());
            }
        } catch (error) {
            toast.error("Update a user failed!")
            dispatch(editUserFailed())
            console.log('Save user failed', error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FALIED
})
export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService(4);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('FETCH TOP DOCTORS FAILED:', error);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}
export const fetchAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            console.log("Check doctor: ", res);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDoctors: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('FETCH ALL DOCTORS FAILED:', error);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}
export const saveDetailDoctorService = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctor(data);
            if (res && res.errCode === 0) {
                toast.success("Save detail doctor succeed")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else {
                toast.error("Save detail doctor failed")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('SAVE DETAIL DOCTORS FAILED:', error);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}
export const fetchDetailDoctor = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
                    doctorDetail: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('GET DETAIL DOCTORS FAILED:', error);
            dispatch({
                type: actionTypes.GET_DETAIL_DOCTOR_FAILED
            })
        }
    }
}

export const saveBulkScheduleDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let schedules = await saveBulkSchedule(data);
            console.log("check data: ", schedules);

            if (schedules && schedules.errCode === 0) {
                dispatch({
                    type: actionTypes.SAVE_BULK_SCHEDULE_SUCCESS,
                    data: schedules
                });
                toast.success("Schedule saved successfully!");
            } else {
                // Handle backend errors
                console.error('Error from API:', schedules.errMessage);
                toast.error(schedules?.errMessage || "Something went wrong!");
                dispatch({
                    type: actionTypes.SAVE_BULK_SCHEDULE_FAILED
                });
            }
        } catch (error) {
            // Log and dispatch error action for debugging
            console.error('Save bulk schedule failed:', error);
            toast.error("Failed to save schedule!");
            dispatch({
                type: actionTypes.SAVE_BULK_SCHEDULE_FAILED
            });
        }
    };
};
export const getDoctorSchedule = (doctorId, date) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorScheduleService(doctorId, date);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DOCTOR_SCHEDULE_SUCCESS,
                    doctorSchedule: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_DOCTOR_SCHEDULE_FAILED
                })
            }
        } catch (error) {
            console.log('GET DOCTOR SCHEDULE FAILED:', error);
            dispatch({
                type: actionTypes.GET_DOCTOR_SCHEDULE_FAILED
            })
        }
    }
}
export const fetchPriceSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PRICE");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PRICE_SUCCESS,
                    priceList: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PRICE_FAILED
                })
            }
        } catch (error) {
            console.log("check error: ", error);

            dispatch({
                type: actionTypes.GET_PRICE_FAILED,
            })
        }
    }
}

export const fetchPaymentSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PAYMENT");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PAYMENT_SUCCESS,
                    paymentList: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PAYMENT_FAILED
                })
            }
        } catch (error) {
            console.log("check error: ", error);

            dispatch({
                type: actionTypes.GET_PAYMENT_FAILED,
            })
        }
    }
}

export const fetchProvinceSuccess = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PROVINCE");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PROVINCE_SUCCESS,
                    provinceList: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PROVINCE_FAILED
                })
            }
        } catch (error) {
            console.log("check error: ", error);

            dispatch({
                type: actionTypes.GET_PROVINCE_FAILED,
            })
        }
    }
}


export const fetchDoctorInfor = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDoctorInfor(id);
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_DOCTOR_INFOR_SUCCESS,
                    doctorInfor: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_DOCTOR_INFOR_FAILED
                })
            }
        } catch (error) {
            console.log("check error: ", error);
            dispatch({
                type: actionTypes.GET_DOCTOR_INFOR_FAILED,
            })
        }
    }
}

export const fetchProfileDoctor = (id) => {
    return async (dispatch, getState) => {
        console.log("check id from admin action: ", id);

        try {
            let res = await getProfileDoctor(id);
            console.log("check data from admin action: ", res);

            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.GET_PROFILE_DOCTOR_SUCCESS,
                    doctorProfile: res.data
                })
            }
            else {
                dispatch({
                    type: actionTypes.GET_PROFILE_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log("check error: ", error);
            dispatch({
                type: actionTypes.GET_PROFILE_DOCTOR_FAILED,
            })
        }
    }
}