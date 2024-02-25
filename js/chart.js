document.addEventListener('DOMContentLoaded', function() {
    // Get the dropdown element
    const selectElement = document.getElementById('stock-select');

    // Function to fetch and update chart based on selected stock
    function updateChart(stockSymbol) {
        fetch(`../data/${stockSymbol}_data.csv`)
            .then(response => response.text())
            .then(data => {
                const labels = [];
                const prices = [];

                // Parse CSV data
                const rows = data.split('\n').slice(1);
                rows.forEach(row => {
                    const columns = row.split(',');
                    labels.push(columns[0]);
                    prices.push(parseFloat(columns[4])); // Assuming the close price is in the fifth column
                });

                // Create chart
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Stock Price',
                            data: prices,
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false
                                }
                            }]
                        }
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Event listener for dropdown change
    selectElement.addEventListener('change', function() {
        const selectedStock = selectElement.value;
        // Clear previous chart
        document.getElementById('myChart').remove();
        const canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        document.querySelector('.container').appendChild(canvas);
        // Update chart with selected stock
        updateChart(selectedStock);
    });

    // Initialize the dropdown with options
    const stocks = ['AAPL', 'GOOGL', 'MSFT','NVDA']; // Example stock symbols
    stocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock;
        option.textContent = stock;
        selectElement.appendChild(option);
    });

    // Initially display chart for the first stock in the dropdown
    updateChart(stocks[0]);
});
