import { useEffect, useState } from "react";
import { Provincia } from "../types/Provincia";
import axios from "axios";
import GenericTable from "./GenericTable";
import { Modal } from "react-bootstrap";
import ProvinciaForm from "./ProvinciaForm";
import { Link } from "react-router-dom";

const Provincias: React.FC = () => {
    const [provincias, setProvincias] = useState<Provincia[]>([]);
    const [selectedProvincia, setSelectedProvincia] = useState<Provincia | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const columns = [
        { title: 'Provincia', field: 'nombre' },
        { title: 'Abreviatura', field: 'abreviatura' },
        { title: 'Bandera', field: 'bandera' },
    ];

    const actions = {
        create: true,
        update: true,
        delete: false,
        verDetalles: true,
    };

    useEffect(() => {
        fetchProvincias();
    }, []);

    const fetchProvincias = async () => {
        try {
            const response = await axios.get('http://168.194.207.98:8081/api_provincia/get_provincias.php');
            setProvincias(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = () => {
        setSelectedProvincia(null);
        setIsFormOpen(true);
    };

    const handleUpdate = (provincia: Provincia) => {
        setSelectedProvincia(provincia);
        setIsFormOpen(true);
    };

    const handleDelete = async (provincia: Provincia) => {
        await axios.delete(`http://168.194.207.98:8081/api_provincia/delete_provincia.php?id=${provincia.id}`);
        fetchProvincias();
    };

    const handleSubmit = async (provincia: Provincia) => {
        if (provincia.id === 0) {
            await axios.post('http://168.194.207.98:8081/api_provincia/post_provincia.php', provincia);
        } else {
            await axios.put(`http://168.194.207.98:8081/api_provincia/put_provincia.php`, provincia);
        }
        setIsFormOpen(false);
        fetchProvincias();
    };


    const handleCancel = () => {
        setIsFormOpen(false);
    };


    return (
        <div>
            <h1>LISTA DE PROVINCIAS</h1>
            <GenericTable data={provincias}
                columns={columns}
                actions={actions}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

            <Modal show={isFormOpen} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedProvincia ? "Editar Provincia" : "Agregar Provincia"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProvinciaForm
                        provincia={selectedProvincia}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Modal.Body>
            </Modal>
            <Link to="/" className="btn btn-primary mt-3">Volver</Link>
        </div>

    )
}
export default Provincias;