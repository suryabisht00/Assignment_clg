document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('student-form');
    const photoUpload = document.getElementById('student-photo-upload');
    const studentPhoto = document.getElementById('student-photo');
    const printBtn = document.getElementById('print-btn');
    
    // Generate barcode with placeholder data initially
    JsBarcode("#barcode", "0000000000", {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 40,
        displayValue: false
    });
    
    // Handle photo upload
    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                studentPhoto.style.backgroundImage = `url(${event.target.result})`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('student-name').value;
        const course = document.getElementById('student-course').value;
        const admNo = document.getElementById('admission-no').value;
        const dob = formatDate(document.getElementById('dob').value);
        const bloodGroup = document.getElementById('blood-group').value;
        const hostel = document.getElementById('hostel').value;
        const validTill = formatDate(document.getElementById('valid-till').value);
        
        // Update ID card
        document.getElementById('display-name').textContent = name.toUpperCase();
        document.getElementById('display-course').textContent = course.toUpperCase();
        document.getElementById('display-admno').textContent = admNo;
        document.getElementById('display-dob').textContent = ':' + dob;
        document.getElementById('display-blood').textContent = ':' + bloodGroup;
        document.getElementById('display-hostel').textContent = ':' + hostel;
        document.getElementById('display-valid').textContent = ':' + validTill;
        
        // Update barcode
        JsBarcode("#barcode", admNo, {
            format: "CODE128",
            lineColor: "#000",
            width: 2,
            height: 40,
            displayValue: false
        });
    });
    
    // Print functionality
    printBtn.addEventListener('click', function() {
        window.print();
    });
    
    // Helper function to format date as DD-MM-YYYY
    function formatDate(dateString) {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}-${month}-${year}`;
    }
});
