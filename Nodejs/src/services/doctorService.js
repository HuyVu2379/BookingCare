import { where } from "sequelize";
import db from "../models";
import { resolve } from "path";
require('dotenv').config();
import _, { reject } from 'lodash'
const MAX_NUMBER_SCHEDULE = parseInt(process.env.MAX_NUMBER_SCHEDULE, 10);
let getTopDoctorHome = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        let users = '';
        try {
            users = await db.User.findAll({
                limit: limitInput,
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }
                ],
                raw: true,
                nest: true
            });
            resolve({
                errCode: 0,
                data: users
            });
        } catch (error) {
            reject(error);
        }
    });
};

let getALlDoctors = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctors = await db.User.findAll({
                where: {
                    roleId: "R2"
                },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
let saveDetailInforDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown
                || !inputData.priceId || !inputData.paymentId || !inputData.provinceId
                || !inputData.nameClinic || !inputData.addressClinic
            ) {
                resolve({
                    errCode: -1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                let existData = await db.Markdown.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    }
                })
                console.log("check exist markdown doctor: ", existData);
                let existInFor = await db.Doctor_Infor.findOne({
                    where: {
                        doctorId: inputData.doctorId
                    }
                });
                console.log("check exist infor doctor: ", existInFor);
                //Markdown
                if (existData) {
                    await db.Markdown.update({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                    }, {
                        where: {
                            doctorId: inputData.doctorId
                        }
                    })
                } else {
                    await db.Markdown.create({
                        contentHTML: inputData.contentHTML,
                        contentMarkdown: inputData.contentMarkdown,
                        description: inputData.description,
                        doctorId: inputData.doctorId
                    })
                }

                //Doctor Information
                try {
                    if (existInFor) {
                        await db.Doctor_Infor.update({
                            doctorId: inputData.doctorId,
                            priceId: String(inputData.priceId),
                            provinceId: String(inputData.provinceId),
                            paymentId: String(inputData.paymentId),
                            addressClinic: inputData.addressClinic,
                            nameClinic: inputData.nameClinic,
                            note: inputData.note
                        }, {
                            where: { doctorId: inputData.doctorId }
                        });
                    } else {
                        await db.Doctor_Infor.create({
                            doctorId: inputData.doctorId,
                            priceId: String(inputData.priceId),
                            provinceId: String(inputData.provinceId),
                            paymentId: String(inputData.paymentId),
                            addressClinic: inputData.addressClinic,
                            nameClinic: inputData.nameClinic,
                            note: inputData.note
                        });
                    }
                } catch (error) {
                    console.error("Error updating or creating doctor information:", error);
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save infor doctor succeed"
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getDetailInforDoctorService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let detailDoctor = await db.User.findOne({
                where: {
                    roleId: "R2",
                    id: doctorId
                },
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Markdown, as: 'markdown' },
                    { model: db.Allcode, as: 'positionData' },
                    {
                        model: db.Doctor_Infor, as: "doctorData",
                        include: [
                            { model: db.Allcode, as: 'priceData' },
                            { model: db.Allcode, as: 'paymentData' },
                            { model: db.Allcode, as: 'provinceData' },
                        ]
                    }
                ],
                raw: false
            })
            resolve({
                errCode: 0,
                data: detailDoctor
            })
        } catch (error) {
            reject(error)
        }
    })
}
let bulkCreateScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedule = data;
            if (!schedule.arrSchedule || schedule.arrSchedule.length === 0) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing required param !"
                })
            } else {
                schedule.arrSchedule = schedule.arrSchedule.map(item => {
                    item.maxNumber = MAX_NUMBER_SCHEDULE;
                    item.maxNumber = parseInt(item.maxNumber);
                    item.date = new Date(new Date(item.date).setHours(0, 0, 0, 0));
                    return item;
                });
                let existing = await db.Schedule.findAll(
                    {
                        where: {
                            doctorId: schedule.doctorId, date: schedule.date
                        },
                        attributes: ['timeType', 'date', 'doctorId', 'maxNumber'],
                        raw: true
                    }
                )
                if (existing && existing.length > 0) {
                    existing = existing.map(item => {
                        item.date = new Date(item.date).getTime();
                        return item;
                    })
                }

                let toCreate = _.differenceWith(schedule.arrSchedule, existing, (a, b) => {
                    return a.timeType === b.timeType && new Date(a.date).getTime() === new Date(b.date).getTime();
                });
                console.log("check difference: ", toCreate);
                let result;
                if (toCreate && toCreate.length > 0) {
                    result = await db.Schedule.bulkCreate(toCreate);
                }
                if (result) {
                    resolve({
                        errCode: 0,
                        errMessage: "OK"
                    });
                }
                else {
                    resolve({
                        errCode: -1,
                        errMessage: "Save schedule failed !"
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    });
}
let getDoctorScheduleService = (doctorId, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            let schedules = await db.Schedule.findAll({
                where: {
                    doctorId: doctorId,
                    date: date
                }
            })
            resolve({
                schedules
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getALlDoctors: getALlDoctors,
    saveDetailInforDoctor: saveDetailInforDoctor,
    getDetailInforDoctorService: getDetailInforDoctorService,
    bulkCreateScheduleService: bulkCreateScheduleService,
    getDoctorScheduleService: getDoctorScheduleService
}