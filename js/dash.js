
/*hard-coded values for user */
localStorage.setItem("userId", 1);
localStorage.setItem("firstName", "Eileen");

const userId=Number(localStorage.getItem("userId")) || 0;
const firstName = localStorage.getItem("firstName") || "";

document.getElementById("user-name").textContent = firstName || "User";

//displaying groups
const results = document.getElementById("results");
const statusText  = document.getElementById("statusText");

let allResults = [];
let lastQuery  = "";


function renderAll() {
    results.innerHTML = "";

    //making button again
    const addbtn = document.createElement("div");
    addbtn.style.cursor = "pointer";
    addbtn.innerHTML = `<button>+</button>`
    addbtn.onclick = () => window.location.href="create_join.html";
    results.appendChild(addbtn);

    if (!allResults.length) {
        statusText.textContent = "You are not in any group.";
        return;
    }

    statusText.textContent = "";

    //making each group card
    for (const c of allResults) {
        const row = document.createElement("div");
        row.className = "card";
        row.innerHTML = `
            <strong>${c.group_name}</strong>
        `;
        row.onclick = () => window.location.href='group_page.html?id=${encodeURIComponent(c.id)}';
        row.style.cursor = "pointer";
        results.appendChild(row);
    }
}

async function fetchResults(query) {
    statusText.textContent = "";
    results.textContent = "";
    allResults = [];

    try {
        const res = await fetch(`http://localhost:3001/get_groups/api/user/${userId}/groups`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json().catch(() => ({}));
        console.log("Server response:", data);

        
        if (!res.ok) {
            statusText.textContent = data.error || "Search failed.";
            return;
        }

        if (data.error) {
            statusText.textContent = data.error;
            return;
        }
        allResults=data.groups || [];

        renderAll();
    } catch {
        statusText.textContent = "Unexpected error. Please try again.";
    }
}

fetchResults();
