// Fetch investing insights from JSON file
fetch('jsons/investingInfo.json')
    .then(response => response.json())
    .then(data => {
        const investingInsights = document.getElementById('investingInsights');
        investingInsights.innerHTML = `
            <h6>Log Returns:</h6>
            <p>${data.logReturns}</p>
            <h6>Long and Short Positions:</h6>
            <p>${data.longShortPositions}</p>
        `;
    });
