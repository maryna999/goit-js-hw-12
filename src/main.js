import { fetchImages } from './js/pixabay-api.js';
import { renderImages, clearGallery, showError, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, scrollPage } from './js/render-functions.js';

let query = '';
let page = 1;
let totalHits = 0;

document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    query = document.getElementById('search-input').value.trim();
    
    if (query === '') {
        iziToast.warning({
            title: 'Warning',
            message: 'Please enter a search query',
        });
        return;
    }

    page = 1;
    clearGallery();
    hideLoadMoreButton();
    showLoader();

    try {
        const data = await fetchImages(query, page);
        totalHits = data.totalHits;
        if (data.hits.length === 0) {
            showError('Sorry, there are no images matching your search query. Please try again!');
        } else {
            renderImages(data.hits);
            if (data.hits.length < totalHits) {
                showLoadMoreButton();
            }
        }
    } catch (error) {
        showError('An error occurred while fetching images. Please try again later.');
    } finally {
        hideLoader();
    }
});

document.getElementById('load-more').addEventListener('click', async () => {
    page += 1;
    showLoader();

    try {
        const data = await fetchImages(query, page);
        renderImages(data.hits);

        const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();
        scrollPage(cardHeight * 2);

        if (page * 15 >= totalHits) {
            hideLoadMoreButton();
            iziToast.info({
                title: 'Info',
                message: "We're sorry, but you've reached the end of search results.",
            });
        }
    } catch (error) {
        showError('An error occurred while fetching images. Please try again later.');
    } finally {
        hideLoader();
    }
});
