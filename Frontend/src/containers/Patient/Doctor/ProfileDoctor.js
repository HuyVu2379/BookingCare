import React, { Component } from 'react';
import './ProfileDoctor.scss';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileDoctor: {},
            selectedSchedule: {}
        };
    }
    componentDidMount() {
        this.props.getProfileDoctor(this.props.doctorId)
        let profileDoctor = this.props.profileDoctor
        this.setState({
            profileDoctor: profileDoctor,
            selectedSchedule: this.props.selectedSchedule
        })
    }

    // Khi nhận được props mới từ Redux, cập nhật vào state của component
    componentDidUpdate(prevProps) {
        if (prevProps.profileDoctor !== this.props.profileDoctor) {
            let profileDoctor = { ...this.props.profileDoctor }; // Clone để tránh mutating dữ liệu Redux
            let imageBase64 = '';
            if (profileDoctor.image) {
                imageBase64 = Buffer.from(profileDoctor.image, 'base64').toString('binary');
            }
            profileDoctor.image = imageBase64;

            this.setState({
                profileDoctor,
            });
        }
    }

    getSelectedDate = (language) => {
        let selectedDate = this.props.selectedDate
        let dayOfWeek;
        if (language === LANGUAGES.VI) {
            dayOfWeek = moment(selectedDate).locale('vi').format("dddd - DD/MM/YYYY");
        }
        else {
            dayOfWeek = moment(selectedDate).locale('en').format("dddd - DD/MM/YYYY");
        }
        dayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        return dayOfWeek;
    }

    render() {
        let { profileDoctor, selectedSchedule } = this.state;
        console.log("check data: ", profileDoctor);
        console.log("check data schedule: ", selectedSchedule);
        let doctorData = profileDoctor?.doctorData || {}
        let language = this.props.language
        let dayOfWeek = this.getSelectedDate(language)
        return (
            <div className='profile-doctor-container'>
                <div className="intro-doctor">
                    <div>
                        <div
                            style={{ backgroundImage: `url(${profileDoctor.image || ''})` }}
                            className="content-left"
                        />

                    </div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI
                                ? <span>{profileDoctor.positionData?.valueVi}, {profileDoctor.lastName} {profileDoctor.firstName}</span>
                                : <span>{profileDoctor.positionData?.valueEn}, {profileDoctor.firstName} {profileDoctor.lastName}</span>}
                        </div>
                        <div className="down">{profileDoctor.markdown?.description || ''}</div>
                    </div>
                </div>
                <div>
                    <div className='px-5'><FormattedMessage id="patient.profile-doctor.examination" />: {language === LANGUAGES.VI ? selectedSchedule?.valueVi : selectedSchedule?.valueEn} <span className="vertical-line"></span> {dayOfWeek}</div>
                    <div className='px-5'>
                        <FormattedMessage id="patient.profile-doctor.price-value" />: {" "}
                        {language === LANGUAGES.VI ? (
                            <NumericFormat
                                value={doctorData.priceData?.valueVi}
                                displayType="text"
                                thousandSeparator
                                suffix=" VND"
                            />
                        ) : (
                            <NumericFormat
                                value={doctorData.priceData?.valueEn}
                                displayType="text"
                                thousandSeparator
                                suffix=" USD"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        profileDoctor: state.admin.profileDoctor
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getProfileDoctor: (id) => dispatch(actions.fetchProfileDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
