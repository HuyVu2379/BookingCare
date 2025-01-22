import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import * as actions from "../../../store/actions";
import "./DetailDoctor.scss";
import { LANGUAGES } from '../../../utils/constant';
import DoctorSchedule from './DoctorSchedule';
import DoctorExtraInfor from './DoctorExtraInfor';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            markdown: {}
        };
    }

    componentDidMount() {
        if (this.props.match?.params?.id) {
            let id = this.props.match.params.id;
            this.props.getDetailDoctor(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.detailDoctorFromReducer !== this.props.detailDoctorFromReducer) {
            const doctor = this.props.detailDoctorFromReducer;
            const imageBase64 = Buffer.from(doctor.image, 'base64').toString('binary');
            doctor.image = imageBase64;

            this.setState({
                detailDoctor: doctor,
                markdown: doctor.markdown
            });
        }
    }

    render() {
        const { detailDoctor, markdown } = this.state;
        const { language } = this.props;
        const doctorData = detailDoctor.doctorData || {};
        console.log("check user detail: ", doctorData);

        return (
            <Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div
                            style={{ backgroundImage: `url(${detailDoctor.image || ''})` }}
                            className="content-left"
                        />
                        <div className="content-right">
                            <div className="up">
                                {language === LANGUAGES.VI
                                    ? <span>{detailDoctor.positionData?.valueVi}, {detailDoctor.lastName} {detailDoctor.firstName}</span>
                                    : <span>{detailDoctor.positionData?.valueEn}, {detailDoctor.firstName} {detailDoctor.lastName}</span>}
                            </div>
                            <div className="down">{markdown.description || ''}</div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            {this.state.detailDoctor.id && <DoctorSchedule doctorId={this.state.detailDoctor.id} />}
                        </div>
                        <div className="content-right">
                            <DoctorExtraInfor />
                        </div>
                    </div>
                    <div className="detail-infor-doctor ">
                        <h2>Detailed Information for Doctor:</h2>
                        <div
                            className="markdown-content"
                            dangerouslySetInnerHTML={{ __html: markdown.contentHTML || '' }}
                        />
                    </div>
                    <div className="comment-doctor">
                        {/* Comment section can be added here */}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        detailDoctorFromReducer: state.admin.detailDoctor,
        language: state.app.language
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
