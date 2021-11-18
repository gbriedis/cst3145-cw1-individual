function validate() {
    var phoneNumber = document.getElementById('phone-number').value;
    const phoneRGEX = new RegExp('^[0-9]+$');

    var name = document.getElementById('name').value;
    const nameRGEX = /^[A-Za-z]+$/;

    var phoneResult = phoneRGEX.test(phoneNumber);
    var nameResult = nameRGEX.test(name);

    if(phoneNumber == false && nameResult == false) {
        alert('Please enter a valid Phone Number and Name')
        return false;
    }

    if(phoneResult == false) {
        alert('Please enter a valid Phone Number');
        return false;
    }

    if(nameResult == false) {
        alert('Please enter a valid Name');
        return false;
    }



    alert('Order Submitted')
    return true;
}