import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as actions from "../../../store/actions";
import Select from 'react-select';
import { LANGUAGES } from '../../../utils';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const mdParser = new MarkdownIt(/* Markdown-it options */);
// Finish!

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //Save to markdown table
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            disable: true,
            description: '',
            listDoctors: [],
            detailDoctor: {},


            //Save to doctor_infor table
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: "",
            selectedPayment: "",
            selectedProvince: "",
            nameClinic: "",
            addressClinic: "",
            note: "",
        }
    }
    async componentDidMount() {
        await this.props.fetchAllDoctors();
        await this.props.getPriceList();
        await this.props.getPaymentList();
        await this.props.getProvinceList();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelectDoctor(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let dataSelect = this.buildDataInputSelectDoctor(this.props.allDoctors)
            let listPrice = this.buildDataInputSelect(this.props.priceList);
            let listPayment = this.buildDataInputSelect(this.props.paymentList);
            let listProvince = this.buildDataInputSelect(this.props.provinceList);
            this.setState({
                listDoctors: dataSelect,
                listPrice: listPrice,
                listPayment: listPayment,
                listProvince: listProvince
            })
        }
        if (prevProps.priceList !== this.props.priceList) {
            let dataSelect = this.buildDataInputSelect(this.props.priceList)
            this.setState({
                listPrice: dataSelect
            })
        }
        if (prevProps.paymentList !== this.props.paymentList) {
            let dataSelect = this.buildDataInputSelect(this.props.paymentList)
            this.setState({
                listPayment: dataSelect
            })
        }
        if (prevProps.provinceList !== this.props.provinceList) {
            let dataSelect = this.buildDataInputSelect(this.props.provinceList)
            this.setState({
                listProvince: dataSelect
            })
        }
    }
    buildDataInputSelectDoctor = (inputData) => {
        let result = []
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            });
        }
        return result
    }
    buildDataInputSelect = (inputData) => {
        let result = []
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                let labelVi = `${item.valueVi}`;
                let labelEn = `${item.valueEn}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn
                object.value = item.id
                result.push(object)
            });
        }
        return result
    }
    handleEditorChange({ html, text }) {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }
    handleSaveContentMarkdown = () => {
        let keyMapPrice = this.props.priceList.find(item => item.id === this.state.selectedPrice?.value);
        let keyMapPayment = this.props.paymentList.find(item => item.id === this.state.selectedPayment?.value);
        let keyMapProvince = this.props.provinceList.find(item => item.id === this.state.selectedProvince?.value);
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedDoctor.value,

            priceId: keyMapPrice.keyMap,
            paymentId: keyMapPayment.keyMap,
            provinceId: keyMapProvince.keyMap,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note
        })
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: '',
            description: '',

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        })
    }
    handleChange = async (selectedDoctor) => {
        await this.props.getDetailDoctor(selectedDoctor.value);
        const detailDoctor = this.props.detailDoctor;
        if (detailDoctor) {
            this.setState({
                disable: false,
                detailDoctor: detailDoctor,
                selectedDoctor: selectedDoctor,
                description: detailDoctor.markdown?.description || '',
                contentMarkdown: detailDoctor.markdown?.contentMarkdown || '',
                contentHTML: detailDoctor.markdown?.contentHTML || '',
            });
        }
    };

    handleOnChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    handleChangeSelect = (selectedOption, name) => {
        this.setState({ [name]: selectedOption });
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-dcotor-title'><FormattedMessage id='admin.manage-doctor.title' /></div>
                <div className="more-infor">
                    <div className="content-left form-group">
                        <label><FormattedMessage id='admin.manage-doctor.select-doctor' /></label>
                        <Select
                            placeholder={<div><FormattedMessage id='admin.manage-doctor.placeholder.doctor-select' /></div>}
                            value={this.state.selectedDoctor}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label><FormattedMessage id='admin.manage-doctor.intro' /></label>
                        <textarea onChange={(event) => this.handleOnChangeDesc(event)}
                            value={this.state.description}
                            rows="4"
                            disabled={this.state.disable}
                            placeholder='Nhập vào thông tin giới thiệu...'
                            className="form-control">
                        </textarea>
                    </div>
                </div>
                <div className="more-infor-extra row">
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.price-select' /></label>
                        <Select
                            isDisabled={this.state.disable}
                            value={this.state.selectedPrice}
                            placeholder={<div><FormattedMessage id='admin.manage-doctor.placeholder.price-select' /></div>}
                            onChange={(selectedOption) => this.handleChangeSelect(selectedOption, 'selectedPrice')}
                            options={this.state.listPrice}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.payment-select' /></label>
                        <Select
                            isDisabled={this.state.disable}
                            value={this.state.selectedPayment}
                            placeholder={<div><FormattedMessage id='admin.manage-doctor.placeholder.payment-select' /></div>}
                            onChange={(selectedOption) => this.handleChangeSelect(selectedOption, 'selectedPayment')}
                            options={this.state.listPayment}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.province-select' /></label>
                        <Select
                            isDisabled={this.state.disable}
                            value={this.state.selectedProvince}
                            placeholder={<div><FormattedMessage id='admin.manage-doctor.placeholder.province-select' /></div>}
                            onChange={(selectedOption) => this.handleChangeSelect(selectedOption, 'selectedProvince')}
                            options={this.state.listProvince}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.name-clinic' /></label>
                        <input disabled={this.state.disable} value={this.state.nameClinic} onChange={(event) => this.handleChangeSelect(event.target.value, "nameClinic")} type="text" className='form-control' />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.address-clinic' /></label>
                        <input disabled={this.state.disable} value={this.state.addressClinic} onChange={(event) => this.handleChangeSelect(event.target.value, "addressClinic")} type="text" className='form-control' />
                    </div>
                    <div className="col-4 form-group">
                        <label><FormattedMessage id='admin.manage-doctor.note' /></label>
                        <input disabled={this.state.disable} value={this.state.note} onChange={(event) => this.handleChangeSelect(event.target.value, "note")} type="text" className='form-control' />
                    </div>
                </div>

                <div className="manage-doctor-editor">
                    <MdEditor readOnly={this.state.disable} value={this.state.contentMarkdown} style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={({ html, text }) => this.handleEditorChange({ html, text })} />
                </div>
                {!this.state.detailDoctor.markdown &&
                    <button className='save-content-doctor'
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        <FormattedMessage id='admin.manage-doctor.add' /></button>}
                {this.state.detailDoctor.markdown &&
                    <button className='save-content-doctor'
                        onClick={() => this.handleSaveContentMarkdown()}
                    >
                        <FormattedMessage id='admin.manage-doctor.save' /></button>}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        priceList: state.admin.priceList,
        paymentList: state.admin.paymentList,
        provinceList: state.admin.provinceList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctorService(data)),
        getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctor(id)),
        getPriceList: () => dispatch(actions.fetchPriceSuccess()),
        getPaymentList: () => dispatch(actions.fetchPaymentSuccess()),
        getProvinceList: () => dispatch(actions.fetchProvinceSuccess()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
