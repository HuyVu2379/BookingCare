import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingUser: false,
    genders: [],
    roles: [],
    position: [],
    arrUsers: [],
    topDoctors: [],
    allDoctors: [],
    detailDoctor: {},
    doctorInfor: {},
    schedule: [],
    schedules: [],
    priceList: [],
    paymentList: [],
    provinceList: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_START:
            state.isLoadingUser = true;
            let copyState = { ...state };
            return copyState;

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.isLoadingUser = false;
            state.arrUsers = action.data;
            return { ...state }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.isLoadingUser = false;
            state.arrUsers = [];
            return { ...state }

        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return { ...state }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors = [];
            return { ...state }

        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.dataDoctors;
            return { ...state }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors = [];
            return { ...state }

        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.detailDoctor = action.doctorDetail;
            return { ...state }
        case actionTypes.GET_DETAIL_DOCTOR_FAILED:
            state.detailDoctor = {};
            return { ...state }

        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.schedule = action.schedule;
            return { ...state }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.schedule = {};
            return { ...state }

        case actionTypes.SAVE_BULK_SCHEDULE_SUCCESS:
            return { ...state }
        case actionTypes.SAVE_BULK_SCHEDULE_FAILED:
            return { ...state }

        case actionTypes.GET_DOCTOR_SCHEDULE_SUCCESS:
            state.schedules = action.doctorSchedule;
            return { ...state }
        case actionTypes.GET_DOCTOR_SCHEDULE_FAILED:
            state.schedules = {};
            return { ...state }
        //
        case actionTypes.GET_PRICE_SUCCESS:
            state.priceList = action.priceList;
            return { ...state }
        case actionTypes.GET_PRICE_FAILED:
            state.priceList = [];
            return { ...state }

        case actionTypes.GET_PAYMENT_SUCCESS:
            state.paymentList = action.paymentList;
            return { ...state }
        case actionTypes.GET_PAYMENT_FAILED:
            state.paymentList = [];
            return { ...state }

        case actionTypes.GET_PROVINCE_SUCCESS:
            state.provinceList = action.provinceList;
            return { ...state }
        case actionTypes.GET_PROVINCE_FAILED:
            state.provinceList = [];
            return { ...state }

        case actionTypes.GET_DOCTOR_INFOR_SUCCESS:
            state.doctorInfor = action.doctorInfor;
            return { ...state }
        case actionTypes.GET_DOCTOR_INFOR_FAILED:
            state.doctorInfor = {};
            return { ...state }
        default:
            return state;
    }
}

export default adminReducer;