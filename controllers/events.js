const {response} = require('express');
const Evento = require('../models/Evento');

const getEventos = async(req, res = response) => {
    try {
        const eventos = await Evento.find().populate("user", "name email");
        res.status(200).json({
            ok: true,
            eventos,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin"
        });
    }
}

const crearEvento = async(req, res = response) => {
    const evento = new Evento(req.body)
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        
        res.status(201).json({
            ok: true,
            evento: eventoGuardado,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin"
        });
    }
}

const actualizarEvento = async(req, res = response) => {
    const eventoId = req.params.id
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese id"
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de editar este evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin"
        });
    }
}

const eliminarEvento = async(req, res = response) => {
    const eventoId = req.params.id
    try {
        const evento = await Evento.findById(eventoId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese id"
            })
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: "No tiene privilegio de eliminar este evento"
            })
        }

        await Evento.findByIdAndDelete(eventoId);

        res.status(200).json({
            ok: true
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Por favor hable con el admin"
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}