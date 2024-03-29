import { useEffect, useState } from 'react';
import { Form, FormControl, FormLabel } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import ListaColores from './ListaColores';
import CajaColor from './CajaColor';


const FormularioColores = () => {

    const [nombreColor, setNombreColor] = useState("");
    const [codigoColor, setCodigoColor] = useState("#000");
    const [colores, setColores] = useState(JSON.parse(localStorage.getItem("colores")) || []);

    useEffect(() => {
        localStorage.setItem("colores", JSON.stringify(colores));
    }, [colores]);

    const borrarColor = (colorABorrar) => {
        const nuevaListaColores = colores.filter((color) => color.nombreColor !== colorABorrar.nombreColor);
        setColores(nuevaListaColores);
    }

    const handleSubmit =  (e) => {
        e.preventDefault();

        const color = { nombreColor, codigoColor };
        setColores([...colores, color]);
        setNombreColor("");
    }

    return (
        <div className='container mt-5'>
            <Card className='bg-dark text-light'>
                <Card.Header as="h5">Gestionar colores</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className='d-flex align-items-center justify-content-around'>
                            <CajaColor codigoColor={codigoColor}></CajaColor>
                            <div>
                                <div className='d-flex justify-content-center align-items-center my-3'>
                                    <FormLabel className='mx-3'>Selecciona el color</FormLabel>
                                    <FormControl onChange={(e) => setCodigoColor(e.target.value)} type='color'></FormControl>
                                </div>
                                <FormControl onChange={(e) => setNombreColor(e.target.value)} value={nombreColor} placeholder='Ingresa el nombre del color' type="text" required></FormControl>
                            </div>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <Button type='submit' variant="primary">Agregar Color</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            <hr className="text-light mt-4" />
            <ListaColores colores={colores} borrarColor={borrarColor}></ListaColores>
        </div>
    );
};

export default FormularioColores;