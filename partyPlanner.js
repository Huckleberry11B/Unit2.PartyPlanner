const COHORT = "2310-FSA-ET-WEB-PT-SF";
const API_URL = `https://fsa-async-await.herokuapp.com/api/${COHORT}/events`;


const state = {
    parties: [],
};

const partyList = document.querySelector('#parties');

const addPartyForm = document.querySelector('#addParty');
addPartyForm.addEventListener('submit', addParty);

async function render() {
    await getEvents();
    renderEvents();
}
render();

async function getEvents() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
}

function addParty(event) {
    event.preventDefault();

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: addPartyForm.name.value,
                date: new Date(document.getElementById('date-input').value).toISOString(),
                time: addPartyForm.time.value,
                location: addPartyForm.location.value,
                description: addPartyForm.description.value,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to create party');
        }

        render();        
    } catch(error) {
        console.error(error);
    }
}