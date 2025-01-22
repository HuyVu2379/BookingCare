import db from '../models/index';
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let isExist = checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email }
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        resolve({
                            errCode: 0,
                            errMessage: 'Ok',
                            user: user
                        })
                    }
                    else {
                        resolve({
                            errCode: -1,
                            errMessage: "Wrong password"
                        })
                    }
                }
                else {
                    resolve({
                        errCode: -2,
                        errMessage: "User not found"
                    })
                }
            } else {
                resolve({
                    errCode: 1,
                    errMessage: "Your's email isn't exist in your system. plz try other email"
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve({
                    errCode: -1,
                    errMessage: "email already exists"
                })
            }
            resolve({
                errCode: 0,
                errMessage: "valid"
            }
            )
        } catch (error) {
            reject(error)
        }
    })

}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            else if (userId && userId != 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllCodeService = (type) => {
    return new Promise(async (resolve, reject) => {
        try {
            let allCode = await db.Allcode.findAll({
                where: {
                    type: type
                }
            })
            resolve({
                errCode: 0,
                errMessage: "fetch allcode succeed!",
                data: allCode
            })
        } catch (error) {
            reject(error)
        }
    })

}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            //lưu ý, truyền vào đúng password cần hash
            // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
            let hashPassWord = await bcrypt.hashSync(password, salt);

            resolve(hashPassWord);
        } catch (e) {
            reject(e);
        }

    })
}

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("data from create user: ", data);

            let hashPassWordFromBcrypt = await hashUserPassword(data.password)
            let user = await db.User.create({
                email: data.email,
                password: hashPassWordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender,
                roleId: data.roleId,
                positionId: data.positionId,
                image: data.avatar
            })
            resolve({
                errCode: 0,
                errMessage: "Create new user succeed!",
                user: user
            });

        } catch (e) {
            reject(e);
        }
    })

}
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve({
                    errCode: -1,
                    errMessage: "Not found user"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.gender = data.gender;
                user.positionId = data.positionId;
                user.roleId = data.roleId;
                user.image = data.avatar;
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: "Update user succeed!",
                });
            } else {
                resolve({
                    errCode: -1,
                    errMessage: "Update user failed"
                });
            }
        } catch (error) {
            reject(error);
        }
    });
}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            if (user) {
                await db.User.destroy({
                    where: { id: userId }
                });
            }
            resolve({
                errCode: 0,
                errMessage: "delete user succeed!"
            });

        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    getAllCodeService: getAllCodeService,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
    createNewUser: createNewUser
};
