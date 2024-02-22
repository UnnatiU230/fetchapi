async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        console.log(data)
        populateTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function populateTable(data) {
    const tableBody = document.querySelector('#crypto-table tbody');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const idCell = document.createElement('td');
        const symbolCell = document.createElement('td');
        const priceCell = document.createElement('td');
        const volumeCell = document.createElement('td');

        const icon = document.createElement('img');
        icon.src = item.image;
        icon.alt = item.name;

        const name = document.createElement('span');
        name.textContent = item.name;

        nameCell.appendChild(icon);
        idCell.textContent = item.id;
        nameCell.appendChild(name);
        symbolCell.textContent = item.symbol;
        priceCell.textContent = `$${item.current_price.toFixed(2)}`;
        volumeCell.textContent = `$${item.total_volume.toLocaleString()}`;

        row.appendChild(nameCell);
        row.appendChild(idCell);
        row.appendChild(symbolCell);
        row.appendChild(priceCell);
        row.appendChild(volumeCell);

        tableBody.appendChild(row);
    });
}


fetchData();