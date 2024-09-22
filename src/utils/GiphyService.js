const axios = require('axios');

async function getGifForDifficulty(difficulty) {
    // const GIPHY_API_KEY = 'RLto3NGqXdAPQwyvHc1MlRQx7MqbBm4N'; 
    try {
        // Hacemos una solicitud GET a la API de Giphy para buscar gifs basados en la dificultad
        const response = await axios.get(process.env.GIPHY_API, {
            params: {
                api_key: process.env.GIPHY_API_KEY,
                q: difficulty,  // Buscar gifs con la palabra clave basada en la dificultad
                limit: 10       // Limitar la búsqueda a 10 gifs para elegir uno al azar
            }
        });

        const gifs = response.data.data;
        if (gifs.length > 0) {
            // Elegir un gif aleatoriamente
            const randomIndex = Math.floor(Math.random() * gifs.length);
            return gifs[randomIndex].images.original.url; // URL del gif seleccionado
        } else {
            throw new Error('No se encontraron gifs para esta dificultad');
        }
    } catch (error) {
        throw new Error('Error al obtener el gif de Giphy');
    }
}

module.exports = { getGifForDifficulty };
