/*frontend create/join group page */
const form=document.getElementById("create-group-form");
const statusText=document.getElementById("create-status");
const btn = document.getElementById("create-btn");


form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusText.textContent="";

    const grpname=document.getElementById("new_group_name").value.trim();
    const dt=document.getElementById("new_group_date").value.trim();
    

    if (!grpname) { statusText.textContent = "Please enter a group name."; return; }
    if (!dt) { statusText.textContent = "Please select a date and time."; return; }

    //making sure date is after today's date and time
    const selectedDate=new Date(dt);
    const nowDate=new Date();
    if (selectedDate<=nowDate){
        statusText.textContent = "Please select a later date and time."; 
        return;
    }
   
    btn.disabled = true;
    console.log(selectedDate.toISOString().slice(0, 19).replace('T', ' '));
    try{
        const res = await fetch("http://localhost:3001/create_group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                group_name: grpname,
                deadline: selectedDate.toISOString().slice(0, 19).replace('T', ' '),
                date:  selectedDate.toDateString(), 
            })
        });

        statusText.textContent="Group created successfully.";
        window.location.href="dash.html";

    }catch (err) {
        console.error(err);
        statusText.textContent = "Unexpected error. Please try again.";
    } finally {
        btn.disabled = false;
    }
});