const apiKey_weather = '0114ad836c2d81459eb69c6e70f276b8';
        const apiUrl_weather = `https://api.openweathermap.org/data/2.5/weather?q=Jakarta&units=metric&appid=${apiKey_weather}`;

        fetch(apiUrl_weather)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const temp = data.main.temp;
                const desc = data.weather[0].description;
                const icon = data.weather[0].icon;

                document.getElementById('temperature').textContent = `${temp} °C`;
                document.getElementById('description').textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
                document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            })
            .catch(error => {
                document.getElementById('description').style.display = "none";
                document.getElementById('temperature').style.display = "none";
                document.querySelector('.icon').style.display = "none";
                
                const errorMessage = document.getElementById('error-message');
                errorMessage.style.display = "block";
                errorMessage.textContent = `Gagal memuat data cuaca: ${error.message}`;
                
                console.error("Error fetching weather data:", error);
            });