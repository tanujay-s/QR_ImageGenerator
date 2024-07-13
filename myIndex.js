document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const img = document.getElementById('qrImage');
    const btn = document.getElementById('btn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const urlInput = document.getElementById('urlInput').value;
 
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'url': urlInput
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        })
        .then(blob => {
            console.log('Received QR code blob'); 
            const url = URL.createObjectURL(blob);
            img.src = url; 
        })
        .catch(error => {
            console.error('Error:', error); 
        });

        form.style.display = 'none';
        btn.style.display = 'block';
    });
});
