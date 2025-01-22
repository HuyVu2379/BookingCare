import React, { Component } from 'react';
import { connect } from 'react-redux';
class HomeFooter extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    }
    render() {
        return (
            <div className="section-about text-center">
                <div>
                    <p>&copy; 2024 by VuQuocHuy, for imformation &#8594; <a href="#">click here</a> 	&#8592;</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
