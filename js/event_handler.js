
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

        if (myLength > maxLength) {
            target.value = parseInt((target.value + "").substr(0, maxLength), 10);
        }

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

document.getElementById('userinfo_type').addEventListener("change",(e) => {
    if (!e.target) {
        return;
    }

    if (e.target.value === 'param') {
        document.getElementById('userinfo_div').style.display = 'inline-block';
    } else {
        document.getElementById('userinfo_div').style.display = 'none';
    }
});

document.getElementById('userinfo_birthday').addEventListener("keyup",(e) => {
    if (!e.target) {
        return;
    }

    e.target.value = transformDateFormat(e.target.value, (e.key === 'Backspace'));
});

document.getElementById('userinfo_birthday').addEventListener("focusout", (e) => {
    if (!e.target) {
        return;
    }

    e.target.value = onblurTransformDateFormat(e.target.value);

    if (!validate_birthday(e)) {
        alert("생년월일 포멧(YYYY-MM-DD)이 올바르지 않습니다. (" + e.target.value + ")");
        //e.target.value = "";
        setTimeout(() => {
            console.log('focus rollback');
            e.target.focus();
        }, 500);

    }
});

const validate_birthday = (e) => {
    let dob1 = e.target.value.replace(/-/gi, "");
    if (dob1.length !== 8) {
        return false;
    }
    const date = new Date(dob1.substr(0, 4), dob1.substr(4,2), dob1.substr(6,2));
    return (date.toString() !== "Invalid Date");
};

const onblurTransformDateFormat = (text) => {
    // in case of "1900-11-2" -> "focusout event is occurred" -> replace to "1900-11-02"
    if (text.length === 9 && text.substr(8, 1) != 0) {
        text = text.substr(0, 8) + "0" + text.substr(8, 1);
    }
    return text;
};

const transformDateFormat = (text, isBackspace) => {
    const testDateFormatRegx = /[^0-9-]/g;

    if (text) {
        text = text.replace(testDateFormatRegx, "");
    }
    if (!isBackspace && (/^\d{4}$/.test(text) || /^\d{4}-\d{2}$/.test(text))) {
        const checkMaxMonth = /^\d{4}-(\d{2})$/;
        if (checkMaxMonth.test(text) && checkMaxMonth.exec(text)[1] > 12) {
            text = text.slice(0, -1);
        } else {
            text += "-";
        }
    }
    if (!isBackspace && (/^\d{5}$/.test(text) || /^\d{4}-\d{3}$/.test(text))) {
        text = text.slice(0, -1) + "-" + text.slice(-1);
    }
    if (isBackspace && (/^\d{4}-$/.test(text) || /^\d{4}-\d{2}-$/.test(text))) {
        text = text.slice(0, -1);
    }
    const checkMaxDate = /^\d{4}-\d{2}-(\d{2})$/;
    if (
        !isBackspace &&
        checkMaxDate.test(text) &&
        checkMaxDate.exec(text)[1] > 31
    ) {
        text = text.slice(0, -1);
    }
    // check month
    const checkMonth = /^\d{4}-(\d{1})$/;
    if (!isBackspace && checkMonth.test(text)) {
        const result = checkMonth.exec(text);
        if (result[1] > 1) {
            text = text.slice(0, -1) + "0" + text.slice(-1);
        }
    }
    const checkMonthIsZero = /^\d{4}-(\d{2})-/;
    if (!isBackspace && checkMonthIsZero.test(text)) {
        const result = checkMonthIsZero.exec(text);
        if (result[1] == 0) {
            text = text.slice(0, -2);
        }
    }
    if (isBackspace && checkMonth.test(text)) {
        const result = checkMonth.exec(text);
        if (result[1] == 0) {
            text = text.slice(0, -2);
        }
    }
    // check date
    const checkDate = /^\d{4}-\d{2}-(\d{1})$/;
    if (!isBackspace && checkDate.test(text)) {
        const result = checkDate.exec(text);
        if (result[1] > 3) {
            text = text.slice(0, -1) + "0" + text.slice(-1);
        }
    }
    const checkDateIsZero = /^\d{4}-\d{2}-(\d{2})/;
    if (!isBackspace && checkDateIsZero.test(text)) {
        const result = checkDateIsZero.exec(text);
        if (result[1] == 0) {
            text = text.slice(0, -1);
        }
    }
    if (isBackspace && checkDate.test(text)) {
        const result = checkDate.exec(text);
        if (result[1] == 0) {
            text = text.slice(0, -2);
        }
    }
    if (text.length > 10) {
        text = text.slice(0, 10);
    }

    let dob1 = text.replace(/-/gi, "");
    let year = dob1.substr(0, 4) !== "" ? dob1.substr(0, 4) : null;
    let month = dob1.substr(4, 2) !== "" ? dob1.substr(4, 2) : null;
    let day = dob1.substr(6, 2) !== "" ? dob1.substr(6, 2) : null;

    let dob_item_list = [];
    if (year !== null) dob_item_list.push(year);
    if (month !== null) dob_item_list.push(month);
    if (day !== null) dob_item_list.push(day);

    text = dob_item_list.join('-');

    return text;
};

