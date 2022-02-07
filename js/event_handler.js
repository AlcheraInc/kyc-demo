document.getElementById('userinfo_birthday1').addEventListener("keyup", focusHandle);
document.getElementById('userinfo_birthday2').addEventListener("keyup", focusHandle);
document.getElementById('userinfo_birthday3').addEventListener("keyup", focusHandle);
document.getElementById('userinfo_phone_number').addEventListener("keyup", focusHandle);

document.getElementById('userinfo_birthday1').addEventListener("change", focusHandle);
document.getElementById('userinfo_birthday2').addEventListener("change", focusHandle);
document.getElementById('userinfo_birthday3').addEventListener("change", focusHandle);
document.getElementById('userinfo_phone_number').addEventListener("change", focusHandle);

function focusHandle(e) {
    var target = e.srcElement || e.target;
    if(!target || !target.attributes["maxlength"]) {
        return;
    }
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
        var previous = target;
        while (previous = previous.previousElementSibling) {
            if (previous == null)
                break;
            if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
            }
        }
    }
}