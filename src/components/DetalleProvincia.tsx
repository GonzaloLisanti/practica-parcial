import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Provincia } from "../types/Agenda";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";


const DetalleProvincia = () => {
    const { id } = useParams<{ id: string }>();
    const [provincia, setProvincia] = useState<Provincia | undefined>();

    useEffect(() => {
        fetchProvincias();
    }, []);

    const fetchProvincias = async () => {
        try {
            const response = await axios.get(`http://168.194.207.98:8081/api_provincia/get_provincia.php?id=${id}`);
            setProvincia(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!provincia) {
        return <div>Cargando...</div>;
    }

    return (
        <Container fluid className="mt-3">
            <Row>
                <Col>
                    <h3>Provincia:</h3>
                    <h3>Abreviatura: </h3>
                    <h3>Capital: </h3>
                    <h3>Bandera: </h3>
                    <h3>Población: </h3>
                    <h3>Superficie: </h3>
                    <h3>N° Departamentos: </h3>
                </Col>
                <Col>
                    <h4>{provincia.nombre}</h4>
                    <h4>{provincia.abreviatura}</h4>
                    <h4>{provincia.capital}</h4>
                    <h4>{provincia.bandera}</h4>
                    <h4>{provincia.poblacion}</h4>
                    <h4>{provincia.superficie}</h4>
                    <h4>{provincia.nroDepartamentos}</h4>
                </Col>
            </Row>
            <Link to="/provincias" className="btn btn-primary mt-3">Volver</Link>
        </Container>
    );
}
export default DetalleProvincia;