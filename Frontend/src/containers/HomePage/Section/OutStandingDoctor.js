import React, { Component } from 'react';
import { connect } from 'react-redux';
import Carousel from 'react-multi-carousel';
import './OutStandingDoctor.scss';
import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router'
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorRedux
            })
        }
    }
    handleViewDetailDoctor = (doctor) => {
        console.log("View infor doctor: ", doctor);
        this.props.history.push(`/detail-doctor/${doctor.id}`);
    }

    render() {
        let allDoctors = this.state.arrDoctors;
        let { language } = this.props
        console.log('check data fetch doctors:', allDoctors);
        return (
            <div className="section section-outStandingDoctor">
                <div className="section-container">
                    <div className="section-header">
                        <span className='section-title section-secialty-title'><FormattedMessage id="homepage.outstanding-doctor"></FormattedMessage></span>
                        <button className='btn-view-more' type='button'></button>
                    </div>
                    <div className="section-content">
                        <Carousel responsive={this.props.responsive}>
                            {allDoctors && allDoctors.length > 0
                                && allDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi},${item.lastName} ${item.firstName} `;
                                    let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                                    return (<div className="section-body section-outStandingDoctor-body"

                                        key={index}
                                        onClick={() => this.handleViewDetailDoctor(item)}>
                                        <div className="section-img section-outStandingDoctor-img"
                                            style={{ backgroundImage: `url(${imageBase64})` }}
                                        ></div>
                                        <div className="doctor-position">
                                            <div className="doctor-position-name text-center">{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                            <div className="doctor-name text-center"></div>
                                        </div>
                                    </div>)
                                })}
                        </Carousel>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor));
