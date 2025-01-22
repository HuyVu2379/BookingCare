import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService.js';
import ModalUser from './ModalUser.js';
import { emitter } from '../../utils/emitter.js';
import ModalEditUser from './ModalEditUser.js';
import MDEditor from '@uiw/react-md-editor';
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }
    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({ isOpenModalUser: true });
    }

    toggleUserModal = () => {
        this.setState({ isOpenModalUser: !this.state.isOpenModalUser });
    }
    toggleUserEditModal = () => {
        this.setState({ isOpenModalEditUser: !this.state.isOpenModalEditUser });
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            console.log('Full response: ', response); // Kiểm tra toàn bộ đối tượng response
            if (response && response.errCode !== 0) {
                console.log('Error message: ', response.errMessage); // Truy cập đúng thuộc tính errMessage
                alert(response.errMessage);
            } else {
                await this.getAllUsersFromReact();
                this.toggleUserModal();
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.users.errCode === 0) {
                await this.getAllUsersFromReact();
            }
            else {
                alert(res.users.errMessage);
            }
        } catch (error) {
            console.log('error: ', error);
        }
    }

    handleEditUser = (user) => {
        console.log('check user: ', user);
        this.toggleUserEditModal();
        this.setState({
            userEdit: user
        })
    }
    doEditUser = async (data) => {
        console.log('check data edit: ', data);
        try {
            let res = await editUserService(data);
            console.log('Full response: ', res);
            if (res && res.errCode === 0) {
                await this.getAllUsersFromReact();
                this.toggleUserEditModal();
            }
            else {
                alert(res.errMessage);
            }
        } catch (error) {
            console.log('error: ', error);

        }
    }

    render() {
        // console.log(this.state.arrUsers);
        let arrUsers = this.state.arrUsers;
        return (
            <React.Fragment>
                <div className="users-container">
                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleFromParent={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />{
                        this.state.isOpenModalEditUser &&
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            toggleFromParent={this.toggleUserEditModal}
                            currentUser={this.state.userEdit}
                            editUser={this.doEditUser}
                        // createNewUser={this.createNewUser}
                        />}
                    <div className='title text-center'>Manage user with HuyVu</div>
                    <div className="mx-3"
                        onClick={this.handleAddNewUser}>
                        <button className="btn btn-primary px-3"><i className="fas fa-plus"></i> Add new users</button>
                    </div>
                    <div className='users-table mt-3 mx-2'>
                        <table id="customers">
                            <tbody>
                                <tr>
                                    <th>Email</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>Action</th>
                                </tr>
                                {arrUsers && arrUsers.map((item, index) => {
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
                </div>
                <MDEditor
                />
                <MDEditor.Markdown style={{ whiteSpace: 'pre-wrap' }} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
