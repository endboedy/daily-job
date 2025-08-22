
let data = [];

fetch('data.json')
  .then(response => response.json())
  .then(json => {
    data = json;
    renderList();
  });

function renderList() {
  const container = document.getElementById("item-list");
  container.innerHTML = "";
  data.forEach((item, index) => {
    const statusList = item.Status.split(',').map(s => s.trim());
    const cCount = statusList.filter(s => s === 'C').length;
    const statusJob = statusList.length > 0 ? Math.round((cCount / statusList.length) * 100) + "%" : "0%";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><span class="toggle" onclick="toggle(${index})" id="toggle-${index}">[+]</span></td>
      <td>${item.Equip}</td>
      <td><div id="desc-${index}" class="detail">${item.Description.split(',').join('<br>')}</div></td>
      <td>${item.WorkOrder}</td>
      <td><div id="status-${index}" class="detail">${statusList.join('<br>')}</div></td>
      <td>${item.Remarks}</td>
      <td>${statusJob}</td>
    `;
    container.appendChild(row);
  });
}

function toggle(index) {
  const desc = document.getElementById(`desc-${index}`);
  const status = document.getElementById(`status-${index}`);
  const toggleBtn = document.getElementById(`toggle-${index}`);
  const isHidden = desc.style.display === "none";

  desc.style.display = isHidden ? "block" : "none";
  status.style.display = isHidden ? "block" : "none";
  toggleBtn.innerText = isHidden ? "[-]" : "[+]";
}

function showAddForm() {
  document.getElementById("add-form").style.display = "block";
}

function addItem() {
  const newItem = {
    Equip: document.getElementById("equip").value,
    Description: document.getElementById("desc").value,
    WorkOrder: document.getElementById("wo").value,
    Status: document.getElementById("status").value,
    Remarks: document.getElementById("remarks").value
  };
  data.push(newItem);
  renderList();
  document.getElementById("add-form").style.display = "none";
}
