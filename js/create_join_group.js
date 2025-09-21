/*frontend create/ join group page */

const userId=Number(localStorage.getItem("userId")) || 0;

//create group
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

    //making sure date is after today
    const selectedDate=new Date(dt);
    const nowDate=new Date();
    if (selectedDate<=nowDate){
        statusText.textContent = "Please select a later date and time."; 
        return;
    }
   
    btn.disabled = true;
    try{
        const res = await fetch("http://localhost:3001/create_group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                group_name: grpname,
                deadline: selectedDate.toISOString().slice(0, 19).replace('T', ' '),
                date:  selectedDate.toDateString(), 
                user_id: userId
            })
        });

        jStatusText.textContent = "Created a group successfully";
        jStatusText.style.color="green";
        window.location.href="dash.html";


    }catch (err) {
        console.error(err);
        statusText.textContent = "Unexpected error. Please try again.";
    } finally {
        btn.disabled = false;
    }
});

//join group

const jForm=document.getElementById("join-group-form");
const jStatusText=document.getElementById("join-status");
const jbtn = document.getElementById("join-btn");

jForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    jStatusText.textContent="";

    const grpcode=document.getElementById("group_code").value.trim();
  
    if (!grpcode) { jStatusText.textContent = "Please enter a group code."; return; }
    
   
    jbtn.disabled = true;

    try{
        const res = await fetch("http://localhost:3001/add_user_to_group", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: userId,
                group_id: grpcode
            })
        });
        jStatusText.textContent = "Joined a group successfully";
        jStatusText.style.color="green";
        window.location.href="dash.html";
        
    }catch (err) {
        console.error(err);
        jStatusText.textContent = "Unexpected error. Please try again.";
    } finally {
        jbtn.disabled = false;
    }
});