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
});

function getSpecialties() {
  const base =
    "https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/conditions?";
  const apikey = "user_key=aa098b4c24d266260d0a796f0e9b78f5";
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
  const stateValue = document.getElementById("stateName-container");
  const specialtyValue = document.getElementById("specialties-container");
  const genderValue = document.getElementById("gender-container");

  const base =
    "https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/doctors?";
  const specialty = `query=${specialtyValue.value.toLowerCase()}`;
  const stateName = `&location=${stateValue.value.toLowerCase()}`;
  const gender = `&gender=${genderValue.value}`;
  const limit = `&limit=10`;
  const ratingSort = `&sort=rating-desc`;
  const apikey = "&user_key=aa098b4c24d266260d0a796f0e9b78f5";

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
  {
    data.length
      ? data.map(doctor => {
          output += `
      <div class="container-card">
      <img src=${doctor.profile.image_url} alt=
      ${doctor.profile.first_name} 
      ${doctor.profile.last_name} />
      <div class="textbox-card">
     <h6 class="title-card"> Name: 
     ${doctor.profile.first_name} 
     ${doctor.profile.last_name}</h6>
     <p class="text-card"> Gender: 
     ${doctor.profile.gender}</p>
     <p class="text-card"> Practice: 
     ${doctor.specialties.length ? doctor.specialties[0].name : null}</p>    
     <p class="text-card"> Location(s): <br>
     ${
       doctor.practices.length
         ? doctor.practices.map(
             practice =>
               practice.visit_address.street +
               " " +
               (practice.visit_address.street2 || " ") +
               " " +
               practice.visit_address.city +
               " " +
               practice.visit_address.state_long +
               " " +
               practice.visit_address.zip +
               "<br>"
           )
         : null
     }</p>    
      </div>
      </div>`;
        })
      : (output += "No Results, please search again");
  }
  searchedResults.innerHTML = output;
}
