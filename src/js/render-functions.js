import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    close: true,
    showCounter: true,
    enableKeyboard: true,
});

export function renderImages(images) {
    const gallery = document.querySelector('.gallery');
    const imageMarkup = images.map(image => `
        <a href="${image.largeImageURL}" class="gallery-item">
            <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item"><b>Likes</b>: ${image.likes}</p>
                <p class="info-item"><b>Views</b>: ${image.views}</p>
                <p class="info-item"><b>Comments</b>: ${image.comments}</p>
                <p class="info-item"><b>Downloads</b>: ${image.downloads}</p>
            </div>
        </a>
    `).join('');

    gallery.insertAdjacentHTML('beforeend', imageMarkup);
    lightbox.refresh();
}

export function clearGallery() {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
}

export function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
    });
}

export function showLoader() {
    document.querySelector('.loader-wrapper').style.display = 'flex';
}

export function hideLoader() {
    document.querySelector('.loader-wrapper').style.display = 'none';
}

export function showLoadMoreButton() {
    document.getElementById('load-more').style.display = 'block';
}

export function hideLoadMoreButton() {
    document.getElementById('load-more').style.display = 'none';
}

export function scrollPage(offset) {
    window.scrollBy({
        top: offset,
        behavior: 'smooth'
    });
}


