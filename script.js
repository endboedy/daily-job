
let data = [];
const tableBody = document.querySelector("#jobTable tbody");
const formContainer = document.getElementById("formContainer");
const toggleBtn = document.getElementById("toggleForm");
const filterEquip = document.getElementById("filterEquip");

toggleBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
  toggleBtn.textContent = formContainer.classList.contains("hidden") ? "+" : "-";
});

document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = {
    equip: "AUTO", // default or from selection
    description: document.getElementById("description").value,
    jobType: document.getElementById("jobType").value,
    start: document.getElementById("start").value,
    end: document.getElementById("end").value,
    status: document.getElementById("status").value
  };
  data.push(newItem);
  renderTable();
  e.target.reset();
});

function renderTable() {
  tableBody.innerHTML = "";
  const filtered = filterEquip.value
    ? data.filter((d) => d.equip === filterEquip.value)
    : data;

  filtered.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${item.equip}</td>
      <td contenteditable="true">${item.description}</td>
      <td contenteditable="true">${item.jobType}</td>
      <td contenteditable="true">${item.start}</td>
      <td contenteditable="true">${item.end}</td>
      <td contenteditable="true">${item.status}</td>
      <td><button onclick="editRow(${index})">Save</button></td>
    `;

    tableBody.appendChild(row);
  });

  updateFilterOptions();
}

function editRow(index) {
  const row = tableBody.rows[index];
  data[index].description = row.cells[1].textContent;
  data[index].jobType = row.cells[2].textContent;
  data[index].start = row.cells[3].textContent;
  data[index].end = row.cells[4].textContent;
  data[index].status = row.cells[5].textContent;
}

function updateFilterOptions() {
  const equips = [...new Set(data.map((d) => d.equip))];
  filterEquip.innerHTML = `<option value="">All</option>`;
  equips.forEach((eq) => {
    const opt = document.createElement("option");
    opt.value = eq;
    opt.textContent = eq;
    filterEquip.appendChild(opt);
  });
}

filterEquip.addEventListener("change", renderTable);
