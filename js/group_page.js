/*frontend group page */

const form = document.getElementById("update-form");
const input = document.getElementById("add-content");

const statusText = document.createElement("div");
form.appendChild(statusText);

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusText.textContent = "";

    const content = input.value.trim();    

    if (!content) { 
        statusText.textContent = "Please enter some content before submitting."; 
        return; 
    }

    const submitButton = form.querySelector('input[type="submit"]');
    submitButton.disabled = true;

    // try {
    //     const res = await fetch("http://localhost:3001/add_update", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ content })
    //     });

    //     if (res.ok) {
    //         statusText.textContent = "Update submitted successfully!";
    //         input.value = ""; // clear input
    //     } else {
    //         statusText.textContent = "Failed to submit update.";
    //     }

    // } catch (err) {
    //     console.error(err);
    //     statusText.textContent = "Unexpected error. Please try again.";
    // } finally {
    //     submitButton.disabled = false;
    // }
});
