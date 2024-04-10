//TODO take from from env
// export const endpoint = 'http://localhost:4000/saas/';
 export const endpoint = 'https://devapi.stylrax.com/';


export const methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH:"PATCH",
}

export function isValidImageUrl(url) {
    // console.log("image.....",url);
    // Supported image extensions
    if (url) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'];

    // Check if the URL ends with a valid image extension
    const extension = url.split('.').pop().toLowerCase();
    if (imageExtensions.includes(extension)) {
        return true;
    }

    // Check if the URL contains a data URI for an image
    if (url.startsWith('data:image')) {
        return true;
    }
        
    }

    // Not a valid image URL
    return false;
}

