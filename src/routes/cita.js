const express = require('express');
const router = express.Router();
const FormMedico = require('../models/FormMedico')
const { isAuthenticated } = require('../helpers/auth');

router.get('/cita/addcita',isAuthenticated,(req, res) => {
    res.render('cita/new-formM');
});

//separar cita
router.get('/cita/separarC',isAuthenticated,(req, res) => {
    res.render('cita/separarCita');
});

//aqui guardo los datos en la BD(esto es de formulario medico)
router.post('/cita/new-cita', isAuthenticated,async (req,res) => {
    const {documentoI, genero, fechaNacimiento, civil, pais, tipoSangre, seguroM, enfermedadPrevia ,alergias}= req.body;
    const errors =[];
    if(!documentoI){
        errors.push({text:'Por favor inserte su documento de identidad'});
    }
    if(!genero){
        errors.push({text:'Por favor inserte su género'});
    }
    if(!fechaNacimiento){
        errors.push({text:'Por favor inserte su fecha de nacimiento'});
    }
    //falta validar los demas datos
    if(errors.length > 0){
        res.render('cita/new-formM',{
            errors,
            documentoI,
            genero,
            fechaNacimiento,
            civil,
            pais,
            tipoSangre,
            seguroM,
            enfermedadPrevia,
            alergias
        });
    } else{
        const newFormMedico = new FormMedico({documentoI, genero, fechaNacimiento, civil, pais, tipoSangre, seguroM, enfermedadPrevia ,alergias});
        //enlazo para cada uno
        newFormMedico.user = req.user.id;
        await newFormMedico.save();
        req.flash('success_msg','Ficha médica agregada exitosamente');
        //luego de que se guarda lo direcciono a selección cita
        res.redirect('/citas');

    }

    
});
//mostrar para editar

/*la agrupacion de todas las notas - mostrar
esto nos sirve para los medicos*/
/*router.get('/citas', async (req, res) => {
    await FormMedico.find()
      .then(documentos => {
        const contexto = {
            formM: documentos.map(documento => {
            return {
                documentoI: documento.documentoI,
                genero : documento.genero,
                fechaNacimiento : documento.fechaNacimiento,
                civil: documento.civil,
                pais: documento.pais,
                tipoSangre: documento.tipoSangre,
                seguroM :documento.seguroM,
                enfermedadPrevia :documento.enfermedadPrevia,
                alergias: documento.alergias,
                id: documento._id
            }
          })
        }
        res.render('cita/separarCita', {
 formM: contexto.formM }) 
      })
  });*/

  router.get('/citas', isAuthenticated,async (req, res) => {
    await FormMedico.find({user: req.user.id})
      .then(documentos => {
        const contexto = {
            formM: documentos.map(documento => {
            return {
                documentoI: documento.documentoI,
                genero : documento.genero,
                fechaNacimiento : documento.fechaNacimiento,
                civil: documento.civil,
                pais: documento.pais,
                tipoSangre: documento.tipoSangre,
                seguroM :documento.seguroM,
                enfermedadPrevia :documento.enfermedadPrevia,
                alergias: documento.alergias,
                id: documento._id
            }
          })
        }
        res.render('cita/all-formM', {
 formM: contexto.formM }) 
      })
  });
//recibir el id y mostrar
  router.get('/citas/edit/:id', isAuthenticated,async (req, res) => {
    const formM = await FormMedico.findById(req.params.id)
    .then(data =>{
        return {
                documentoI: data.documentoI,
                genero : data.genero,
                fechaNacimiento : data.fechaNacimiento,
                civil: data.civil,
                pais: data.pais,
                tipoSangre: data.tipoSangre,
                seguroM :data.seguroM,
                enfermedadPrevia :data.enfermedadPrevia,
                alergias: data.alergias,
                id: data._id
        }
    })
    res.render('cita/edit-formM',{formM})
});

//guardar las modificaciones(excepto lo check)
router.put('/citas/edit-formM/:id',isAuthenticated,async (req, res) =>{
    const {documentoI,pais, tipoSangre, seguroM, enfermedadPrevia ,alergias} = req.body;
    //actualizar
     await FormMedico.findByIdAndUpdate(req.params.id, {documentoI,pais, tipoSangre, seguroM, enfermedadPrevia ,alergias});
     req.flash('success_msg','Ficha médica actualizada exitosamente');
     res.redirect('/citas')
});


module.exports = router;