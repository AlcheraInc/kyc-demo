
document.querySelectorAll('input').forEach((element) => {
    element.onkeyup = (e) => {
        const target = e.srcElement || e.target;
        if (!e || e.key === 'Tab' || e.key === 'Shift' || e.key === 'Process') {
            return;
        }
        if (!target || !target.attributes["maxlength"]) {
            return;
        }
        const maxLength = parseInt(target.attributes["maxlength"].value, 10);
        const myLength = target.value.length;
        if (myLength >= maxLength) {
            let next = target;
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
            let previous = target;
            while (previous = previous.previousElementSibling) {
                if (previous === null)
                    break;
                if (previous.tagName.toLowerCase() === "input") {
                    previous.focus();
                    break;
                }
            }
        }
    };

    element.onfocus = (e) => {
        e.target.scrollIntoView();
    }
});

document.getElementById('userinfo_type').onchange = (e) => {
    if (!e.target) {
        return;
    }

    if (e.target.value === 'param') {
        document.getElementById('userinfo_div').style.display = 'inline-block';
    } else {
        document.getElementById('userinfo_div').style.display = 'none';
    }
};

