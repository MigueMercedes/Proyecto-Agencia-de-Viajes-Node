import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {
    //consultar 3 viajes del modelo Viaje
    const promisesDB = [];
    promisesDB.push(Viaje.findAll({ limit: 3 }));
    promisesDB.push(Testimonial.findAll({ limit: 3 }));
    try {
        const resultado = await Promise.all(promisesDB);
        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {
    //Consultar DB
    const viajes = await Viaje.findAll();
    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    });
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } }); //donde el slug igual a viaje

        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error);
    }
}

const paginaTestimoniales = async (req, res) => {
    try {
        const testimoniales = await Testimonial.findAll({
            order: [['createdAt', 'DESC']] // Corregir el nombre de la columna a 'createdAt'
        });
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
}


export { paginaInicio, paginaNosotros, paginaViajes, paginaTestimoniales, paginaDetalleViaje };