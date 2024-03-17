// Fetch stock data from JSON file
fetch('jsons/stocks.json')
.then(response => response.json())
.then(data => {
    const marketSelect = document.getElementById('marketSelect');
    const stockSelect = document.getElementById('stockSelect');
    const stockDetails = document.getElementById('stockDetails');

    // Populate market options
    data.markets.forEach(market => {
        const option = document.createElement('option');
        option.value = market.name;
        option.textContent = market.name;
        marketSelect.appendChild(option);
    });

    // Function to populate stock options based on selected market
    function populateStocks(marketName) {
        const market = data.markets.find(market => market.name === marketName);
        stockSelect.innerHTML = ''; // Clear previous options
        market.stocks.forEach(stock => {
            const option = document.createElement('option');
            option.value = stock.symbol;
            option.textContent = `${stock.symbol} - ${stock.name}`;
            stockSelect.appendChild(option);
        });
    }

    // Populate stocks based on selected market
    populateStocks(marketSelect.value);

    // Display stock details based on selected stock
    stockSelect.addEventListener('change', () => {
        const selectedMarket = marketSelect.value;
        const selectedSymbol = stockSelect.value;
        const selectedStock = data.markets
            .find(market => market.name === selectedMarket)
            .stocks.find(stock => stock.symbol === selectedSymbol);
        stockDetails.innerHTML = `
            <p><strong>Price:</strong> $${selectedStock.price}</p>
            <p><strong>Change:</strong> ${selectedStock.change}</p>
        `;
    });

    // Update stocks when market selection changes
    marketSelect.addEventListener('change', () => {
        const selectedMarket = marketSelect.value;
        populateStocks(selectedMarket);
    });
});
