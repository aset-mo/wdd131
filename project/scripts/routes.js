// Data for trekking routes
const trekkingRoutes = [
    {
        id: 'salkantay',
        name: 'Salkantay Trek',
        difficulty: 'challenging',
        length: '74 km',
        duration: '5 days',
        elevationGain: '2000m',
        description: 'A popular alternative to the Inca Trail, leading to Machu Picchu through diverse landscapes.',
        image: 'images/salkantay.webp',
        mapLink: 'https://maps.app.goo.gl/4vP7QF3Nei2qu2da7',
        equipment: ['Tent', 'Sleeping bag', 'Warm layers', 'Hiking boots', 'Water filter']
    },
    {
        id: 'huayhuash',
        name: 'Huayhuash Circuit',
        difficulty: 'challenging',
        length: '130 km',
        duration: '10-14 days',
        elevationGain: '4000m',
        description: 'One of the most spectacular treks in the world, renowned for its stunning mountain scenery.',
        image: 'images/huayhuash.webp',
        mapLink: 'https://maps.app.goo.gl/EtbPru4DsvbVkgt76',
        equipment: ['Expedition tent', 'Down sleeping bag', 'Ice axe (seasonal)', 'Crampons (seasonal)', 'GPS']
    },
    {
        id: 'quilotoa',
        name: 'Quilotoa Loop',
        difficulty: 'moderate',
        length: '35 km',
        duration: '2-3 days',
        elevationGain: '1000m',
        description: 'A beautiful trek around the Quilotoa crater lake, with stunning views and indigenous communities.',
        image: 'images/quilotoa.webp',
        mapLink: 'https://maps.app.goo.gl/6Q3rqNUmYvXjhHoH7',
        equipment: ['Day pack', 'Hiking shoes', 'Rain jacket', 'Water bottle']
    },
    {
        id: 'patagonia-w',
        name: 'W Trek (Torres del Paine)',
        difficulty: 'moderate',
        length: '76 km',
        duration: '4-5 days',
        elevationGain: '1500m',
        description: 'Iconic trek in Chilean Patagonia, visiting famous landmarks like the Towers and French Valley.',
        image: 'images/torres paine.webp',
        mapLink: 'https://maps.app.goo.gl/4SQxeafL5p7Xqqrk9',
        equipment: ['Backpack', 'Waterproof gear', 'Layered clothing', 'Map and compass']
    },
    {
        id: 'colca-canyon',
        name: 'Colca Canyon Trek',
        difficulty: 'easy',
        length: '20 km',
        duration: '2 days',
        elevationGain: '800m',
        description: 'Descend into one of the world\'s deepest canyons, known for condor sightings.',
        image: 'images/colca canyon.webp',
        mapLink: 'https://maps.app.goo.gl/j4U4TyeJB84Jew588',
        equipment: ['Light day pack', 'Sunscreen', 'Hat', 'Insect repellent']
    }
];

const routesContainer = document.getElementById('routes-container');
const difficultyFilter = document.getElementById('difficulty-filter');
const sortBy = document.getElementById('sort-by');

// Function to display routes
function displayRoutes(routes) {
    routesContainer.innerHTML = ''; // Clear previous routes

    if (routes.length === 0) {
        routesContainer.innerHTML = '<p>No routes found matching your criteria.</p>';
        return;
    }

    routes.forEach(route => {
        const routeCard = `
            <article class="route-card" id="${route.id}">
                <img src="${route.image}" alt="Image of ${route.name}" loading="lazy">
                <h3>${route.name}</h3>
                <p><strong>Difficulty:</strong> <span class="difficulty">${route.difficulty.charAt(0).toUpperCase() + route.difficulty.slice(1)}</span></p>
                <p><strong>Length:</strong> ${route.length}</p>
                <p><strong>Duration:</strong> ${route.duration}</p>
                <p>${route.description}</p>
                <p><a href="${route.mapLink}" target="_blank" class="button-small">View Map</a></p>
                <button class="button-small" onclick="toggleFavorite('${route.id}')">
                    ${isFavorite(route.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
            </article>
        `;
        routesContainer.innerHTML += routeCard;
    });
}

// Function to filter and sort routes
function filterAndSortRoutes() {
    let filteredRoutes = [...trekkingRoutes]; // Create a copy to avoid modifying original array

    // 1. Filter by difficulty
    const selectedDifficulty = difficultyFilter.value;
    if (selectedDifficulty !== 'all') {
        filteredRoutes = filteredRoutes.filter(route => route.difficulty === selectedDifficulty);
    }

    // 2. Sort
    const selectedSort = sortBy.value;
    switch (selectedSort) {
        case 'name':
            filteredRoutes.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'length-asc':
            filteredRoutes.sort((a, b) => {
                // Assuming length is like "74 km", extract number
                const lenA = parseFloat(a.length);
                const lenB = parseFloat(b.length);
                return lenA - lenB;
            });
            break;
        case 'length-desc':
            filteredRoutes.sort((a, b) => {
                const lenA = parseFloat(a.length);
                const lenB = parseFloat(b.length);
                return lenB - lenA;
            });
            break;
    }

    displayRoutes(filteredRoutes);
}

// Function to manage favorites using localStorage
function getFavorites() {
    const favorites = localStorage.getItem('favoriteRoutes');
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    localStorage.setItem('favoriteRoutes', JSON.stringify(favorites));
}

function isFavorite(routeId) {
    const favorites = getFavorites();
    return favorites.includes(routeId);
}

function toggleFavorite(routeId) {
    let favorites = getFavorites();
    if (isFavorite(routeId)) {
        // Remove from favorites
        favorites = favorites.filter(id => id !== routeId);
        // Assuming showAlert is in main.js and accessible globally
        if (typeof showAlert !== 'undefined') {
            showAlert('Route removed from favorites!', 'info');
        }
    } else {
        // Add to favorites
        favorites.push(routeId);
        if (typeof showAlert !== 'undefined') {
            showAlert('Route added to favorites!', 'success');
        }
    }
    saveFavorites(favorites);
    // Re-display routes to update button text
    filterAndSortRoutes();
}


// Event Listeners
difficultyFilter.addEventListener('change', filterAndSortRoutes);
sortBy.addEventListener('change', filterAndSortRoutes);

// Initial display of routes when the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (routesContainer) { // Ensure we are on the routes page
        filterAndSortRoutes();
    }
});