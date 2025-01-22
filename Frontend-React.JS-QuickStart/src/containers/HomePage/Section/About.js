import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss'
class About extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
        //fire redux event : actions
    }
    render() {
        return (
            <div className="section section-about">
                <div className="content-left">
                    <div className='section-about-header'>Nhạc hay cho em bu beo nghe</div>
                    <iframe width="100%" height="400"
                        src="https://www.youtube.com/watch?v=kyCaqclob1o&list=RDkyCaqclob1o&start_radio=1"
                        title="Lao Tâm Khổ Tứ (Huy PT Remix) - Thanh Hưng &amp; BOM Music Group | Ver Nhạc Remix Hot Nhất TikTok 2024"
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen>
                    </iframe>
                </div>
                <div className="content-right">
                    Cho anh gặp lại em trước khi mình cách xa
                    Nửa quãng đời về sau anh không phiền em nữa
                    Dù anh biết mình chẳng có cơ hội thay đổi em nữa rồi
                    Chỉ là, chỉ là anh nhớ thôi
                    Em muốn sự bình yên anh quen cuộc sống vô định
                    Em nghĩ về tương lai anh không nhiều toan tính
                    Anh có lỗi làm e thấy ưu phiền để người thứ 3 xuất hiện
                    Rồi mang đi mất người quan trọng nhất
                    Trái tim đã mang tổn thương xước thêm cũng đâu nghĩa gì
                    Vốn dĩ không là của nhau thì nay ở mai bước đi
                    Ngày ko em có dài anh vẫn sẽ tồn tại
                    Chỉ là còn khổ tâm gượng sống trong âm thầm
                    Chắc anh phải cần thời gian ngắt đi cánh hoa úa tàn
                    Lỡ buông mất duyên trời ban từ này tình yêu vỡ tan
                    Lại lạc mất em rồi anh giống như kẻ tồi 3 người về 2 lối là chính a có tội
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
