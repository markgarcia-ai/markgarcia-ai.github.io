document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/NVDA.csv')
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
});