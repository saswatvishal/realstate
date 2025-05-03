// Dummy properties for now
let properties = [
  {
    title: "Modern Downtown Apartment",
    location: "Downtown, New York",
    type: "2BHK",
    facing: "East",
    price: 320000
  },
  {
    title: "Suburban Family Home",
    location: "Pleasant Valley, California",
    type: "4BHK",
    facing: "South",
    price: 450000
  },
  {
    title: "Beachfront Condo",
    location: "Coastal Heights, Florida",
    type: "3BHK",
    facing: "North",
    price: 550000
  }
];

// Cart to store selected properties
let cart = [];

// Show Section (Buyer, Seller, Agent, Cart)
function showSection(sectionId) {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => section.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');

  if (sectionId === 'buyer') {
    displayProperties(properties);
  } else if (sectionId === 'cart') {
    displayCart();
  }
}
function searchProperties() {
  const location = document.getElementById('searchLocation').value.toLowerCase();
  const type = document.getElementById('searchType').value;
  const facing = document.getElementById('searchFacing').value;

  const filtered = properties.filter(prop => {
    return (
      (location === '' || prop.location.toLowerCase().includes(location)) &&
      (type === '' || prop.type === type) &&
      (facing === '' || prop.facing === facing)
    );
  });

  displayProperties(filtered);
}
// Display Properties for Buyer with Buy Button
function displayProperties(props) {
  const propertyList = document.getElementById('propertyList');
  propertyList.innerHTML = '';

  if (props.length === 0) {
    propertyList.innerHTML = '<p>No properties found.</p>';
    return;
  }

  props.forEach(prop => {
    const div = document.createElement('div');
    div.className = 'property';
    div.innerHTML = `
      <h3>${prop.title}</h3>
      <p><strong>Location:</strong> ${prop.location}</p>
      <p><strong>Type:</strong> ${prop.type}</p>
      <p><strong>Facing:</strong> ${prop.facing}</p>
      <p><strong>Price:</strong> $${prop.price}</p>
      <button class="buy-button" onclick="addToCart('${prop.title}')">Add to Cart</button>
      <button class="buy-button" onclick="buyProperty('${prop.title}')">Buy Now</button>
    `;
    propertyList.appendChild(div);
  });
}

// Buy Property
function buyProperty(propertyTitle) {
  const property = properties.find(p => p.title === propertyTitle);
  if (property) {
    alert(`You have successfully bought ${propertyTitle} for $${property.price}`);
    // Optionally, you can implement further steps here (e.g., redirect to payment page)
  }
}

// Add property to the cart
function addToCart(propertyTitle) {
  const property = properties.find(p => p.title === propertyTitle);
  if (property) {
    cart.push(property);
    alert(`${propertyTitle} added to your cart.`);
  }
}

// Display Cart Contents
function displayCart() {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';

  if (cart.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach(prop => {
    const div = document.createElement('div');
    div.className = 'property';
    div.innerHTML = `
      <h3>${prop.title}</h3>
      <p><strong>Location:</strong> ${prop.location}</p>
      <p><strong>Type:</strong> ${prop.type}</p>
      <p><strong>Facing:</strong> ${prop.facing}</p>
      <p><strong>Price:</strong> $${prop.price}</p>
      <button class="remove-button" onclick="removeFromCart('${prop.title}')">Remove from Cart</button>
    `;
    cartList.appendChild(div);
  });
}

// Remove property from cart
function removeFromCart(propertyTitle) {
  cart = cart.filter(p => p.title !== propertyTitle);
  displayCart(); // Refresh cart display
}

// Seller Adds a New Property
function addProperty(event) {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const type = document.getElementById('type').value;
  const facing = document.getElementById('facing').value;

  const newProperty = { title, location, price, type, facing };
  properties.push(newProperty);

  alert('Property added successfully!');
  document.getElementById('propertyForm').reset();
}
