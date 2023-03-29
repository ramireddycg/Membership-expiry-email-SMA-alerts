const sequelize = require('../../frameworks_drivers/database/sequelize')
const _ = require('lodash')

module.exports = class {
    constructor() {
        this.db = sequelize
        this.model = this.db.model('Student')
    }
    async add(studentEntity) {
        const err = []
        const { student_name, student_mark } = studentEntity
        if (_.isUndefined(student_name) || _.isNull(student_name)) err.push("student name is required in field 'student_name'")
        if (_.isUndefined(student_mark) || _.isNull(student_mark)) err.push("student_mark is required in field 'student_mark'")

        if (err.length > 0) return err
        else {
            return await this.model.create({ student_name, student_mark }, { raw: true })
        }


    }

    async update(id, studentEntity) {
        const err = []
        const { student_name, student_mark } = studentEntity
        if(_.isUndefined(id) || _.isNull(id)) err.push("Cannot update city if Id is not provided. Add id in field 'id'.")
        if (_.isUndefined(student_name) || _.isNull(student_name)) err.push("city name is required in field 'student_name'")
        if (_.isUndefined(student_mark) || _.isNull(student_mark)) err.push("student_mark is required in field 'student_mark'")     
        if(err.length > 0) return err
        return await this.model.update({ student_name, student_mark }, { where: { id }, raw: true })

    }

    async delete(id) {
        if(_.isUndefined(id) || _.isNull(id)) return 'Could not delete city without id'
        return await this.model.destroy({ where: { id } })
            
    }

    async getAll() {
        return await this.model.findAll()
    }
   
}