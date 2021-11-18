function validate() {
    // gets value of phone number
    var phoneNumber = document.getElementById('phone-number').value;

    // regex to only accept numbers
    const phoneRGEX = new RegExp('^[0-9]+$');

    var name = document.getElementById('name').value;

    // regex to only accept letters for name form
    const nameRGEX = /^[A-Za-z]+$/;

    var phoneResult = phoneRGEX.test(phoneNumber);
    var nameResult = nameRGEX.test(name);

    // display alert if both are incorrect
    if(phoneNumber == false && nameResult == false) {
        alert('Please enter a valid Phone Number and Name')
        return false;
    }

    // display error if phone input is wrong
    if(phoneResult == false) {
        alert('Please enter a valid Phone Number');
        return false;
    }

    // display error if name is incorrect
    if(nameResult == false) {
        alert('Please enter a valid Name');
        return false;
    }

    // if everything is correct, show alert of order submitted
    alert('Order Submitted')
    return true;
}