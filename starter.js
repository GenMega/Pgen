// Function to get URL parameter by name
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to decode a Base64-encoded string
function decodeBase64(encodedString) {
    try {
        return atob(encodedString); // Decodes a Base64 encoded string
    } catch (e) {
        console.error("Base64 decoding failed:", e);
        return null;
    }
}

// Get the "id" parameter from the URL
const idParam = getUrlParameter("id");

// Proceed if the "id" parameter exists
if (idParam) {
    // Decode the Base64 encoded id
    const decodedId = decodeBase64(idParam);

    if (decodedId) {
        const fetchUrl = `https://u.pcloud.link/publink/show?code=${decodedId}`;
        const headers = {
            'Referer': '',
            // Add any other headers as needed
        };

        fetch(fetchUrl, { headers })
            .then(response => response.text())
            .then(data => {
                const match = data.match(/"downloadlink": "(.*?)"/);
                if (match) {
                    const downloadLink = match[1].replace(/\\\//g, '/');
                    window.location.replace(downloadLink); // Redirect to the download link
                } else {
                    console.error("Download link not found in response data.");
                }
            })
            .catch(error => {
                console.error("Fetch request failed:", error);
            });
    } else {
        console.error("Decoded id is null or undefined.");
    }
} else {
    console.error("No 'id' parameter found in the URL.");
}
