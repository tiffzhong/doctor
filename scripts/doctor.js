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

function getSpecialties() {
  const base = "https://api.betterdoctor.com/2016-03-01/conditions?";
  const apikey = "user_key=95947cfaec1b5458129c9ae00ba494e0";
  fetch(base + apikey)
    .then(res => res.json())
    .then(data => {
      let output = "";
      data.data.forEach(specialty => {
        // let sorted = specialty.sort(function() {
        //   return a - b;
        // });
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

function searchQuery(selectedState, specialty, gender) {
  const base = "https://api.betterdoctor.com/2016-03-01/doctors?";
  // const practice = `query=${practice}`;
  // const selectedState = `&location=${selectedState}`;
  // const gender = `&gender=${gender}`;
  // const limit = `&limit=10`;
  const apikey = "&user_key=95947cfaec1b5458129c9ae00ba494e0";
  const result = fetch(base + specialty + stateName + gender + limit + apikey);
}

function queryValues(stateValue, specialtyValue, genderValue) {
  const stateV = document.getElementById(stateValue);
  const specialtyV = document.getElementById(specialtyValue);
  const genderV = document.getElementById(genderValue);
  console.log(stateV.value);
  console.log(specialtyV.value);
  console.log(genderV.value);
}

searchForm.addEventListener("click", e => {
  e.preventDefault();
  // const selectedSpecialty = searchForm.value;
  // const selectedState = "";
  // const selectedGender = "";
  searchForm.reset();
});
