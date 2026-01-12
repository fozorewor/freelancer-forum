/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// Write a function that returns a freelancer object with a randomly generated name, occupation, and rate according to the provided constants.
function createFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    PRICE_RANGE.min +
    Math.floor(Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min + 1));

  return { name, occupation, rate };
}

// Initialize a state variable to an array of `NUM_FREELANCERS` freelancer objects.
const freelancers = Array.from(
  { length: NUM_FREELANCERS },
  createFreelancer
);

// Function to calculate average rate of all freelancers in state.
function getAverageRate(list) {
  const total = list.reduce((sum, freelancer) => sum + freelancer.rate, 0);
  return (total / list.length).toFixed(2);
}

// State var to store average rate for all freelancers.
const averageRate = getAverageRate(freelancers);

// Component for single freelancer.
function FreelancerRow({ name, occupation, rate }) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>$${rate}</td>
  `;

  return tr;
}

// Component to represent an array of freelancers.
function FreelancerTable(list) {
  const table = document.createElement("table");

  table.innerHTML = `
    <thead>
      <tr>
        <th>NAME</th>
        <th>OCCUPATION</th>
        <th>RATE</th>
      </tr>
    </thead>
    <tbody></tbody>
  `;

  const tbody = table.querySelector("tbody");

  list.forEach(freelancer => {
    tbody.appendChild(FreelancerRow(freelancer));
  });

  return table;
}

// Component for average rate of all freelancers
function AverageRate(rate) {
  const p = document.createElement("p");
  p.textContent = `The average rate is $${rate}.`;
  return p;
  }

// render function mounting the application onto the document
function render() {
  const app = document.querySelector("#app");
  app.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Freelancer Forum";

  app.appendChild(title);
  app.appendChild(AverageRate(averageRate));
  app.appendChild(FreelancerTable(freelancers));
}

render();