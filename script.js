document.addEventListener('DOMContentLoaded', function() {
    console.log('CV interaktif siap!');
    // Tambahkan logika interaktif di sini
});

// script.js

document.addEventListener('DOMContentLoaded', () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const resultMessage = document.getElementById('resultMessage');
    const resetButton = document.getElementById('resetButton');

    guessButton.addEventListener('click', () => {
        const userGuess = Number(guessInput.value);
        if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
            resultMessage.textContent = 'Masukkan angka valid antara 1 dan 100.';
            resultMessage.style.color = 'red';
        } else if (userGuess < randomNumber) {
            resultMessage.textContent = 'Terlalu rendah, coba lagi!';
            resultMessage.style.color = 'orange';
        } else if (userGuess > randomNumber) {
            resultMessage.textContent = 'Terlalu tinggi, coba lagi!';
            resultMessage.style.color = 'orange';
        } else {
            resultMessage.textContent = 'Selamat! Anda menebak dengan benar!';
            resultMessage.style.color = 'green';
            guessButton.disabled = true;
            resetButton.style.display = 'block';
        }
    });

    resetButton.addEventListener('click', () => {
        window.location.reload();
    });
});

document.onkeydown = function(e) {
    if (e.keyCode == 123) { // F12
        return false;
    } else if (e.ctrlKey && e.keyCode == 85) { // Ctrl+U
        return false;
    }
};

document.addEventListener("contextmenu", function(e) {
    e.preventDefault(); // Mencegah menu konteks (klik kanan)
});

// Wait for 3 seconds, then hide splash screen and show the main content
setTimeout(function() {
  document.getElementById('splash-screen').classList.add('fade-out');

  // Optional: Remove splash screen completely after fading out
  setTimeout(function() {
    document.getElementById('splash-screen').style.display = 'none';
  }, 1000); // Timeout for fading out effect
}, 1000); // Splash screen shows for 3 seconds
