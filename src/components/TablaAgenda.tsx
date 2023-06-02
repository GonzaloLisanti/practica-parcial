import { useEffect, useState } from "react";
import { Agenda } from "../types/Agenda";
import axios from "axios";
import GenericTable from "./GenericTable";
import { Modal } from "react-bootstrap";
import TablaAgendaForm from "./TablaAgendaForm";
import { Link } from "react-router-dom";

const TablaAgenda: React.FC = () => {
    const [contactos, setContactos] = useState<Agenda[]>([]);
    const [selectedContacto, setSelectedContacto] = useState<Agenda | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const columns = [
        {
            title: 'Foto',
            field: 'fotourl',
            render: (row: Agenda) => (
                <img src={row.fotourl} alt={row.nombre} className="img-fluid w-50" />
            ),
        },
        { title: 'Apellido', field: 'apellido' },
        { title: 'Nombre', field: 'nombre' },
        { title: 'Teléfono', field: 'telefono' },
        { title: 'Email', field: 'email' },
    ];

    const actions = {
        create: true,
        update: true,
        delete: true,
        verDetalles: false,
    };

    useEffect(() => {
        fetchContactos();
    }, []);

    const fetchContactos = async () => {
        try {
            const response = await axios.get('http://168.194.207.98:8081/api_contacto/get_contactos.php');
            const contactosData = response.data.map((contacto: Agenda) => {
                return {
                    ...contacto
                };
            });
            setContactos(contactosData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAdd = () => {
        setSelectedContacto(null);
        setIsFormOpen(true);
    };

    const handleUpdate = (agenda: Agenda) => {
        setSelectedContacto(agenda);
        setIsFormOpen(true);
    };

    const handleDelete = async (agenda: Agenda) => {
        await axios.delete(`http://168.194.207.98:8081/api_contacto/delete_contacto.php?id=${agenda.id}`);
        fetchContactos();
    };

    const handleSubmit = async (agenda: Agenda) => {
        if (agenda.id === 0) {
            await axios.post('http://168.194.207.98:8081/api_contacto/post_contacto.php', agenda);
        } else {
            await axios.put(`http://168.194.207.98:8081/api_contacto/put_contacto.php`, agenda);
        }
        setIsFormOpen(false);
        fetchContactos();
    };

    const handleCancel = () => {
        setIsFormOpen(false);
    };

    return (
        <div>
            <h1>TABLA AGENDA ADMIN</h1>
            <GenericTable
                data={contactos}
                columns={columns}
                actions={actions}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />

            <Modal show={isFormOpen} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedContacto ? "Editar Contacto" : "Agregar Contacto"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TablaAgendaForm
                        agenda={selectedContacto}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </Modal.Body>
            </Modal>
            <Link to="/" className="btn btn-primary mt-3">Volver</Link>
        </div>
    );
};

export default TablaAgenda;
