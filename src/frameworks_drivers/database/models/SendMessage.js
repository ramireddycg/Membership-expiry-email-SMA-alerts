module.exports = (sequelize, type) => {
    return sequelize.define('SendMessage', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        TypeId: {
            type: type.STRING,
            allowNull: false
        },
        MobileNo: {
            type: type.STRING,
            allowNull: false
        },
        DeviceId: {
            type: type.STRING,
            allowNull: false
        },
        EmaiId: {
            type: type.STRING,
            allowNull: false
        },
        SenderId: {
            type: type.STRING,
            allowNull: false
        },
        PeId: {
            type: type.STRING,
            allowNull: false
        },
        TemplateId: {
            type: type.STRING,
            allowNull: false
        },
        Subject: {
            type: type.STRING,
            allowNull: false
        },
        Path: {
            type: type.STRING,
            allowNull: false
        },
        Message: {
            type: type.STRING(5000),
            allowNull: false
        },
        InsertedOn: {
            type: type.STRING,
            allowNull: false
        },
        IsSent: {
            type: type.STRING,
            allowNull: false
        },
        CreatedOn: {
            type: type.STRING,
            allowNull: false
        },
        UpdateOn: {
            type: type.STRING,
            allowNull: false
        },

    },{
        freezTableName: true,
        updatedAt: false,
        createdAt: false
    })
}