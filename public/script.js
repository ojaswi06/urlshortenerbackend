<<<<<<< HEAD
const shortenBtn = document.getElementById("shortenBtn");
const longUrlInput = document.getElementById("longUrl");
const resultBox = document.getElementById("result");
const shortUrlLink = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

// 🔹 Replace this with your deployed Render backend URL
const backendURL = "https://urlshortenerbackend-4yhm.onrender.com";

shortenBtn.addEventListener("click", async () => {
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) return alert("Please enter a URL!");

  try {
    const res = await fetch(`${backendURL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl })
    });
    const data = await res.json();

    // Full backend link for redirect
    shortUrlLink.href = data.shortUrl;
    shortUrlLink.textContent = data.shortUrl;
    resultBox.style.display = "block";
  } catch (err) {
    alert("Error connecting to backend. Make sure backend is deployed!");
    console.error(err);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(shortUrlLink.textContent);
  alert("Copied to clipboard!");
});

dashboardBtn.addEventListener("click", () => {
  const shortId = shortUrlLink.textContent.split("/").pop();
  window.location.href = `${backendURL}/dashboard.html?shortId=${shortId}`;
=======
const shortenBtn = document.getElementById("shortenBtn");
const longUrlInput = document.getElementById("longUrl");
const resultBox = document.getElementById("result");
const shortUrlLink = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const dashboardBtn = document.getElementById("dashboardBtn");

// 🔹 Replace this with your deployed Render backend URL
const backendURL = "https://urlshortenerbackend-4yhm.onrender.com";

shortenBtn.addEventListener("click", async () => {
  const longUrl = longUrlInput.value.trim();
  if (!longUrl) return alert("Please enter a URL!");

  try {
    const res = await fetch(`${backendURL}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl })
    });
    const data = await res.json();

    // Full backend link for redirect
    shortUrlLink.href = data.shortUrl;
    shortUrlLink.textContent = data.shortUrl;
    resultBox.style.display = "block";
  } catch (err) {
    alert("Error connecting to backend. Make sure backend is deployed!");
    console.error(err);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(shortUrlLink.textContent);
  alert("Copied to clipboard!");
});

dashboardBtn.addEventListener("click", () => {
  const shortId = shortUrlLink.textContent.split("/").pop();
  window.location.href = `${backendURL}/dashboard.html?shortId=${shortId}`;
>>>>>>> 95dfafb (Updated models, script.js, package.json, and server.js)
});