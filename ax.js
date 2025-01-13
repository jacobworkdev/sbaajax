
export async function searchArt(query) {
    const req = await axios(`https://api.artic.edu/api/v1/artworks/search?q=${query}`);
    console.log( req.data.data)
    return req.data.data
}