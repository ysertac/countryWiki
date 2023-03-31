document.getElementById('btnSearch').addEventListener('click', function() {
    document.getElementById('neighbours').innerHTML = '';
    let text = document.getElementById('txtSearch').value;
    getCountry(text);
})


function getCountry(country) {
    const request = new XMLHttpRequest();
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    request.send();
    
    request.addEventListener('load', function() {
        let data = this.responseText;
        data = JSON.parse(data);
        setCountry(data[0]);
        const countries = data[0].borders.toString();
        
        const req = new XMLHttpRequest();
        req.open('GET', `https://restcountries.com/v3.1/alpha?codes=${countries}`);
        req.send();

        req.addEventListener('load', function() {
            const data = JSON.parse(this.responseText);
            countryNeighbours(data);
        })
    })
};




function setCountry(data) {
    let key = Object.values(data.currencies);
    let content = `
        <div class="card-header">
            Arama Sonucu
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col-12 col-md-4 text-center">
                    <img src="${data.flags.png}" alt="img" class="img-fluid" />
                </div>
                <div class="col-12 col-md-8">
                    <h3 class="card-title text-center">
                        ${data.name.common}
                    </h3>
                    <hr>
                    <div class="row">
                        <div class="col-6 col-md-4 text-center">Nüfus</div>
                        <div class="col-6 col-md-8 text-center">${(data.population / 1000000).toFixed(1)} M</div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-4 text-center">Başkent</div>
                        <div class="col-6 col-md-8 text-center">${data.capital[0]}</div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-4 text-center">Resmi Dil (ler)</div>
                        <div class="col-6 col-md-8 text-center">${Object.values(data.languages)}</div>
                    </div>
                    <div class="row">
                        <div class="col-6 col-md-4 text-center">Para Birimi</div>
                        <div class="col-6 col-md-8 text-center">${key[0].name} / ${key[0].symbol}</div>
                    </div>
                </div>
            </div>
        </div>
    
    `
    document.getElementById('cardDetails').innerHTML = content;
}

countryNeighbours = (data) => {
    document.getElementById('cardHeader').innerHTML = 'Komşu Ülkeler';
    for (let j = 0; j < data.length; j++) {
        let content =
        `
            <div class='col-md-2 col-12 mt-2'>
                <div class='card' id='card${j}'>
                    <img src='${data[j].flags.png}' class='card-img-top' height='100px'/>
                    <div class='card-body'>
                        <h6 class='card-title text-center' id='borderName${j}'>${data[j].name.common}</h6>
                    </div>
                </div>
            </div>
        `
        document.getElementById('neighbours').insertAdjacentHTML('beforeend', content);
        document.getElementById(`card${j}`).addEventListener('click', () => {
            let newVal = document.querySelector(`#borderName${j}`).innerHTML
            document.querySelector('#txtSearch').value = newVal;
            document.getElementById('neighbours').innerHTML = ""
            document.querySelector('#btnSearch').click();
        })
    }
}

function selectCountry() {
    let countryName = document.querySelector('.card h6').id;
    console.log(countryName);
}