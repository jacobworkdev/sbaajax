import { searchArt as searchArt } from "./ax.js"


// instantiating the elements of html in here to dynamically control the document
const titleField = document.getElementById('titleField')
const pic = document.getElementById('pic')
const buttons = document.getElementById('buttons')
const prev = document.getElementById('prevArt')
const next = document.getElementById('nextArt')
const getRand = document.getElementById('getRandom')
const textField = document.getElementById('textField')
const search = document.getElementById('search')
const searchResults = document.getElementById('searchResults')



function getImage(imgId) {
    const imageApi = `https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`
    return imageApi
}


async function reqArt(page) {
    const req = await axios(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=10`)

    return req.data.data
}


function getDesc(art) {

    let desc = art.description
    if (desc == null) {
        desc = 'There is no description available'

    }

    let altdesc = `
        <b>Author:</b> ${art.artist_display}<br>
        <b>Title:</b> ${art.title}
        <br><br>
        <b>Description:</b><br>${desc}
        `

    return altdesc
}



async function start() {

    let page = 0
    let counter = 0;
    let data = await reqArt(page); // Fetch the data
    if (!data || data.length === 0) {
        alert("No art data available.");
        return;
    }

    // Function to update the UI
    async function updateUI() {
        document.body.style.cursor = 'default'
        pic.src = getImage(data[counter].image_id);
        textField.innerHTML = getDesc(data[counter]);
    }

    // Initialize the first item
    updateUI();

    // Add event listeners for navigation
    next.addEventListener('click', async () => {
        if (counter < data.length - 1) {
            counter++;
            updateUI();
        } else {
            // alert('This is the last art. Loading more');
            document.body.style.cursor = 'loading'
            page++
            data = await reqArt(page)

            counter = 0

        }
    });

    prev.addEventListener('click', () => {
        if (counter > 0) {
            counter--;
            updateUI();
        } else {
            alert('This is the first item loaded.');
        }
    });



    search.addEventListener('keyup', async (e) => {
        if (e.code === 'Enter' && search.value.trim() !== '') {
            searchResults.innerHTML=''
            const req = await searchArt(search.value)
            
            
            
            
            
            document.body.appendChild(searchResults)
            for (let i = 0; i < req.length - 1; i++) {
                try {
                    const resultImg = document.createElement('img')
                    resultImg.src =  getImage( await getImageIdByApi(req[i].api_link))
                    console.log(req[i].api_link)

                    const resultTxt = document.createElement('p')
                    
                    resultTxt.innerHTML = await getDescSearch(req[i].api_link)

                    //appending results
                    let resultDiv = document.createElement('div')
                    resultDiv.appendChild(resultImg)
                    resultDiv.append(resultTxt)
                    searchResults.appendChild(resultDiv)
                } catch (e) {
                    console.log(e)
                }

            }
        }
    });
}


async function getDescSearch(api_link){

    let req = await axios(api_link)
    let data= req.data.data
    let desc = data.description
    if (desc == null) {
        desc = 'There is no description available'

    }
    let artistTitle=data.artist_title||'unknown'
    console.log('line 141',data)
    let altdesc = `
        <b>Artist display:</b> ${data.artist_display}<br>
        <b>Artist Title:</b>${artistTitle}<br>
        <b>Title:</b> ${data.title}<br>
        <b>Dimensions:</b> ${data.dimensions}<br>
        <b>Credits:</b> ${data.credit_line}<br>
        <b>Place of origin:</b> ${data.place_of_origin}<br>
        <br>
        <b>Description:</b><br>${desc}

        `

        return altdesc


}

async function getImageIdByApi(apilink) {
    const req = await axios(apilink)
    console.log(req.data.data.image_id)
    return req.data.data.image_id

}
start()

async function testing() {
    const randomValue = Date.now();

    return `https://picsum.photos/2560/1440?random=${randomValue}`;
}
// getRand.addEventListener('click', testing)



