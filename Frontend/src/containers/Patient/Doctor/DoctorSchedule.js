import React, { Component } from 'react';
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import Select from 'react-select';
import moment from 'moment';
import { LANGUAGES } from '../../../utils/constant';
import 'moment/locale/vi';
import * as actions from "../../../store/actions";
import { FormattedMessage } from 'react-intl';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            schedules: [],
            selectedDate: "",
            scheduleOfDay: []
        };
    }

    createDaysList(language) {
        const today = moment().startOf('day');
        const options = [];
        for (let i = 0; i < 7; i++) {
            const day = today.clone().add(i, 'days');
            let label;
            if (i === 0) {
                if (language === LANGUAGES.VI) {
                    label = "Hôm nay" + " - " + day.locale("vi").format('DD/MM')
                } else {
                    label = "Today" + " - " + day.locale('en').format('DD/MM');
                }
                const object = {
                    label,
                    value: day.valueOf(),
                };
                options.push(object);
                continue;
            }
            if (language === LANGUAGES.VI) {
                label = day.locale('vi').format('dddd - DD/MM');
                label = label.charAt(0).toUpperCase() + label.slice(1);
            } else {
                label = day.locale('en').format('dddd - DD/MM');
            }
            const object = {
                label,
                value: day.valueOf(),
            };
            options.push(object);
        }
        return options;
    }
    async getScheduleOfDateByDoctor(doctorId, date) {
        let schedule = [];
        const schedules = this.state.scheduleOfDay
        if (doctorId) {
            await this.props.getDoctorSchedule(doctorId, date);
            let scheduleOfDoctor = this.props.scheduleOfDoctor.schedules;
            for (let index = 0; index < scheduleOfDoctor.length; index++) {
                const filteredSchedules = schedules.filter(item => item.keyMap === scheduleOfDoctor[index].timeType);
                schedule.push(...filteredSchedules);
            }
            this.setState({
                schedules: schedule
            });
        }
    }
    async componentDidMount() {
        const { language } = this.props;
        let doctorId = this.props.doctorId;
        const allDays = this.createDaysList(language);
        const today = moment().startOf('day').valueOf();
        this.setState({
            allDays,
            selectedDate: today
        });
        await this.props.getSchedule();
        this.setState({
            scheduleOfDay: this.props.schedule
        });
        this.getScheduleOfDateByDoctor(doctorId, today);
    }


    componentDidUpdate(prevProps) {
        if (prevProps.language !== this.props.language) {
            const { language } = this.props;
            const allDays = this.createDaysList(language);
            if (JSON.stringify(allDays) !== JSON.stringify(this.state.allDays)) {
                this.setState({ allDays });
            }
        }
    }


    render() {
        const customStyles = {
            control: (provided) => ({
                ...provided,
                width: '150px',
                minHeight: '30px',
                height: '30px',
                fontSize: '12px',
            }),
            option: (provided) => ({
                ...provided,
                width: '150px'
            }),
            menu: (provided) => ({
                ...provided,
                width: '150px'
            }),
            valueContainer: (provided) => ({
                ...provided,
                padding: '2px 8px',
            }),
            input: (provided) => ({
                ...provided,
                margin: '0px',
            }),
            indicatorsContainer: (provided) => ({
                ...provided,
                height: '30px',
            }),
        };
        let { language } = this.props;
        let doctorId = this.props.doctorId;
        return (
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <div className='schedule'>
                        <i class="fas fa-calendar-alt"></i>
                        <div className='text-schedule'>
                            <FormattedMessage id="patient.detail-doctor.schedule" />
                        </div>
                    </div>
                    <Select
                        key={this.props.language}
                        styles={customStyles}
                        options={this.state.allDays}
                        value={this.state.allDays.find(day => day.value === this.state.selectedDate)}
                        placeholder={language === LANGUAGES.VI ? "Chọn ngày" : "Pick Date"}
                        onChange={(selectedOption) => {
                            this.setState({ selectedDate: selectedOption.value });
                            this.getScheduleOfDateByDoctor(doctorId, selectedOption.value);
                        }}
                    />

                </div>
                <div className="all-available-time">
                    {
                        this.state.schedules && this.state.schedules.length > 0 ?
                            this.state.schedules.map((item) => {
                                return (
                                    <button className='timeline'>{language === LANGUAGES.EN ? item.valueEn : item.valueVi}</button>
                                )
                            })
                            :
                            <div><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        detailDoctorFromReducer: state.admin.detailDoctor,
        scheduleOfDoctor: state.admin.schedules,
        schedule: state.admin.schedule
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDoctorSchedule: (doctorId, date) => dispatch(actions.getDoctorSchedule(doctorId, date)),
    getSchedule: () => dispatch(actions.fetchTimeSchedule()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
