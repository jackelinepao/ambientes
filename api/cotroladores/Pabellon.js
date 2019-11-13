"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequellize_1 = require("./../config/sequellize");
exports.getPabellones = (req, res) => {
    sequellize_1.Pabellon.findAll().then((objPabellones) => {
        res.status(200).json({
            message: 'ok',
            content: objPabellones
        });
    });
};
exports.postPabellon = (req, res) => {
    const objPabellon = sequellize_1.Pabellon.build(req.body);
    // el body y el modelo tiene que coincidir
    // const objPabellon = Pabellon.build({
    //     pabellon_nom: req.body.pabellon_nom
    // })
    // guardando el objeto pabellon
    if (!req.body.pabellon_nom) {
        res.status(400).json({
            ok: false,
            message: 'No se recibieron todos los campos en el request',
            content: ''
        });
        return;
    }
    objPabellon.save().then((objPabellonCreado) => {
        res.status(201).json({
            ok: true,
            content: objPabellonCreado,
            message: 'Pabellon creado correctamente'
        });
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error al obtener los datos",
            content: ' '
        });
    });
};
exports.getPabellonesById = (req, res) => {
    sequellize_1.Pabellon.findByPk(req.params.id).then((objPabellon) => {
        if (objPabellon) {
            res.status(200).json({
                message: 'ok',
                pabellon: objPabellon
            });
        }
        else {
            res.status(500).json({
                message: 'error',
                content: 'No se encontro el pabellon'
            });
        }
    }).catch((error) => {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error al obtener los datos",
            content: ''
        });
    });
};
exports.updatePabellon = (req, res) => {
    sequellize_1.Pabellon.update({
        pabellon_nom: req.body.pabellon.pabellon_nom
    }, {
        where: {
            pabellon_id: req.body.pabellon.pabellon_id
        }
    }).then((pabActualizado) => {
        sequellize_1.Pabellon.findByPk(pabActualizado[0]).then((objPabellon) => {
            res.status(200).json({
                message: 'ok',
                content: objPabellon
            });
        });
    }).catch((error) => {
        res.status(501).json({
            message: "error",
            content: error
        });
    });
};
exports.getAulasXPabellon = (req, res) => {
    sequellize_1.Pabellon.findAll({
        include: [{
                model: sequellize_1.Aula
            }]
    }).then((resultado) => {
        res.status(200).json({
            message: 'ok',
            content: resultado
        });
    });
};
exports.getAulasByPabellonId = (req, res) => {
    sequellize_1.Pabellon.findAll({
        where: {
            pabellon_id: req.params.id
        },
        include: [{
                model: sequellize_1.Aula,
                include: [{
                        model: sequellize_1.TipoAula
                    }]
            }]
    }).then((resultado) => {
        res.status(200).json({
            message: 'ok',
            content: resultado
        });
    });
};
