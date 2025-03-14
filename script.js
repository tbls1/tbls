function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.left = (sidebar.style.left === "0px") ? "-250px" : "0px";
}

function updateTime() {
    document.getElementById("time").textContent = new Date().toLocaleTimeString();
}
setInterval(updateTime, 1000);
updateTime();

const sheetID = "10lZ3i0Rj7iUjOMG3TQCR18rKsP2JvDFGUjewcoAbj_8";
const apiKey = "AIzaSyBNvRfcN2csWoo0YZ5kW9Z865sefvyiJPA";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/Sheet1?key=${apiKey}`;

async function fetchUpdates() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data.");
        const data = await response.json();
        if (!data.values || data.values.length <= 1) {
            document.querySelector(".updates").innerHTML = "<h2>Latest Updates</h2><div class='update'>No updates available.</div>";
            return;
        }
        displayUpdates(data.values);
    } catch (error) {
        console.error("Error fetching updates:", error);
        document.querySelector(".updates").innerHTML = "<h2>Latest Updates</h2><div class='update'>Error loading updates.</div>";
    }
}

function displayUpdates(rows) {
    const updatesContainer = document.querySelector(".updates");
    updatesContainer.innerHTML = "<h2>Latest Updates</h2>";
    rows.slice(1).forEach(([date, title, desc]) => {
        if (date && title && desc) {
            updatesContainer.innerHTML += `<div class="update"><strong>${date} - ${title}</strong><p>${desc}</p></div>`;
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".updates")) {
        fetchUpdates();
        setInterval(fetchUpdates, 60000);
    }
});
