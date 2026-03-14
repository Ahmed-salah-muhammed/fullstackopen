const img = document.querySelector("img");
const btn = document.querySelector("button");
const p = document.querySelector("p");
const div = document.querySelector("div");
const API_KEY = "qBevUumoJiCXGcmfyotWdJPJKBBfIFV3";
const url = `https://api.giphy.com/v1/gifs/translate?api_key=${API_KEY}&s=cats`;

async function fetchingPhoto() {
  try {
    p.innerHTML = "photo is loading...";
    p.style.color = "#d31564";

    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
    p.style.cssText = "color: brown";

    img.src = data.data.images.original.url;
    img.onload = () => {
      p.innerHTML = "";
    };

    div.style.cssText =
      "display: flex; align-items: center; justify-content: center; flex-direction: column";
  } catch (err) {
    p.innerHTML = "Error fetching data";
    throw new Error(`can not reach the data, ${err}`);
  }
}

fetchingPhoto();

btn.style.cssText =
  "padding: 12px 24px; margin : 20px; font-size: 16px;cursor: pointer;background-color: #007bff;color: white;border: none;border-radius: 8px;transition: transform 0.2s, background-color 0.2s;";

btn.addEventListener("click", fetchingPhoto);

// promise with fetch and then

// fetch(
//   "https://api.giphy.com/v1/gifs/translate?api_key=hMe6QYPKAOdNuDCHR636NJYBE5OJf3a2&s=cats",
// )
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (response) {
//     img.src = response.data.images.original.url;
//   })
//   .catch(function (error) {
//     console.error(error);
//   });
