const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',


    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FALIED: 'CREATE_USER_FALIED',

    EDIT_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    EDIT_USER_FALIED: 'CREATE_USER_FALIED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FALIED: 'DELETE_USER_FALIED',

    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILED: 'FETCH_TOP_DOCTOR_FAILED',

    FETCH_ALL_DOCTOR_SUCCESS: 'FETCH_ALL_DOCTOR_SUCCESS',
    FETCH_ALL_DOCTOR_FAILED: 'FETCH_ALL_DOCTOR_FAILED',

    SAVE_DETAIL_DOCTOR_SUCCESS: 'SAVE_DETAIL_DOCTOR_SUCCESS',
    SAVE_DETAIL_DOCTOR_FAILED: 'SAVE_DETAIL_DOCTOR_FAILED',

    GET_DETAIL_DOCTOR_SUCCESS: 'GET_DETAIL_DOCTOR_SUCCESS',
    GET_DETAIL_DOCTOR_FAILED: 'GET_DETAIL_DOCTOR_FAILED',

    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: 'FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS',
    FETCH_ALLCODE_SCHEDULE_TIME_FAILED: 'FETCH_ALLCODE_SCHEDULE_TIME_FAILED',

    SAVE_BULK_SCHEDULE_SUCCESS: 'SAVE_BULK_SCHEDULE_SUCCESS',
    SAVE_BULK_SCHEDULE_FAILED: 'SAVE_BULK_SCHEDULE_FAILED',

    GET_DOCTOR_SCHEDULE_SUCCESS: 'GET_DOCTOR_SCHEDULE_SUCCESS',
    GET_DOCTOR_SCHEDULE_FAILED: 'GET_DOCTOR_SCHEDULE_FAILED',

    GET_PRICE_SUCCESS: 'GET_PRICE_SUCCESS',
    GET_PRICE_FAILED: 'GET_PRICE_FAILED',

    GET_PAYMENT_SUCCESS: 'GET_PAYMENT_SUCCESS',
    GET_PAYMENT_FAILED: 'GET_PAYMENT_FAILED',

    GET_PROVINCE_SUCCESS: 'GET_PROVINCE_SUCCESS',
    GET_PROVINCE_FAILED: 'GET_PROVINCE_FAILED',

    GET_DOCTOR_INFOR_SUCCESS: 'GET_DOCTOR_INFOR_SUCCESS',
    GET_DOCTOR_INFOR_FAILED: 'GET_DOCTOR_INFOR_FAILED',

    GET_PROFILE_DOCTOR_SUCCESS: 'GET_PROFILE_DOCTOR_SUCCESS',
    GET_PROFILE_DOCTOR_FAILED: 'GET_PROFILE_DOCTOR_FAILED',

})

export default actionTypes;