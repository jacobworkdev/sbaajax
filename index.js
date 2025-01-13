// instantiating the elements of html in here to dynamically control the document
const titleField = document.getElementById('titleField')
const pic = document.getElementById('pic')
const buttons = document.getElementById('buttons')
const prev = document.getElementById('prevArt')
const next = document.getElementById('nextArt')
const getRand = document.getElementById('getRandom')
const textField = document.getElementById('textField')

const apiLink = 'https://api.artic.edu/api/v1/artworks?limit=50'

function getImage(imgId){
    const imageApi=`https://www.artic.edu/iiif/2/${imgId}/full/843,/0/default.jpg`
    return imageApi
}


async function reqArt() {
    const req = await axios(apiLink)

    return req.data.data
}



// async function start(counter) {
//     let data =await reqArt()

//     if(counter==data.length){alert('this is the last Art')}else{
//     pic.src =getImage(data[counter].image_id)
//     textField.innerHTML=data[counter].description

//     next.addEventListener('click', ()=>{
//         counter++
//         start(counter)

//     })

//     prev.addEventListener('click', ()=>{
//         if(counter!==0){
//         counter--
//         start(counter)
//         }else{
//             alert('this is the first item loaded')
//         }
//     })

//     }
// }


async function start() {
    const data = await reqArt(); // Fetch the data
    let counter = 0;

    if (!data || data.length === 0) {
        alert("No art data available.");
        return;
    }

    // Function to update the UI
    function updateUI() {
        pic.src = getImage(data[counter].image_id);
        textField.innerHTML = data[counter].description;
    }

    // Initialize the first item
    updateUI();

    // Add event listeners for navigation
    next.addEventListener('click', () => {
        if (counter < data.length - 1) {
            counter++;
            updateUI();
        } else {
            alert('This is the last art.');
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
}


start()

async function getArt() {

}