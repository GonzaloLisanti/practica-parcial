import { Agenda } from "../types/Agenda";
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

interface Props {
    agenda?: Agenda | null;
    onSubmit: (agenda: Agenda) => void;
    onCancel: () => void;
}

const TablaAgendaForm: React.FC<Props> = ({ agenda, onSubmit, onCancel }) => {
    const [formContacto, setFormContacto] = useState<Agenda>(agenda || {
        id: 0,
        fotourl: '',
        apellido: '',
        nombre: '',
        telefono: 0,
        email: ''
    });

    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormContacto({ ...formContacto, [e.target.name]: e.target.value });
        if (e.target.name === 'fotourl') {
            setImageUrl(e.target.value);
        }
    };

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
    }, [imageUrl]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formContacto);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFoto">
                <Form.Label>Foto</Form.Label>
                <Form.Control type="text" name="fotourl" value={formContacto.fotourl} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formApellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control type="text" name="apellido" value={formContacto.apellido} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={formContacto.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formTelefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control type="number" name="telefono" value={formContacto.telefono} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" value={formContacto.email} onChange={handleChange} required />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Guardar
            </Button>
            <Button variant="secondary" onClick={onCancel} className="mt-3">
                Cancelar
            </Button>

        </Form>
    )
}
export default TablaAgendaForm;