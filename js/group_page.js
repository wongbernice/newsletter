/*frontend group page */

const form = document.getElementById("update-form");
const input = document.getElementById("add-content");

const statusText = document.createElement("div");
form.appendChild(statusText);

// Submit form
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusText.textContent = "";

    const content = input.value.trim();    

    if (!content) { 
        statusText.textContent = "Please enter some content before submitting."; 
        return; 
    }

    const submitButton = form.querySelector('.submit-btn');
    submitButton.disabled = true;

    try {
        const res = await fetch("http://localhost:3001/add_update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content })
        });

        if (res.ok) {
            statusText.textContent = "Update submitted successfully!";
            input.value = "";
        } else {
            statusText.textContent = "Failed to submit update.";
        }

    } catch (err) {
        console.error(err);
        statusText.textContent = "Unexpected error. Please try again.";
    } finally {
        submitButton.disabled = false;
    }

});

/* display past newsletters*/
const results = document.getElementById("results");
// const statusText  = document.getElementById("statusText");
let allResults = []; //store fetched newsletters

function renderAll() {
    results.innerHTML = ""; //clear previous content

    //check whether there are any past newsletters to display
    if (!allResults.length) {
        statusText.textContent = "No past newletters.";
        return;
    }
    
    statusText.textContent = ""; //clear previous messages

    //making each newsletter card
    for (const n of allResults) {
        const row = document.createElement("div");
        row.className = "card";
        row.innerHTML = `
            <strong>${n.title}</strong>
            <p>Published: ${new Date(n.created_at).toLocaleDateString()}</p>
        `;
        row.onclick = () => window.location.href = `newsletter_view.html?id=${encodeURIComponent(n.id)}&group=${encodeURIComponent(n.group_id)}`;
        row.style.cursor = "pointer";
        results.appendChild(row);
    }
}

// aysnc function to fetch all past newsletters for a group
async function fetchResults(groupId) {
    statusText.textContent = "";
    results.innerHTML = "";
    allResults = [];

    try {
        const res = await fetch(`http://localhost:3001/newsletters/api/group/${groupId}/newsletters`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
            statusText.textContent = `Failed to fetch newsletters: ${res.status}`;
            return;
        }

        const data = await res.json().catch(() => ({}));
        allResults = data.newsletters || [];

        renderAll();
    } catch (err) {
        statusText.textContent = "Unexpected error. Please try again.";
    }
}

// Call with your groupId (from URL or JS variable)
const groupId = Number(new URLSearchParams(window.location.search).get("id")) || 0;
fetchResults(groupId);