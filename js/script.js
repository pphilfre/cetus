document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const cetusTimeElement = document.getElementById('cetus-time');
    const vallisTimeElement = document.getElementById('vallis-time');
    const cambionTimeElement = document.getElementById('cambion-time');
    const refreshButton = document.getElementById('refresh-button');
    
    // Function to fetch Cetus cycle data
    async function fetchCetusTime() {
        if (!cetusTimeElement) return; // Skip if element doesn't exist
        
        try {
            cetusTimeElement.innerHTML = 'Fetching Cetus data...';
            const response = await fetch('https://api.warframestat.us/pc/cetusCycle');
            const data = await response.json();
            
            if (data) {
                const isDay = data.isDay !== undefined ? data.isDay : false;
                const timeLeft = data.timeLeft || 'unknown';
                const state = isDay ? 'Day' : 'Night';
                
                cetusTimeElement.innerHTML = `
                    <div class="cycle ${isDay ? 'day' : 'night'}">
                        <span class="state">${state}</span>
                        <span class="time-left">Time remaining: ${timeLeft}</span>
                    </div>
                `;
            } else {
                cetusTimeElement.textContent = 'Cetus cycle data unavailable.';
            }
        } catch (error) {
            console.error('Error fetching Cetus time:', error);
            cetusTimeElement.textContent = 'Failed to retrieve Cetus time.';
        }
    }
    
    // Function to fetch Orb Vallis cycle data
    async function fetchVallisCycle() {
        if (!vallisTimeElement) return; // Skip if element doesn't exist
        
        try {
            vallisTimeElement.innerHTML = 'Fetching Vallis data...';
            const response = await fetch('https://api.warframestat.us/pc/vallisCycle');
            const data = await response.json();
            
            if (data) {
                const isWarm = data.isWarm !== undefined ? data.isWarm : false;
                const timeLeft = data.timeLeft || 'unknown';
                const state = isWarm ? 'Warm' : 'Cold';
                
                vallisTimeElement.innerHTML = `
                    <div class="cycle ${isWarm ? 'warm' : 'cold'}">
                        <span class="state">${state}</span>
                        <span class="time-left">Time remaining: ${timeLeft}</span>
                    </div>
                `;
            } else {
                vallisTimeElement.textContent = 'Vallis cycle data unavailable.';
            }
        } catch (error) {
            console.error('Error fetching Vallis cycle:', error);
            vallisTimeElement.textContent = 'Failed to retrieve Vallis cycle.';
        }
    }
    
    // Function to fetch Cambion Drift cycle data
    async function fetchCambionCycle() {
        if (!cambionTimeElement) return; // Skip if element doesn't exist
        
        try {
            cambionTimeElement.innerHTML = 'Fetching Cambion data...';
            const response = await fetch('https://api.warframestat.us/pc/cambionCycle');
            const data = await response.json();
            
            if (data) {
                const state = data.active || 'Unknown';
                const timeLeft = data.timeLeft || 'unknown';
                
                cambionTimeElement.innerHTML = `
                    <div class="cycle ${state.toLowerCase()}">
                        <span class="state">${state}</span>
                        <span class="time-left">Time remaining: ${timeLeft}</span>
                    </div>
                `;
            } else {
                cambionTimeElement.textContent = 'Cambion cycle data unavailable.';
            }
        } catch (error) {
            console.error('Error fetching Cambion cycle:', error);
            cambionTimeElement.textContent = 'Failed to retrieve Cambion cycle.';
        }
    }
    
    // Function to refresh all data
    function refreshAllData() {
        fetchCetusTime();
        fetchVallisCycle();
        fetchCambionCycle();
    }
    
    // Set up refresh button
    if (refreshButton) {
        refreshButton.addEventListener('click', refreshAllData);
    }
    
    // Initial data fetch
    refreshAllData();
    
    // Set up automatic refresh every 60 seconds
    setInterval(refreshAllData, 60000);
});