const cetusTimeElement = document.getElementById('cetus-time');

async function fetchCetusTime() {
    try {
        const response = await fetch('https://api.warframestat.us/pc/earth');
        const data = await response.json();
        const cetusCycle = data.cetusCycle;
        const cetusTime = cetusCycle.start + ' - ' + cetusCycle.end;
        cetusTimeElement.textContent = `Cetus Time: ${cetusTime}`;
    } catch (error) {
        console.error('Error fetching Cetus time:', error);
        cetusTimeElement.textContent = 'Failed to retrieve Cetus time.';
    }
}

document.addEventListener('DOMContentLoaded', fetchCetusTime);