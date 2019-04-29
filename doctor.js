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

//preventing default settings in form
searchForm.addEventListener("click", e => {
  e.preventDefault();
});

//getting the list of specialities to show in drop down menu
function getSpecialties() {
  fetch(
    "https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/conditions?user_key=aa098b4c24d266260d0a796f0e9b78f5"
  )
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

//getting state names and outputting abbreviated letters to use in API
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

//search query in betterdoctor's API to get data about doctors with specified categories: location, specialty, and gender
function searchQuery() {
  const stateValue = document.getElementById("stateName-container");
  const specialtyValue = document.getElementById("specialties-container");
  const genderValue = document.getElementById("gender-container");

  const base =
    "https://cors-anywhere.herokuapp.com/https://api.betterdoctor.com/2016-03-01/doctors?";
  const specialty = `query=${specialtyValue.value.toLowerCase()}`;
  const stateName = `&location=${stateValue.value.toLowerCase()}`;
  const gender = `&gender=${genderValue.value}`;
  const limit = `&limit=25`;
  const ratingSort = `&sort=rating-desc`;
  const apikey = "&user_key=aa098b4c24d266260d0a796f0e9b78f5";
  //sorting by overall rating first
  fetch(base + specialty + stateName + gender + limit + ratingSort + apikey)
    .then(function(response) {
      return response.json();
    })
    .then(data => {
      return updateOutput(data.data);
    });
}

function updateOutput(data) {
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
