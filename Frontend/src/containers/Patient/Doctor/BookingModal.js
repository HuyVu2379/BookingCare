import React, { Component } from 'react';
import './BookingModal.scss'; // Assuming the SCSS file exists
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import ProfileDoctor from './ProfileDoctor';
import { FormattedMessage } from 'react-intl';
class BookingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            gender: '',
            genders: [],
            dateOfBirth: '',
        };
    }
    componentDidMount() {
        this.props.getGenderStart(); // Gọi action để lấy dữ liệu genders
    }

    // Khi nhận được props mới từ Redux, cập nhật vào state của component
    componentDidUpdate(prevProps) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genders: this.props.genderRedux || []
            });
        }
    }

    // Handle input change for all fields
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    // Validate input fields
    validateInputs = () => {
        const { fullName, phoneNumber, email, address, dateOfBirth } = this.state;
        if (!fullName || !phoneNumber || !email || !address || !dateOfBirth) {
            alert('All fields are required!');
            return false;
        }
        // Further validations like email format, phone number length can be added here
        return true;
    }

    // Submit form data
    handleSubmit = () => {
        if (this.validateInputs()) {
            this.props.bookingSchedule(this.state); // Pass data to parent
            this.toggle(); // Close modal after submission
        }
    }
    toggle = () => {
        console.log("Toggle in BookingModal is called");
        if (this.props.toggleFromSchedule) {
            this.props.toggleFromSchedule(); // Gọi hàm cha từ props
        } else {
            console.log("toggleFromSchedule is not passed as a prop");
        }
    };

    render() {
        const { fullName, phoneNumber, email, address, gender, dateOfBirth } = this.state;

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.toggle} // Đảm bảo toggle gọi đúng hàm trong BookingModal
                className="modal-patient-container"
                size="lg"
                centered
            >
                <ModalHeader className='d-flex justify-content-between' toggle={this.props.toggleFromSchedule}><FormattedMessage id='patient.profile-doctor.title-modal' /></ModalHeader>
                <ProfileDoctor
                    doctorId={this.props.doctorId}
                    selectedSchedule={this.props.selectedSchedule}
                    selectedDate={this.props.selectedDate}
                />
                <ModalBody>
                    <div className="modal-user-body">
                        {/* Full Name */}
                        <div className="input-container">
                            <label><FormattedMessage id='patient.profile-doctor.full-name' /></label>
                            <input
                                type="text"
                                name="fullName"
                                value={fullName}
                                onChange={this.handleChange}
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="input-container">
                            <label><FormattedMessage id='patient.profile-doctor.phone-number' /></label>
                            <input
                                type="text"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={this.handleChange}
                            />
                        </div>

                        {/* Email */}
                        <div className="input-container">
                            <label><FormattedMessage id='patient.profile-doctor.email' /></label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={this.handleChange}
                            />
                        </div>
                        {/* Gender */}
                        <div className="input-container">
                            <label><FormattedMessage id='patient.profile-doctor.gender' /></label>
                            <select
                                name="gender"
                                value={gender}
                                onChange={this.handleChange}
                            >
                                {this.state.genders.map(item => {
                                    return (
                                        <option value={item.keyMap}>{item.valueVi}</option>
                                    )
                                })}
                            </select>
                        </div>
                        {/* Address */}
                        <div className="input-container max-width-input">
                            <label><FormattedMessage id='patient.profile-doctor.address' /></label>
                            <input
                                type="text"
                                name="address"
                                value={address}
                                onChange={this.handleChange}
                            />
                        </div>


                        {/* Date of Birth */}
                        <div className="input-container max-width-input">
                            <label><FormattedMessage id='patient.profile-doctor.date-of-birth' /></label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={dateOfBirth}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {/* Submit button */}
                    <Button
                        color="primary"
                        className='px-3'
                        onClick={this.handleSubmit}
                    >
                        <FormattedMessage id='patient.profile-doctor.btn-booking' />
                    </Button>
                    {/* Close button */}
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={this.props.toggleFromSchedule}
                    >
                        <FormattedMessage id='patient.profile-doctor.btn-close' />
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
