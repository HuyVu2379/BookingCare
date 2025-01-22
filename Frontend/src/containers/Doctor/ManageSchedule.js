import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss"
import { FormattedMessage } from 'react-intl'
import * as actions from "../../store/actions";
import Select from 'react-select';
import { LANGUAGES, dateFormat } from "../../utils"
import DatePicker from "../../components/Input/DatePicker"
import { toast } from 'react-toastify'
import moment from 'moment';
import _ from 'lodash'
import { saveBulkSchedule } from '../../services/userService';
class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            detailDoctor: {},
            currentDate: new Date(),
            schedule: [],
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            });
        }

        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
            this.setState({
                listDoctors: dataSelect
            });
        }

        if (prevProps.schedule !== this.props.schedule) {
            let data = this.props.schedule;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }));
            }
            this.setState({
                schedule: data
            });
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getSchedule();
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        let { language } = this.props;

        if (inputData && inputData.length > 0) {
            inputData.forEach((item) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    handleChange = async (selectedDoctor) => {
        await this.props.getDetailDoctor(selectedDoctor.value);
        const detailDoctor = this.props.detailDoctor;
        if (detailDoctor) {
            this.setState({
                detailDoctor: detailDoctor,
                selectedDoctor: selectedDoctor
            });
        }

    };

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        });
    };
    handleChangeSelected = (index) => {
        let schedule = [...this.state.schedule];
        schedule[index].isSelected = !schedule[index].isSelected;
        this.setState({ schedule });

    }
    handleSaveSchedule = async () => {
        let { selectedDoctor, currentDate, schedule } = this.state;
        let result = [];
        if (!currentDate) {
            toast.error("Invalid date !")
            return;
        }
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Invalid selected doctor !");
            return;
        }
        let formatedDate = moment(currentDate).format("YYYY-MM-DD");
        if (schedule && schedule.length > 0) {
            let selectedTime = schedule.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(item => {
                    let o = {};
                    o.doctorId = selectedDoctor.value;
                    o.date = formatedDate;
                    o.timeType = item.keyMap;
                    result.push(o);
                })
            } else {
                toast.error("Invalid selected schedule !");
                return;
            }
        }
        await this.props.saveBulkSchedule({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            date: currentDate
        });
    }
    render() {
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
        return (
            <div className="manage-schedule-container">
                <div className="m-s-title">
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-doctor" />:</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChange}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-6 form-group">
                            <label><FormattedMessage id="manage-schedule.choose-date" />:</label>
                            <DatePicker
                                className="form-control"
                                onChange={this.handleOnChangeDatePicker}
                                value={this.state.currentDate}
                                minDate={yesterday}
                            />
                        </div>
                        <div className="col-12 pick-hour-container">
                            {this.state.schedule &&
                                this.state.schedule.map((item, index) => (
                                    <button onClick={() => this.handleChangeSelected(index)} key={index} className={item.isSelected !== true ? "item-schedule p-3" : "item-schedule p-3 active"}>
                                        {language === LANGUAGES.EN ? item.valueEn : item.valueVi}
                                    </button>
                                ))}
                        </div>
                        <div className="col-12">
                            <button
                                onClick={() => this.handleSaveSchedule()}
                                className="btn btn-primary"><FormattedMessage id="manage-schedule.save" /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        schedule: state.admin.schedule,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
        getSchedule: () => dispatch(actions.fetchTimeSchedule()),
        saveBulkSchedule: (data) => dispatch(actions.saveBulkScheduleDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
