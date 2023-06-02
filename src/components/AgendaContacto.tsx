import { useEffect, useState } from "react";
import { Agenda } from "../types/Agenda";
import axios from "axios";
import GenericTable from "./GenericTable";
import { Link } from "react-router-dom";

const AgendaContacto: React.FC = () => {
    const [contactos, setContactos] = useState<Agenda[]>([]);

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
        create: false,
        update: false,
        delete: false,
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

    return (
        <div>
            <h1>AGENDA CONTACTOS</h1>
            <GenericTable data={contactos}
                columns={columns}
                actions={actions}
            />
            <Link to="/" className="btn btn-primary mt-3">Volver</Link>
        </div>

    )
}
export default AgendaContacto;