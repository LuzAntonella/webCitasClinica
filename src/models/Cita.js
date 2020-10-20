const mongoose = require('mongoose');
const { Schema } = mongoose;
const CitaSchema = new Schema({
    documentoI: { type:String, required:true},
    medicoN: { type:String, required:true},
    date : { type:Date, default: Date.now }
});

module.exports = mongoose.model('Cita', CitaSchema);