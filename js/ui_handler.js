const paramBox = document.getElementById('param');
const useInputUiBox = document.getElementById('use_input_ui');
const userinfoTypeSelect = document.getElementById('userinfo_type');
const userinfoDivision = document.getElementById('userinfo-division');
const changeEvent = document.createEvent("HTMLEvents");
// const userinfoBtn = document.getElementById('userinfo--btn');

changeEvent.initEvent("change", true, false);

// userinfoBtn.addEventListener('click', () => {
//     let location = document.getElementById('logic-options').offsetTop

//     console.log(location)
//     console.log(window.scrollTo)
//     window.scrollTo({ top: location, behavior: 'smooth' });
// })

paramBox.addEventListener('click', () => {
    document.querySelector('#param .customer--radio-check').classList.add('checked');
    document.querySelector('#use_input_ui .customer--radio-check').classList.remove('checked');
    userinfoTypeSelect.options[0].selected = true;
    userinfoTypeSelect.dispatchEvent(changeEvent);
    userinfoDivision.style.display = 'block'
});
useInputUiBox.addEventListener('click', () => {
    document.querySelector('#use_input_ui .customer--radio-check').classList.add('checked');
    document.querySelector('#param .customer--radio-check').classList.remove('checked');
    userinfoTypeSelect.options[1].selected = true;
    userinfoTypeSelect.dispatchEvent(changeEvent);
    userinfoDivision.style.display = 'none';
});