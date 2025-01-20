const errorPeopleMessage = document.getElementById('error-people');
const errorPeopleField = document.querySelector('.people .input-group');

const billEL = document.getElementById('bill');
const peopleEl = document.getElementById('people');
const tipPercentageEl = document.getElementById('tip');

const tipAmountEl = document.querySelector('.tip-amount p');
const tipTotalEl = document.querySelector('.total p');

const btnOpt = document.querySelectorAll('.tips-opt button');
const btnReset = document.getElementById('btn-reset');
 
const tipCalculator = {
    billVal: 0,
    peopleVal: 0, 
    tipPercentageVal: 0,
};

function updateData(field, value) {
    tipCalculator[field] = value;
    btnReset.disabled = false;
    calculateTip();
}

function calculateTip() {
    const { bill, people, tipPercentage } = tipCalculator;

    if (people === 0) {
        errorPeopleMessage.style.display = 'flex';
        errorPeopleField.classList.add('invalid');
        return;
    }

    errorPeopleMessage.style.display = 'none';
    errorPeopleField.classList.remove('invalid');

    const tipAmount = (bill * tipPercentage) / 100 / people;
    const totalAmount = bill / people + tipAmount;

    updateResult(tipAmount, totalAmount);
}

function updateResult(tipAmount, totalAmount) {
    tipAmountEl.textContent = tipAmount.toFixed(2);
    tipTotalEl.textContent = totalAmount.toFixed(2);
}

function resetCalculator() {
    tipCalculator.bill = 0;
    tipCalculator.people = 0;
    tipCalculator.tipPercentage = 0;

    btnReset.disabled = true;
    btnOpt.forEach((btn) => { 
        btn.classList.remove('active'); 
    });

    billEL.value = '';
    peopleEl.value = '';
    tipPercentageEl.value = '';
    updateResult(0, 0);
}

billEL.addEventListener('input', (e) => {
    updateData('bill', parseFloat(e.target.value) || 0);
});

peopleEl.addEventListener('input', (e) => {
    updateData('people', parseInt(e.target.value) || 0);
});

tipPercentageEl.addEventListener('input', (e) => {
    updateData('tipPercentage', parseFloat(e.target.value) || 0);
    btnOpt.forEach((btn) => { 
        btn.classList.remove('active'); 
    });
});

btnOpt.forEach((button) => {
    button.addEventListener('click', () => {
        btnOpt.forEach((btn) => { 
            btn.classList.remove('active'); 
        });
        button.classList.add('active');
        const tipValue = parseFloat(button.textContent.replace('%', ''));
        updateData('tipPercentage', tipValue);
    });
});

btnReset.addEventListener('click', resetCalculator);
