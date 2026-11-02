const STAGES = ["Saved", "Applied", "Interviewing", "Offer", "Rejected"];

let jobs = [
  { id: 1, title: "Junior Security Analyst", company: "Contoso", location: "Remote", stage: "Saved" },
  { id: 2, title: "SOC Analyst I", company: "Fabrikam", location: "Baltimore, MD", stage: "Applied" },
  { id: 3, title: "IT Support Specialist", company: "Northwind", location: "Washington, DC", stage: "Applied" },
  { id: 4, title: "Cloud Security Intern", company: "Adventure Works", location: "Remote", stage: "Interviewing" },
  { id: 5, title: "Help Desk Technician", company: "Tailspin", location: "Columbia, MD", stage: "Rejected" }
];

function render() {
  const q = document.getElementById("search").value.toLowerCase();
  const board = document.getElementById("board");
  board.innerHTML = "";
  STAGES.forEach(stage => {
    const col = document.createElement("div");
    col.className = "column";
    const list = jobs.filter(j => j.stage === stage &&
      (j.title + " " + j.company).toLowerCase().includes(q));
    col.innerHTML = `<h2>${stage} <span class="count">${list.length}</span></h2>`;
    list.forEach(j => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h3>${j.title}</h3><p>${j.company} · ${j.location}</p>`;
      const sel = document.createElement("select");
      sel.setAttribute("aria-label", "Move " + j.title);
      STAGES.forEach(s => {
        const o = document.createElement("option");
        o.value = s; o.textContent = s; o.selected = s === j.stage;
        sel.appendChild(o);
      });
      sel.onchange = () => { j.stage = sel.value; render(); };
      card.appendChild(sel);
      col.appendChild(card);
    });
    board.appendChild(col);
  });
}

document.getElementById("search").addEventListener("input", render);
render();
