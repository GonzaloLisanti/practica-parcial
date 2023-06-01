import { Provincia } from "../types/Provincia";
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

interface Props {
    provincia?: Provincia | null;
    onSubmit: (provincia: Provincia) => void;
    onCancel: () => void;
}

const ProvinciaForm: React.FC<Props> = ({ provincia, onSubmit, onCancel }) => {
    const [formProvincia, setFormProvincia] = useState<Provincia>(provincia || {
        id: 0,
        nombre: '',
        capital: '',
        poblacion: 0,
        superficie: 0,
        nroDepartamentos: 0,
        abreviatura: '',
        bandera: '',
    });

    const [imageUrl, setImageUrl] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormProvincia({ ...formProvincia, [e.target.name]: e.target.value });
        if (e.target.name === 'bandera') {
            setImageUrl(e.target.value);
        }
    };

    useEffect(() => {
        const img = new Image();
        img.src = imageUrl;
    }, [imageUrl]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formProvincia);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formNombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" name="nombre" value={formProvincia.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formCapital">
                <Form.Label>Capital</Form.Label>
                <Form.Control type="text" name="capital" value={formProvincia.capital} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formPoblacion">
                <Form.Label>Poblacion</Form.Label>
                <Form.Control type="number" name="poblacion" value={formProvincia.poblacion} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formSuperficie">
                <Form.Label>Superficie</Form.Label>
                <Form.Control type="number" name="superficie" value={formProvincia.superficie} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formNroDepartamentos">
                <Form.Label>Numero de Departamentos</Form.Label>
                <Form.Control type="number" name="nroDepartamentos" value={formProvincia.nroDepartamentos} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formAbreviatura">
                <Form.Label>Abreviatura</Form.Label>
                <Form.Control type="text" name="abreviatura" value={formProvincia.abreviatura} onChange={handleChange} required />
            </Form.Group>
            <Form.Group controlId="formImagen">
                <Form.Label>Bandera</Form.Label>
                <Form.Control
                    type="text"
                    name="bandera"
                    value={formProvincia.bandera}
                    onChange={handleChange}
                    required
                />
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
export default ProvinciaForm;