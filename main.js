import html2pdf from 'html2pdf.js';

const menuData = [
    // Breakfast
    { id: 1, name: "Sausage McMuffin", price: 93, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-McMuffin-1:1-3-product-tile-desktop" },
    { id: 2, name: "Sausage McMuffin with Egg", price: 143, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Sausage-McMuffin-with-Egg:1-3-product-tile-desktop" },
    { id: 3, name: "Egg McMuffin", price: 133, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Egg-McMuffin-1:1-3-product-tile-desktop" },
    { id: 4, name: "Chicken McDo with Rice", price: 102, image: "https://mcdonalds.com.ph/images/menu/breakfast/chicken-mcdo-with-rice.png" },
    { id: 5, name: "Longganisa McMuffin", price: 113, image: "https://mcdonalds.com.ph/images/menu/breakfast/longganisa-mcmuffin.png" },
    
    // Burgers
    { id: 6, name: "Big Mac", price: 186, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Big-Mac-1:1-3-product-tile-desktop" },
    { id: 7, name: "Quarter Pounder with Cheese", price: 169, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Quarter-Pounder-with-Cheese-1:1-3-product-tile-desktop" },
    { id: 8, name: "Double Cheeseburger", price: 147, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Double-Cheeseburger:1-3-product-tile-desktop" },
    { id: 9, name: "McChicken", price: 128, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-McChicken-1:1-3-product-tile-desktop" },
    
    // Chicken
    { id: 10, name: "1pc Chicken McDo with Rice", price: 102, image: "https://mcdonalds.com.ph/images/menu/chicken-and-platters/1pc-chicken-mcdo-with-rice.png" },
    { id: 11, name: "2pc Chicken McDo with Rice", price: 178, image: "https://mcdonalds.com.ph/images/menu/chicken-and-platters/2pc-chicken-mcdo-with-rice.png" },
    { id: 12, name: "6pc McNuggets", price: 134, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Chicken-McNuggets-6pc:1-3-product-tile-desktop" },
    
    // Sides
    { id: 13, name: "Regular World Famous Fries", price: 67, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-fries-small:1-3-product-tile-desktop" },
    { id: 14, name: "Large World Famous Fries", price: 94, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-fries-large:1-3-product-tile-desktop" },
    
    // Desserts
    { id: 15, name: "Hot Fudge Sundae", price: 49, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Hot-Fudge-Sundae:1-3-product-tile-desktop" },
    { id: 16, name: "Apple Pie", price: 45, image: "https://mcdomenu.com.ph/wp-content/uploads/2024/03/1628436897_web_alacarte_aOaNk7ZR.webp" },
    
    // Beverages
    { id: 17, name: "Coke Regular", price: 49, image: "https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-Coca-Cola-Classic-Small:1-3-product-tile-desktop" },
    { id: 18, name: "McCafé Premium Roast Coffee", price: 75, image: "https://mcdomenu.com.ph/wp-content/uploads/2024/03/1644829945_web_variance_1AJVrPcg.webp" }
];

let cart = [];

function renderMenu() {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = menuData.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-details">
                <h3>${item.name}</h3>
                <p>₱${item.price.toFixed(2)}</p>
            </div>
            <div class="menu-item-actions">
                <input type="number" min="1" value="1" id="quantity-${item.id}">
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

window.addToCart = (itemId) => {
    const item = menuData.find(i => i.id === itemId);
    const quantity = parseInt(document.getElementById(`quantity-${itemId}`).value);
    
    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...item, quantity });
    }
    
    updateCart();
};

function updateCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                ${item.name} x${item.quantity}
            </div>
            <div>
                ₱${(item.price * item.quantity).toFixed(2)}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalAmount').textContent = total.toFixed(2);
}

window.removeFromCart = (itemId) => {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
};

function generateReceipt() {
    const receipt = document.createElement('div');
    receipt.innerHTML = `
        <div style="padding: 20px; font-family: monospace;">
            <h2 style="text-align: center;">McDonald's Receipt</h2>
            <p style="text-align: center;">${new Date().toLocaleString()}</p>
            <hr>
            ${cart.map(item => `
                <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                    <span>${item.name} x${item.quantity}</span>
                    <span>₱${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
            <hr>
            <div style="display: flex; justify-content: space-between; font-weight: bold; margin-top: 10px;">
                <span>Total:</span>
                <span>₱${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
        </div>
    `;
    
    const opt = {
        margin: 1,
        filename: 'mcdonalds-receipt.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(receipt).save();
}

document.getElementById('printReceipt').addEventListener('click', generateReceipt);

// Initialize the menu
renderMenu();
