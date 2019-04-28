const searchForm = document.querySelector("form");
const specialties = document
  .getElementById("specialties-container")
  .addEventListener("click", getSpecialties);
const stateName = document
  .getElementById("stateName-container")
  .addEventListener("click", getState);
const search = document
  .getElementById("search")
  .addEventListener("click", searchQuery);
const searchedResults = document.getElementById("search-output");

searchForm.addEventListener("click", e => {
  e.preventDefault();
  // searchForm.reset();
});

function getSpecialties() {
  const base =
    "https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/conditions?";
  const apikey = "user_key=95947cfaec1b5458129c9ae00ba494e0";
  fetch(base + apikey)
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.data.forEach(specialty => {
        output += `<option value=${specialty.name}>${specialty.name}</option>`;
      });
      document.getElementById("specialties-container").innerHTML = output;
    })
    .catch(error => {
      console.log(error);
    });
}

function getState() {
  fetch("stateNames.json")
    .then(res => res.json())
    .then(data => {
      let result = "";
      data.forEach(stateNames => {
        result += `<option value=${stateNames.abbreviation}>${
          stateNames.name
        }</option>`;
      });
      document.getElementById("stateName-container").innerHTML = result;
    })
    .catch(error => {
      console.log(error);
    });
}

function searchQuery() {
  // return new Promise((res, reject) => {
  const stateValue = document.getElementById("stateName-container");
  console.log(stateValue.value.toLowerCase());
  const specialtyValue = document.getElementById("specialties-container");
  console.log(specialtyValue.value.toLowerCase());
  const genderValue = document.getElementById("gender-container");
  console.log(genderValue.value);

  const base =
    "https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/doctors?";
  const specialty = `query=${specialtyValue.value.toLowerCase()}`;
  const stateName = `&location=${stateValue.value.toLowerCase()}`;
  const gender = `&gender=${genderValue.value}`;
  const limit = `&limit=10`;
  const ratingSort = `&sort=rating-desc`;
  const apikey = "&user_key=95947cfaec1b5458129c9ae00ba494e0";

  fetch(base + specialty + stateName + gender + limit + ratingSort + apikey)
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      return updateOutput(data.data);
    });
}

function updateOutput(data) {
  console.log(data);
  let output = "";
  data.map(doctor => {
    console.log(doctor);
    doctor.practices.map(practice => {
      console.log(practice);
    });
    90;
    output += `
    <div class="container-card">
    <img src=${doctor.profile.image_url} alt=${doctor.profile.first_name} ${
      doctor.profile.last_name
    } />
    
    <div class="textbox-card">
   <h6 class="title-card"> Name: ${doctor.profile.first_name} ${
      doctor.profile.last_name
    }</h6>
   <p class="text-card"> Gender: ${doctor.profile.gender}</p>
    </div>
    </div>`;
  });
  searchedResults.innerHTML = output;
}
