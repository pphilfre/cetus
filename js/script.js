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
            
            // Check if response is valid
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Cetus API response:', data);
            
            // More permissive data checking
            if (data) {
                // Convert isDay to boolean regardless of its type
                const isDay = Boolean(data.isDay);
                const timeLeft = data.timeLeft || 'unknown';
                const state = isDay ? 'Day' : 'Night';
                
                cetusTimeElement.innerHTML = `
                    <div class="cycle ${isDay ? 'day' : 'night'}">
                        <span class="state">${state}</span>
                        <span class="time-left">Time remaining: ${timeLeft}</span>
                    </div>
                `;
            } else {
                cetusTimeElement.textContent = 'Invalid Cetus cycle data format.';
            }
        } catch (error) {
            console.error('Error fetching Cetus time:', error);
            cetusTimeElement.textContent = `Failed to retrieve Cetus time: ${error.message}`;
        }
    }
    
    // Function to fetch Orb Vallis cycle data
    async function fetchVallisCycle() {
        if (!vallisTimeElement) return; // Skip if element doesn't exist
        
        try {
            vallisTimeElement.innerHTML = 'Fetching Vallis data...';
            const response = await fetch('https://api.warframestat.us/pc/vallisCycle');
            
            // Check if response is valid
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Vallis API response:', data);
            
            // More permissive data checking
            if (data) {
                // Convert isWarm to boolean regardless of its type
                const isWarm = Boolean(data.isWarm);
                const timeLeft = data.timeLeft || 'unknown';
                const state = isWarm ? 'Warm' : 'Cold';
                
                vallisTimeElement.innerHTML = `
                    <div class="cycle ${isWarm ? 'warm' : 'cold'}">
                        <span class="state">${state}</span>
                        <span class="time-left">Time remaining: ${timeLeft}</span>
                    </div>
                `;
            } else {
                vallisTimeElement.textContent = 'Invalid Vallis cycle data format.';
            }
        } catch (error) {
            console.error('Error fetching Vallis cycle:', error);
            vallisTimeElement.textContent = `Failed to retrieve Vallis cycle: ${error.message}`;
        }
    }
    
    // Function to fetch Cambion Drift cycle data
    async function fetchCambionCycle() {
        if (!cambionTimeElement) return; // Skip if element doesn't exist
        
        try {
            cambionTimeElement.innerHTML = 'Fetching Cambion data...';
            const response = await fetch('https://api.warframestat.us/pc/cambionCycle');
            
            // Check if response is valid
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Cambion API response:', data);
            
            // More permissive data checking
            if (data) {
                // For Cambion, the state could be in active or state field
                const state = data.active || data.state || 'Unknown';
                const timeLeft = data.timeLeft || 'unknown';
                
                // Make sure we handle any case format
                const cycleClass = (state + '').toLowerCase();
                
                cambionTimeElement.innerHTML = `
                    <div class="cycle ${cycleClass}">
                        <span class="state">${state}</span>
                        <span class="time-left">Time remaining: ${timeLeft}</span>
                    </div>
                `;
            } else {
                cambionTimeElement.textContent = 'Invalid Cambion cycle data format.';
            }
        } catch (error) {
            console.error('Error fetching Cambion cycle:', error);
            cambionTimeElement.textContent = `Failed to retrieve Cambion cycle: ${error.message}`;
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