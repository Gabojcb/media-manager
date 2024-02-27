export function processImage({ url, fileSizeKB, fileName }) {
    const imagesLocal = localStorage.getItem('images');
    const imagesStorage = imagesLocal ? JSON.parse(imagesLocal) : [];
    imagesStorage.push({ url, fileSizeKB, fileName });
    localStorage.setItem("images", JSON.stringify(imagesStorage));
};

export function deleteImage({ url }) {
    let imagesStorage = JSON.parse(localStorage.getItem('images'));
    imagesStorage = imagesStorage.filter((image) => image.url !== url);
    localStorage.setItem('images', JSON.stringify(imagesStorage))
}