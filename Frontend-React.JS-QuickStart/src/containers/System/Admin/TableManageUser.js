import React, { Component } from 'react';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { getAllUsers } from '../../../services/userService';
class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.getAllUsers();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.userRedux !== this.props.userRedux) {
            this.setState({
                userRedux: this.props.userRedux
            })
        }
    }
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }
    render() {
        let userRedux = this.state.userRedux;
        return (
            <div className="users=-container">
                <table id='customers'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {userRedux && userRedux.map((item, index) => {
                            // console.log('check map: ', item, index);
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={() => this.handleEditUser(item)}>
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}>
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        userRedux: state.admin.arrUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllUsers: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
