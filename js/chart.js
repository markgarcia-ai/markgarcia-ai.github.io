document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('stock-select');
    const timeFrameSelect = document.getElementById('time-frame-select');

    function updateChart(stockSymbol, timeFrame) {
        fetch('../data/${stockSymbol}_${timeFrame}_data.csv')
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
                            }],
                            xAxes: [{
                                type: 'time',
                                time: {
                                    displayFormats: {
                                        'millisecond': 'MMM DD',
                                        'second': 'MMM DD',
                                        'minute': 'MMM DD',
                                        'hour': 'MMM DD',
                                        'day': 'MMM DD',
                                        'week': 'MMM DD',
                                        'month': 'MMM DD',
                                        'quarter': 'MMM DD',
                                        'year': 'MMM DD',
                                    }
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

    selectElement.addEventListener('change', function() {
        const selectedStock = selectElement.value;
        const selectedTimeFrame = timeFrameSelect.value;
        document.getElementById('myChart').remove();
        const canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        document.querySelector('.container').appendChild(canvas);
        updateChart(selectedStock, selectedTimeFrame);
    });

    timeFrameSelect.addEventListener('change', function() {
        const selectedStock = selectElement.value;
        const selectedTimeFrame = timeFrameSelect.value;
        document.getElementById('myChart').remove();
        const canvas = document.createElement('canvas');
        canvas.id = 'myChart';
        document.querySelector('.container').appendChild(canvas);
        updateChart(selectedStock, selectedTimeFrame);
    });

    const stocks = ['AAPL', 'GOOGL', 'MSFT','NVDA']; // Example stock symbols
    stocks.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock;
        option.textContent = stock;
        selectElement.appendChild(option);
    });

    updateChart(stocks[0], '1m'); // Initially display chart for the first stock and 1 month time frame
});
