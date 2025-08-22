let jobs = [];
const tableBody = document.querySelector("#jobTable tbody");
const formContainer = document.getElementById("formContainer");
const toggleBtn = document.getElementById("toggleForm");
const filterEquip = document.getElementById("filterEquip");

toggleBtn.addEventListener("click", () => {
  formContainer.classList.toggle("hidden");
});

document.getElementById("addForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const equip = document.getElementById("equip").value;
  const job = {
    equip,
    description: document.getElementById("description").value,
    workOrder: document.getElementById("workOrder").value,
    status: document.getElementById("status").value,
    remarks: document.getElementById("remarks").value,
    statusJob: "",
    lines: [],
    expanded: false
  };
  jobs.push(job);
  renderTable();
  e.target.reset();
});

function renderTable() {
  tableBody.innerHTML = "";
  const filteredJobs = filterEquip.value
    ? jobs.filter((j) => j.equip === filterEquip.value)
    : jobs;

  filteredJobs.forEach((job, index) => {
    const statusC = job.lines.filter(line => line.status === "C").length;
    const totalLines = job.lines.length || 1;
    job.statusJob = `${Math.round((statusC / totalLines) * 100)}%`;

    const mainRow = document.createElement("tr");
    mainRow.innerHTML = `
      <td><button onclick="toggleLines(${index})">${job.expanded ? "-" : "+"}</button></td>
      <td>${job.equip}</td>
      <td contenteditable="true">${job.description}</td>
      <td contenteditable="true">${job.workOrder}</td>
      <td contenteditable="true">${job.status}</td>
      <td contenteditable="true">${job.remarks}</td>
      <td>${job.statusJob}</td>
      <td><button onclick="addLine(${index})">Add Line</button></td>
    `;
    tableBody.appendChild(mainRow);

    if (job.expanded) {
      job.lines.forEach((line, lineIndex) => {
        const lineRow = document.createElement("tr");
        lineRow.innerHTML = `
          <td></td>
          <td>${job.equip}</td>
          <td contenteditable="true">${line.description}</td>
          <td contenteditable="true">${line.workOrder}</td>
          <td contenteditable="true">${line.status}</td>
          <td contenteditable="true">${line.remarks}</td>
          <td></td>
          <td>
            <button onclick="saveLine(${index}, ${lineIndex})">Save</button>
            <button onclick="deleteLine(${index}, ${lineIndex})">Delete</button>
          </td>
        `;
        tableBody.appendChild(lineRow);
      });
    }
  });

  updateFilterOptions();
}

function toggleLines(index) {
  jobs[index].expanded = !jobs[index].expanded;
  renderTable();
}

function addLine(index) {
  jobs[index].lines.push({
    description: "",
    workOrder: "",
    status: "",
    remarks: ""
  });
  renderTable();
}

function saveLine(jobIndex, lineIndex) {
  const row = tableBody.rows[jobIndex + lineIndex + 1];
  const cells = row.cells;
  jobs[jobIndex].lines[lineIndex].description = cells[2].textContent;
  jobs[jobIndex].lines[lineIndex].workOrder = cells[3].textContent;
  jobs[jobIndex].lines[lineIndex].status = cells[4].textContent;
  jobs[jobIndex].lines[lineIndex].remarks = cells[5].textContent;
  renderTable();
}

function deleteLine(jobIndex, lineIndex) {
  jobs[jobIndex].lines.splice(lineIndex, 1);
  renderTable();
}

function updateFilterOptions() {
  const equips = [...new Set(jobs.map((j) => j.equip))];
  filterEquip.innerHTML = `<option value="">All</option>`;
  equips.forEach((eq) => {
    const opt = document.createElement("option");
    opt.value = eq;
    opt.textContent = eq;
    filterEquip.appendChild(opt);
  });
}

filterEquip.addEventListener("change", renderTable);
