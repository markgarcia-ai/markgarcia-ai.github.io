function fetchYahooCSV(symbol, callback) {
    var file = "data/" + symbol + ".csv"; // Assuming the files are in a 'data' folder
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
        data.push({x: date, y: close});
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
    var config = {responsive: true};
    Plotly.newPlot('plot', [{x: data.map(d => d.x), y: data.map(d => d.y), type: 'scatter', mode: 'lines'}], layout, config);
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    const stockSelect = document.getElementById('stockSelect');
    const stockInfoDiv = document.getElementById('stockInfo');
  
    stockSelect.addEventListener('change', function() {
      const selectedSymbol = this.value;
      const jsonFileName = selectedSymbol + '.json';
  
      fetch(jsonFileName)
        .then(response => response.json())
        .then(data => {
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
  