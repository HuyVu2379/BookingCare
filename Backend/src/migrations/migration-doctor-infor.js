'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_infors', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            priceId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'allcodes',
                    key: 'keyMap'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            provinceId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'allcodes',
                    key: 'keyMap'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            paymentId: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'allcodes',
                    key: 'keyMap'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            addressClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            nameClinic: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: {
                type: Sequelize.STRING,
                allowNull: true
            },
            count: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_infor');
    }
};
