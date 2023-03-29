const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('SendMessage')
    }
    async add(sendMessageEntity) {
        const err = []
        const { TypeId, MobileNo, DeviceId, EmaiId, SenderId, PeId, TemplateId,Subject, Path, Message, InsertedOn, IsSent, CreatedOn, UpdateOn } = sendMessageEntity
        if (_.isUndefined(TypeId) || _.isNull(TypeId)) err.push("TypeId is required in field 'TypeId'")
        if (_.isUndefined(MobileNo) || _.isNull(MobileNo)) err.push("MobileNo is required in field 'MobileNo'")
        if (_.isUndefined(DeviceId) || _.isNull(DeviceId)) err.push("DeviceId is required in field 'DeviceId'")
        if (_.isUndefined(EmaiId) || _.isNull(EmaiId)) err.push("EmaiId is required in field 'EmaiId'")
        if (_.isUndefined(SenderId) || _.isNull(SenderId)) err.push("SenderId is required in field 'SenderId'")
        if (_.isUndefined(PeId) || _.isNull(PeId)) err.push("PeId is required in field 'PeId'")
        if (_.isUndefined(TemplateId) || _.isNull(TemplateId)) err.push("TemplateId is required in field 'TemplateId'")
        if (_.isUndefined(Subject) || _.isNull(Subject)) err.push("Subject is required in field 'Subject'")
        if (_.isUndefined(Path) || _.isNull(Path)) err.push("Path is required in field 'Path'")
        if (_.isUndefined(Message) || _.isNull(Message)) err.push("Message is required in field 'Message'")
        if (_.isUndefined(InsertedOn) || _.isNull(InsertedOn)) err.push("InsertedOn is required in field 'InsertedOn'")
        if (_.isUndefined(IsSent) || _.isNull(IsSent)) err.push("IsSent is required in field 'IsSent'")
        if (_.isUndefined(CreatedOn) || _.isNull(CreatedOn)) err.push("CreatedOn is required in field 'CreatedOn'")
        if (_.isUndefined(UpdateOn) || _.isNull(UpdateOn)) err.push("UpdateOn is required in field 'UpdateOn'")

        if (err.length > 0) return err
        else {
            return await this.model.create({ TypeId, MobileNo, DeviceId, EmaiId, SenderId, PeId, TemplateId, Subject, Path, Message, InsertedOn, IsSent, CreatedOn, UpdateOn}, { raw: true })
        }


    }
    
    async update(id, sendMessageEntity) {
        const err = []
        const { TypeId, MobileNo, DeviceId, EmaiId, SenderId, PeId, TemplateId, Subject, Path, Message, InsertedOn, IsSent, CreatedOn, UpdateOn } = sendMessageEntity
        if(_.isUndefined(id) || _.isNull(id)) err.push("Cannot update city if Id is not provided. Add id in field 'id'.")
        if (_.isUndefined(TypeId) || _.isNull(TypeId)) err.push("TypeId is required in field 'TypeId'")
        if (_.isUndefined(MobileNo) || _.isNull(MobileNo)) err.push("MobileNo is required in field 'MobileNo'")     
        if (_.isUndefined(DeviceId) || _.isNull(DeviceId)) err.push("DeviceId is required in field 'DeviceId'")
        if (_.isUndefined(EmaiId) || _.isNull(EmaiId)) err.push("EmaiId is required in field 'EmaiId'")
        if (_.isUndefined(SenderId) || _.isNull(SenderId)) err.push("SenderId is required in field 'SenderId'")
        if (_.isUndefined(PeId) || _.isNull(PeId)) err.push("PeId is required in field 'PeId'")
        if (_.isUndefined(TemplateId) || _.isNull(TemplateId)) err.push("TemplateId is required in field 'TemplateId'")
        if (_.isUndefined(Subject) || _.isNull(Subject)) err.push("Subject is required in field 'Subject'")
        if (_.isUndefined(Path) || _.isNull(Path)) err.push("Path is required in field 'Path'")
        if (_.isUndefined(Message) || _.isNull(Message)) err.push("Message is required in field 'Message'")
        if (_.isUndefined(InsertedOn) || _.isNull(InsertedOn)) err.push("InsertedOn is required in field 'InsertedOn'")
        if (_.isUndefined(IsSent) || _.isNull(IsSent)) err.push("IsSent is required in field 'IsSent'")
        if (_.isUndefined(CreatedOn) || _.isNull(CreatedOn)) err.push("CreatedOn is required in field 'CreatedOn'")
        if (_.isUndefined(UpdateOn) || _.isNull(UpdateOn)) err.push("UpdateOn is required in field 'UpdateOn'")
        if(err.length > 0) return err
        return await this.model.update({ TypeId, MobileNo, DeviceId, EmaiId, SenderId, PeId, TemplateId, Subject, Path, Message, InsertedOn, IsSent, CreatedOn, UpdateOn }, { where: { id }, raw: true })

    }
    async updateSendMessageById(id, sendMessageEntity) {
        const err = []
        const { IsSent } = sendMessageEntity
        if(_.isUndefined(id) || _.isNull(id)) err.push("Cannot update city if Id is not provided. Add id in field 'id'.")
        if (_.isUndefined(IsSent) || _.isNull(IsSent)) err.push("IsSent is required in field 'IsSent'")
        
        if(err.length > 0) return err
        return await this.model.update({ IsSent }, { where: { id }, raw: true })

    }

    async delete(id) {
        if(_.isUndefined(id) || _.isNull(id)) return 'Could not delete city without id'
        return await this.model.destroy({ where: { id } })
            
    }

    async getAll() {
        return await this.model.findAll()
    }
    async getSendMessageById(TypeId) {
        return await this.model.findAll({where:{TypeId}})
    }
    async getSendMessageBySent1(IsSent) {
        return await this.model.findAll({limit: 1,where:{IsSent}})
        }
    async getSendMessageBySent(IsSent) {
        return await this.model.findAll({where:{IsSent}})
        
    }
    
}