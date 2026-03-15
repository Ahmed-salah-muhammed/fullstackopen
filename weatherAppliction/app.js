const form = document.querySelector("#weatherForm");
const body = document.querySelector("#body");
const loading = document.querySelector("#loading");
const error = document.querySelector("#error");
const apiKey = "87d745e3de7f42f0b97220148261403";

async function getWeather(query) {
  try {
    loading.classList.remove("hidden");
    error.classList.add("hidden");

    const res = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`,
    );

    const data = await res.json();
    // console.log(data);
    loading.classList.add("hidden");

    if (data.error) {
      throw new Error(data.error.message);
    }

    displayWeather(data);
  } catch (err) {
    loading.classList.add("hidden");

    error.textContent = err.message;
    error.classList.remove("hidden");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = document.querySelector("#location").value;

  getWeather(city);
});

function displayWeather(data) {
  document.querySelector("#weatherResult").classList.remove("hidden");

  document.querySelector("#city").textContent = data.location.name;
  document.querySelector("#temp").textContent = `${data.current.temp_c} °C`;
  document.querySelector("#temp2").textContent = `${data.current.temp_f} °F`;
  document.querySelector("#condition").textContent =
    data.current.condition.text;
  document.querySelector("#icon").src = data.current.condition.icon;
  changeBackground(data.current.condition.text);
}

function changeBackground(condition) {
  condition = condition.toLowerCase();

  if (condition.includes("sun")) {
    body.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-300 via-orange-300 to-yellow-500 transition-all duration-700";
  } else if (condition.includes("rain")) {
    body.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-blue-800 to-gray-900 transition-all duration-700";
  } else if (condition.includes("cloud")) {
    body.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-400 to-gray-600 transition-all duration-700";
  } else if (condition.includes("snow")) {
    body.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-white transition-all duration-700";
  } else {
    body.className =
      "min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-sky-600 transition-all duration-700";
  }
}

document.querySelector("#detect").addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    getWeather(`${lat},${lon}`);
  });
});
