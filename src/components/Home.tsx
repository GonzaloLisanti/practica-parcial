import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Home = () => {
    return (
        <div className="container text-center">
            <h1 className="mt-5">Provincias de Argentina</h1>
            <hr className="my-4" />
            <Link to="/provincias" className="d-grid gap-2 col-6 mx-auto">
                <Button variant="primary" size="lg">Ver Provincias</Button>
            </Link>
        </div>
    );
};

export default Home;
