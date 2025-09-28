import axios from "axios";

const api_key = "52463480-0d50310a478010cdb93f02561";
const base_url = "https://pixabay.com/api/";

export async function getImgByQuery(query, page) {
    try{
    const response = await axios.get(base_url, {
        params:{
            key: api_key,
            q: query,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page:15,
            page: page,
        },
    } );
    return response.data;
    } catch (error) {
        console.error("Помилка при запиті Pixabay:", error);
    throw error; 
    }
}

