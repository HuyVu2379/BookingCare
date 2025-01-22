import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import MedicalFacility from './Section/MedicalFacility'; // Đảm bảo tên import khớp với tên file thực tế
import Specialty from './Section/Specialty';
import OutStandingDoctor from './Section/OutStandingDoctor';
import Handbook from './Section/Handbook';
import HomeFooter from './HomeFooter';
import About from './Section/About';
class HomePage extends Component {

    render() {
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <Specialty responsive={responsive} />
                <MedicalFacility responsive={responsive} />
                <OutStandingDoctor responsive={responsive} />
                <Handbook responsive={responsive} />
                <About />
                <HomeFooter />
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
