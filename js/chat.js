function fetchYahooCSV(file, callback) {
    fetch(file)
      .then(response => response.text())
      .then(csv => {
        callback(csv);
      })
      .catch(error => console.error('Error:', error));
}

function plotGraph(csv) {
    var lines = csv.split("\n");
    var data = [];
    for (var i = 1; i < lines.length; i++) {
        var parts = lines[i].split(",");
        if (parts.length >= 6) {
            var date = parts[0];
            var close = parseFloat(parts[4]);
            data.push({ x: date, y: close });
        }
    }
    var layout = {
        title: 'Stock Price History',
        xaxis: {
            title: 'Date'
        },
        yaxis: {
            title: 'Closing Price (USD)'
        }
    };
    var config = { responsive: true };
    Plotly.newPlot('plot', [{ x: data.map(d => d.x), y: data.map(d => d.y), type: 'scatter', mode: 'lines' }], layout, config);
}

function plotPredictedShortPosition(csv) {
    var lines = csv.split("\n");
    var data = [];
    for (var i = 1; i < lines.length; i++) {
        var parts = lines[i].split(",");
        if (parts.length >= 2) {
            var date = parts[0];
            var shortPosition = parseFloat(parts[1]);
            data.push({ x: date, y: shortPosition });
        }
    }
    var layout = {
        title: 'Predicted Short Position',
        xaxis: {
            title: 'Date'
        },
        yaxis: {
            title: 'Short Position'
        }
    };
    var config = { responsive: true };
    Plotly.newPlot('predictedShortPositionPlot', [{ x: data.map(d => d.x), y: data.map(d => d.y), type: 'scatter', mode: 'lines' }], layout, config);
}

document.addEventListener("DOMContentLoaded", function () {
    const stockSelect = document.getElementById('stockSelect');
    const stockInfoDiv = document.getElementById('stockInfo');

    stockSelect.addEventListener('change', function () {
        const selectedSymbol = this.value;
        const csvFileName = "data/current_date/" + selectedSymbol + '.csv'; // Assuming the CSV file is in a 'data' folder
        const predictedShortPositionFile = "data/predicitions/" + selectedSymbol + '_predicted_short_position.csv'; // Assuming the predicted short position CSV file is in a 'data' folder

        // Fetch stock price history CSV
        fetchYahooCSV(csvFileName, function (csv) {
            plotGraph(csv);
        });

        // Fetch predicted short position CSV
        fetchYahooCSV(predictedShortPositionFile, function (csv) {
            plotPredictedShortPosition(csv);
        });

        // Fetch stock information JSON
        const jsonFileName = selectedSymbol + '.json';
        fetch(jsonFileName)
            .then(response => response.json())
            .then(data => {
                // Update stock information
                stockInfoDiv.innerHTML = ''; // Clear previous stock info
                const stockName = document.createElement('h2');
                stockName.textContent = data.name;
                const description = document.createElement('p');
                description.textContent = data.description;

                stockInfoDiv.appendChild(stockName);
                stockInfoDiv.appendChild(description);
            })
            .catch(error => console.error('Error:', error));
    });
});
