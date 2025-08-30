const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": "CG-wt1pRzvvo4ULMTdtCJjjncVh",
  },
};

async function fetchCoin() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false",
      options
    );
    const data = await res.json();
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const coinContainer = document.getElementById("coins-container");

    coinContainer.innerHTML = "";

    data.slice(0, 30).forEach((coin) => {
      const card = document.createElement("div");
      card.className = "coin-card";

      const img = document.createElement("img");
      img.src = coin.image;
      img.alt = coin.name;

      const name = document.createElement("h1");
      name.innerText = coin.name;

      const price = document.createElement("p");
      price.innerText = `Price: $${coin.current_price.toLocaleString()}`;

      const marketCap = document.createElement("p");
      marketCap.innerText = `Market Cap: $${coin.market_cap.toLocaleString()}`;

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(price);
      card.appendChild(marketCap);

      coinContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to fetch market data:", error);
    document.getElementById("coins-container").textContent =
      "⚠️ Error loading data.";
  }
}

fetchCoin();
