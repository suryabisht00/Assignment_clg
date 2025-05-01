function printIDCard() {
    const idCard = document.querySelector('.id-card');
    if (!idCard) {
        alert('ID Card not found!');
        return;
    }

    // Create a new window for printing
    const printWindow = window.open('', '_blank', 'width=400,height=600');
    if (!printWindow) {
        alert('Unable to open print window. Please check your browser settings.');
        return;
    }

    // Write the ID card content into the new window
    printWindow.document.write(`
        <html>
        <head>
            <title>Print ID Card</title>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f4f4f9;
                }
                .id-card {
                    width: 320px;
                    background-color: #222;
                    border-radius: 8px;
                    color: white;
                    padding: 15px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
                }
                .card-top {
                    text-align: center;
                    margin-bottom: 15px;
                }
                .college-logo {
                    width: 100%;
                    height: 80px;
                    background-image: url('logo-9.png');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                }
                .photo-section {
                    display: flex;
                    justify-content: center;
                    margin: 15px 0;
                }
                .photo {
                    width: 100px;
                    height: 120px;
                    background-color: #f0f0f0;
                    border: 2px solid #ddd;
                    background-size: cover;
                    background-position: center;
                }
                .student-name {
                    text-align: center;
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 5px;
                }
                .course {
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 10px;
                }
                .details {
                    border-top: 2px solid #444;
                    border-bottom: 2px solid #444;
                    padding: 10px 0;
                    margin-bottom: 10px;
                }
                .detail-row {
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    margin-bottom: 5px;
                }
                .barcode-section {
                    text-align: center;
                    margin-top: 10px;
                }
                .signature {
                    text-align: right;
                    font-size: 14px;
                    margin-top: 10px;
                }
            </style>
        </head>
        <body>
            ${idCard.outerHTML}
        </body>
        </html>
    `);

    // Trigger the print dialog
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
}
