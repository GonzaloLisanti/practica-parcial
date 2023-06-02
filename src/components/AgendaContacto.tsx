import { useEffect, useState } from "react";
import { Agenda } from "../types/Agenda";
import axios from "axios";
import GenericTable from "./GenericTable";
import { Link } from "react-router-dom";

const AgendaContacto: React.FC = () => {
    const [contactos, setContactos] = useState<Agenda[]>([]);
    const [letraSeleccionada, setLetraSeleccionada] = useState<string>("A");

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
            const contactosData: Agenda[] = response.data.map((contacto: Agenda) => {
                return {
                    ...contacto
                };
            });
            setContactos(contactosData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleLetraSeleccionada = async (letra: string) => {
        if (letra === "Todos") {
            setLetraSeleccionada(""); // Limpiar la letra seleccionada
            try {
                const response = await axios.get("http://168.194.207.98:8081/api_contacto/get_contactos.php");
                const contactosData: Agenda[] = response.data.map((contacto: Agenda) => {
                    return {
                        ...contacto
                    };
                });
                setContactos(contactosData);
            } catch (error) {
                console.error(error);
            }
        } else {
            setLetraSeleccionada(letra);
            try {
                const response = await axios.get(`http://168.194.207.98:8081/api_contacto/get_contactos.php?indice=${letra}`);
                const contactosData: Agenda[] = response.data.map((contacto: Agenda) => {
                    return {
                        ...contacto
                    };
                });
                setContactos(contactosData);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const abecedario = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    abecedario.push("Todos");

    return (
        <div>
            <h1>AGENDA CONTACTOS</h1>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2>Índice</h2>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <tbody>
                                    {[...Array(3)].map((_, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {[...Array(9)].map((_, colIndex) => {
                                                const letraIndex = rowIndex * 9 + colIndex;
                                                const letra = abecedario[letraIndex];
                                                return (
                                                    <td key={colIndex}>
                                                        <button
                                                            className={letra === letraSeleccionada ? "selected" : ""}
                                                            onClick={() => handleLetraSeleccionada(letra)}
                                                        >
                                                            {letra}
                                                        </button>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <GenericTable
                            data={contactos}
                            columns={columns}
                            actions={actions}
                        />
                        <Link to="/" className="btn btn-primary mt-3">Volver</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgendaContacto;
