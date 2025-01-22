import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../HomePage.scss'
import { FormattedMessage } from 'react-intl';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
class Handbook extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    }
    render() {
        return (
            <div className="section section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className='section-title section-secialty-title'>Cẩm nang</span>
                        <button className='btn-view-more' type='button'>Xem thêm</button>
                    </div>
                    <div className="section-content">
                        <Carousel responsive={this.props.responsive}>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                            <div className="section-body">
                                <div className="section-img section-handbook-img"></div>
                                <div className="section-title">Cơ xương khớp 1</div>
                            </div>
                        </Carousel>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
