import axios from 'axios';

const API_KEY = "44900645-90bb6bb627b06b4b3923afb1e";
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function fetchImages(query, page = 1) {
    const response = await axios.get(`${BASE_URL}`, {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: page,
            per_page: PER_PAGE
        }
    });
    return response.data;
}