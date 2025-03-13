const cetusTimeElement = document.getElementById('cetus-time');
const vallisTimeElement = document.getElementById('vallis-time');
const cambionTimeElement = document.getElementById('cambion-time');

async function fetchCetusTime() {
    try {
        const response = await fetch('https://api.warframestat.us/pc/cetusCycle');
        const data = await response.json();
        if (data && data.start && data.end) {
            cetusTimeElement.textContent = `Cetus Time: ${data.start} - ${data.end}`;
        } else {
            cetusTimeElement.textContent = 'Cetus cycle data unavailable.';
        }
    } catch (error) {
        console.error('Error fetching Cetus time:', error);
        cetusTimeElement.textContent = 'Failed to retrieve Cetus time.';
    }
}

async function fetchVallisCycle() {
    try {
        const response = await fetch('https://api.warframestat.us/pc/vallisCycle');
        const data = await response.json();
        if (data && data.start && data.end) {
            vallisTimeElement.textContent = `Vallis Cycle: ${data.start} - ${data.end}`;
        } else {
            vallisTimeElement.textContent = 'Vallis cycle data unavailable.';
        }
    } catch (error) {
        console.error('Error fetching Vallis cycle:', error);
        vallisTimeElement.textContent = 'Failed to retrieve Vallis cycle.';
    }
}

async function fetchCambionCycle() {
    try {
        const response = await fetch('https://api.warframestat.us/pc/cambionCycle');
        const data = await response.json();
        if (data && data.start && data.end) {
            cambionTimeElement.textContent = `Cambion Cycle: ${data.start} - ${data.end}`;
        } else {
            cambionTimeElement.textContent = 'Cambion cycle data unavailable.';
        }
    } catch (error) {
        console.error('Error fetching Cambion cycle:', error);
        cambionTimeElement.textContent = 'Failed to retrieve Cambion cycle.';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCetusTime();
    fetchVallisCycle();
    fetchCambionCycle();
});