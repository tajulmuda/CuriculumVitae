const apiKey = '98JKK993IZMJ5T4E';  // Ganti dengan API Key Anda

async function fetchCurrencyData() {
    // URL untuk mendapatkan data mata uang dari Alpha Vantage (USD/IDR, GBP/IDR, EUR/IDR)
    const urlUSD = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=IDR&apikey=${apiKey}`;
    const urlGBP = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=GBP&to_currency=IDR&apikey=${apiKey}`;
    const urlEUR = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=IDR&apikey=${apiKey}`;

    // Fetch data
    const responseUSD = await fetch(urlUSD);
    const responseGBP = await fetch(urlGBP);
    const responseEUR = await fetch(urlEUR);

    const dataUSD = await responseUSD.json();
    const dataGBP = await responseGBP.json();
    const dataEUR = await responseEUR.json();

    // Ambil nilai tukar terbaru dari data
    const usdRate = dataUSD['Realtime Currency Exchange Rate']?.['5. Exchange Rate'] || 'Data tidak ditemukan';
    const gbpRate = dataGBP['Realtime Currency Exchange Rate']?.['5. Exchange Rate'] || 'Data tidak ditemukan';
    const eurRate = dataEUR['Realtime Currency Exchange Rate']?.['5. Exchange Rate'] || 'Data tidak ditemukan';

    // Update statistik di halaman
    document.getElementById('usd-rate').innerText = `Rp ${parseFloat(usdRate).toFixed(2)}`;
    document.getElementById('gbp-rate').innerText = `Rp ${parseFloat(gbpRate).toFixed(2)}`;
    document.getElementById('eur-rate').innerText = `Rp ${parseFloat(eurRate).toFixed(2)}`;

    return { usdRate, gbpRate, eurRate };
}

async function createChart() {
    const { usdRate, gbpRate, eurRate } = await fetchCurrencyData();

    const ctx = document.getElementById('currencyChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['USD/IDR', 'GBP/IDR', 'EUR/IDR'], // Label mata uang
            datasets: [{
                label: 'Nilai Tukar Mata Uang (IDR)',
                data: [usdRate, gbpRate, eurRate], // Data nilai tukar
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Mata Uang'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nilai Tukar (IDR)'
                    }
                }
            }
        }
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
    ;
    
}



createChart(); // Memanggil fungsi untuk membuat chart