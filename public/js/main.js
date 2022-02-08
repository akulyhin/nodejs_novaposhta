const testHost = 'http://localhost:3031';
const workHost = 'https://ak-np.herokuapp.com';
const newServer = 'http://159.224.166.89';



// axios.get(`${workHost}/auth/auth`, {
//     headers: {
//         authorization: 'Bearer ' + localStorage.getItem('token')
//     }
// })
// .then(res => res)
// .catch(err => {
//     window.location.href = `${window.location.href}login.html`;
// });


const cityForm = document.getElementById('city');
const city_autocomplete = document.getElementById('city_autocomplete');
const warehouseForm = document.getElementById('warehouse');
const warehouse_autocomplete = document.getElementById('warehouse_autocomplete');
const addressForm = document.getElementById('address');
const address_autocomplete = document.getElementById('address_autocomplete');

let cityRef = '';

warehouse_autocomplete.addEventListener('click', (e) => {
    warehouseForm.value = e.target.innerText;
    warehouse_autocomplete.innerHTML = '';
    warehouse_autocomplete.classList.remove('active');
});

address_autocomplete.addEventListener('click', (e) => {
    addressForm.value = e.target.innerText;
    address_autocomplete.innerHTML = '';
    address_autocomplete.classList.remove('active');
});

city_autocomplete.addEventListener('click', (e) => {
    cityForm.value = e.target.innerText;
    cityRef = e.target.getAttribute('data-id');
    city_autocomplete.innerHTML = '';
    city_autocomplete.classList.remove('active');
});

cityForm.addEventListener('input', debounce((e) => {

    if (!e.target.value.length) {
        city_autocomplete.innerHTML = '';
        warehouseForm.value = '';
        addressForm.value = '';
        warehouse_autocomplete.innerHTML = '';
        warehouse_autocomplete.classList.remove('active');
        city_autocomplete.classList.remove('active');
    }

    if (e.target.value.length) {
        axios.post(`${workHost}/api/novaposhta/getCities`, {
            "query": e.target.value
        })
        .then(res => {
            city_autocomplete.innerHTML = '';
            city_autocomplete.classList.remove('active');
            city_autocomplete.classList.add('active');
            res.data.data.forEach(item => {
                city_autocomplete.insertAdjacentHTML('beforeend', `<li data-id="${item.Ref}">${item.DescriptionRu}</li>`) 
            })
        });

    }
}, 200))

warehouseForm.addEventListener('input', debounce((e) => {
    if (!e.target.value.length) {
        warehouse_autocomplete.innerHTML = '';
        warehouse_autocomplete.classList.remove('active');
    }

    else {
        axios.post(`${workHost}/api/novaposhta/getWarehouses`, {
            "Ref": cityRef,
            "query": e.target.value,
        })
        .then(res => {
            warehouse_autocomplete.innerHTML = '';
            warehouse_autocomplete.classList.add('active');
            res.data.data.forEach(item => {
                warehouse_autocomplete.insertAdjacentHTML('beforeend', `<li>${item.DescriptionRu}</li>`);
            })
        })
    }
}, 200))


addressForm.addEventListener('input', debounce((e) => {
    if (!e.target.value.length) {
        address_autocomplete.innerHTML = '';
        address_autocomplete.classList.remove('active');
        console.log('test');
    }

    else {
        axios.post(`${workHost}/api/novaposhta/getAddress`, {
            "Ref": cityRef,
            "query": e.target.value,
        })
        .then(res => {
            address_autocomplete.innerHTML = '';
            address_autocomplete.classList.add('active');
            res.data.data.forEach(item => {
                address_autocomplete.insertAdjacentHTML('beforeend', `<li>${item.StreetsType} ${item.Description}</li>`);
            })
        })
    }
}, 200))


const logout = document.getElementById('logout');

logout.addEventListener('click', (e) => {

    axios.get(`${workHost}/auth/logout`, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
    .then(res => {
        console.log(res);
        if (res.status === 204) {
            localStorage.removeItem('token');
            window.location.href = `${window.location.href}login.html`;
        }
    })
    .catch(err => console.log(err)) 
})