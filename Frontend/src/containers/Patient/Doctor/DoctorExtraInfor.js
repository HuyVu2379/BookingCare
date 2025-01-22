import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from '../../../utils/constant';
class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: false
        };
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps) {
    }

    render() {
        return (
            <div className='container-infor'>
                <div className="box1">
                    <div className="h4 fw-bold">ĐỊA CHỈ KHÁM</div>
                    <div>Phòng khám chuyên khoa da liễu</div>
                    <div>207 Phố Huế - Hai Bà Trưng - Hà Nội</div>
                </div>
                <div className="box3" style={{ display: this.state.showDetails ? 'block' : 'none' }}>
                    <div className='child1'>
                        <div className='d-flex justify-content-between'>
                            <div className="price">Giá khám</div>
                            <div className="price-value text-danger fw-bold">250.000 VND</div>
                        </div>
                        <div>
                            Được ưu tiên khám trước khi đặt khám qua BookingCare giá khám cho người nước ngoài là 30 USD
                        </div>
                    </div>
                    <div className='child2'>
                        Người bệnh có thể thanh toán chi phí bằng tiền mặt hoặc quẹt thẻ
                    </div>
                </div>
                <div className="box2 d-flex gap-4">
                    <div>{this.state.showDetails ? "" : "Giá khám: 250.000 VND"}</div>
                    <button onClick={() => this.setState({ showDetails: !this.state.showDetails })} className="view-detail">{this.state.showDetails ? "Ẩn bảng giá" : "Xem chi tiết"}</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    }
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
