document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('student-form');
    const photoUpload = document.getElementById('student-photo-upload');
    const studentPhoto = document.getElementById('student-photo');
    const resetBtn = document.getElementById('reset-btn');
    const downloadBtn = document.getElementById('download-btn');
    const barcodeElement = document.getElementById('barcode');

    let photoURL = '';

    // Real-time updates for form fields
    form.addEventListener('input', function (e) {
        const target = e.target;
        if (target.id === 'student-name') {
            document.getElementById('display-name').textContent = target.value.toUpperCase() || 'STUDENT NAME';
        } else if (target.id === 'student-course') {
            document.getElementById('display-course').textContent = target.value.toUpperCase() || 'COURSE';
        } else if (target.id === 'admission-no') {
            const admissionNo = target.value || '-';
            document.getElementById('display-admno').textContent = admissionNo;

            // Generate barcode for the admission number
            JsBarcode(barcodeElement, admissionNo, {
                format: "CODE128",
                lineColor: "#000",
                width: 2,
                height: 40,
                displayValue: true
            });
        } else if (target.id === 'dob') {
            document.getElementById('display-dob').textContent = target.value || '-';
        } else if (target.id === 'blood-group') {
            document.getElementById('display-blood').textContent = target.value || '-';
        } else if (target.id === 'hostel') {
            document.getElementById('display-hostel').textContent = target.value || '-';
        } else if (target.id === 'valid-till') {
            document.getElementById('display-valid').textContent = target.value || '-';
        }
    });

    // Handle photo upload
    photoUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                photoURL = event.target.result;
                studentPhoto.style.backgroundImage = `url(${photoURL})`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Reset functionality
    resetBtn.addEventListener('click', function () {
        form.reset();
        document.getElementById('display-name').textContent = 'STUDENT NAME';
        document.getElementById('display-course').textContent = 'COURSE';
        document.getElementById('display-admno').textContent = '-';
        document.getElementById('display-dob').textContent = '-';
        document.getElementById('display-blood').textContent = '-';
        document.getElementById('display-hostel').textContent = '-';
        document.getElementById('display-valid').textContent = '-';
        studentPhoto.style.backgroundImage = '';
        JsBarcode(barcodeElement, "0000000000", {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 40,
            displayValue: true
        });
    });

    // Download functionality
    downloadBtn.addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas dimensions
        canvas.width = 320;
        canvas.height = 480;

        // Draw card background
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw college logo
        const logo = new Image();
        logo.src = 'logo-9.png';
        logo.onload = function () {
            ctx.drawImage(logo, 10, 10, 300, 80);

            // Draw photo
            if (photoURL) {
                const photo = new Image();
                photo.src = photoURL;
                photo.onload = function () {
                    ctx.drawImage(photo, 110, 100, 100, 120);
                    drawTextAndDetails();
                };
            } else {
                drawTextAndDetails();
            }
        };

        function drawTextAndDetails() {
            // Draw student name
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(document.getElementById('display-name').textContent, canvas.width / 2, 250);

            // Draw course
            ctx.font = '16px Arial';
            ctx.fillText(document.getElementById('display-course').textContent, canvas.width / 2, 280);

            // Draw details
            ctx.font = '14px Arial';
            ctx.textAlign = 'left';
            const details = [
                { label: 'ADMISSION NO.', value: document.getElementById('display-admno').textContent },
                { label: 'DOB', value: document.getElementById('display-dob').textContent },
                { label: 'BLOOD GROUP', value: document.getElementById('display-blood').textContent },
                { label: 'HOSTEL', value: document.getElementById('display-hostel').textContent },
                { label: 'VALID TILL', value: document.getElementById('display-valid').textContent },
            ];
            let y = 310;
            details.forEach(detail => {
                ctx.fillText(`${detail.label}:`, 20, y);
                ctx.fillText(detail.value, 150, y);
                y += 20;
            });

            // Draw signature
            ctx.textAlign = 'right';
            ctx.fillText('Registrar', canvas.width - 20, canvas.height - 20);

            // Download the canvas as an image
            const link = document.createElement('a');
            link.download = 'id-card.png';
            link.href = canvas.toDataURL();
            link.click();
        }
    });
});
