import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from '../../../utils/constant';
import { NumericFormat } from 'react-number-format';
import { FormattedMessage } from 'react-intl';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false,
            doctorInfor: {}
        };
    }

    async componentDidMount() {
        let id = this.props.doctorId;
        if (id) {
            await this.props.getDoctorInfor(id);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.doctorInfor !== prevProps.doctorInfor) {
            this.setState({
                doctorInfor: this.props.doctorInfor
            });
        }
    }

    render() {
        // console.log("check state: ", this.state.doctorInfor);

        let { priceData } = this.state.doctorInfor || {};
        let { paymentData } = this.state.doctorInfor || {};
        let { provinceData } = this.state.doctorInfor || {};

        const { language } = this.props;

        return (
            <div className='container-infor'>
                <div className="box1">
                    <div className="h4 fw-bold"><FormattedMessage id="patient.doctor-infor.examination-address" /></div>
                    <div>{this.state.doctorInfor?.nameClinic}</div>
                    <div>{this.state.doctorInfor?.addressClinic}</div>
                </div>
                <div className="box3" style={{ display: this.state.showDetails ? 'block' : 'none' }}>
                    <div className='child1'>
                        <div className='d-flex justify-content-between'>
                            <div className="price"><FormattedMessage id="patient.doctor-infor.price-value" /></div>
                            <div className="price-value text-danger fw-bold">
                                {language === LANGUAGES.VI ? (
                                    <NumericFormat
                                        value={priceData?.valueVi}
                                        displayType="text"
                                        thousandSeparator
                                        suffix=" VND"
                                    />
                                ) : (
                                    <NumericFormat
                                        value={priceData?.valueEn}
                                        displayType="text"
                                        thousandSeparator
                                        suffix=" USD"
                                    />
                                )}
                            </div>
                        </div>
                        <div>
                            <FormattedMessage id="patient.doctor-infor.text-price" />
                            <NumericFormat
                                value={priceData?.valueEn}
                                displayType="text"
                                thousandSeparator
                                suffix=" USD"
                            />
                        </div>
                    </div>
                    <div className='child2'>
                        <FormattedMessage id="patient.doctor-infor.text-payment" />
                        {paymentData && (
                            language === LANGUAGES.VI ? (
                                <span>{paymentData.valueVi} phương thức</span>
                            ) : (
                                <span>{paymentData.valueEn}</span>
                            )
                        )}
                    </div>
                </div>
                <div className="box2 d-flex gap-4">
                    {this.state.showDetails ? "" : <span><FormattedMessage id="patient.doctor-infor.price-value" />: {language === LANGUAGES.VI ? (
                        <NumericFormat
                            value={priceData?.valueVi}
                            displayType="text"
                            thousandSeparator
                            suffix=" VND"
                        />
                    ) : (
                        <NumericFormat
                            value={priceData?.valueEn}
                            displayType="text"
                            thousandSeparator
                            suffix=" USD"
                        />
                    )}</span>}
                    <button
                        onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                        className="view-detail"
                    >
                        {this.state.showDetails ? <FormattedMessage id="patient.doctor-infor.hide-detail" /> : <FormattedMessage id="patient.doctor-infor.view-detail" />}
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctorInfor: state.admin.doctorInfor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoctorInfor: (id) => dispatch(actions.fetchDoctorInfor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
