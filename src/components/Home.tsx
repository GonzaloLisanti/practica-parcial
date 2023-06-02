import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="container text-center">
            <h1 className="mt-5">Parcial Agendas</h1>
            <hr className="my-4" />
            <Link to="/contactos" className="d-grid gap-2 col-6 mx-auto mb-4">
                <Button variant="primary" size="lg">Agenda Contacto</Button>
            </Link>
            <Link to="/admin/contactos" className="d-grid gap-2 col-6 mx-auto">
                <Button variant="primary" size="lg">Administrar Contactos</Button>
            </Link>
        </div>
    );
};

export default Home;
