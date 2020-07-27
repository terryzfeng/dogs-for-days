// const BREEDS_URL = "https://dog.ceo/api/breeds/image/random";

// function addDoggo() {
//     // show loading spinner

//     fetch(BREEDS_URL)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data.message);
//             const img = document.createElement('img');
//             img.src = data.message;
//             img.alt = 'cute dog';

//             document.querySelector('.doggos').appendChild(img);

//             // stop loading spinner
//         });
// }
// document.querySelector('.add-doggo').addEventListener('click', addDoggo)

const BREEDS_ALL = "https://dog.ceo/api/breeds/list/all";
const select = document.querySelector(".breeds");
const dog = document.querySelector(".dog-img");
const instr = document.querySelectorAll(".pick")

const spinner = document.querySelector(".spinner");

// functions
function getDog(url) {
    // Show Loading Spinner
    spinner.classList.add("show");
    dog.classList.remove("show");
    instr[0].style.display = "none";
    instr[1].style.display = "none";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            dog.src = data.message;
        });
}

fetch(BREEDS_ALL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        const breeds = Object.keys(data.message);

        const blank = document.createElement("option");
        blank.value = "";
        blank.innerText = "";
        select.appendChild(blank);
        for (let i = 0; i < breeds.length; i++) {
            const option = document.createElement("option");
            option.value = breeds[i];
            option.innerText = breeds[i].charAt(0).toUpperCase() + breeds[i].slice(1);
            select.appendChild(option);
        }
    });

select.addEventListener("change", function (e) {
    if (e.target.value !== "") {
        let url = `https://dog.ceo/api/breed/${e.target.value}/images/random`;
        getDog(url);
    }
});

dog.addEventListener("click", function() {
    if (select.value !== "") {
        let url = `https://dog.ceo/api/breed/${select.value}/images/random`;
        getDog(url);
    }
})
// When image is loaded, stop load spinner
dog.addEventListener("load", function () {
    spinner.classList.remove("show");
    dog.classList.add("show");
});
