window.BBStoreLocatorInit = function ({ root, baseUrl }) {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoicm9iaW5zb25qbTMiLCJhIjoiY21qYWF3YzR4MDNtaDNlcTF6dTF2ODVhMCJ9.b0SxveOJT7KPk931gTScKw';

  let map;
  const markers = [];

  const mapEl = root.querySelector('#map');
  const listingsEl = root.querySelector('#listings');
  const storeCountEl = root.querySelector('#store-count');

  if (!mapEl || !listingsEl || !storeCountEl) {
    console.error('Store Locator DOM structure missing');
    return;
  }

  function initMap() {
    map = new mapboxgl.Map({
      container: mapEl,
      center: [-96.9, 37.8],
      zoom: 3.5,
      config: {
        basemap: { theme: 'default' }
      }
    });

    map.on('load', () => {
      initSearch();
      addMarkers();
      buildLocationList();
    });
  }

  function initSearch() {
    const searchBox = new MapboxSearchBox();
    searchBox.accessToken = mapboxgl.accessToken;
    searchBox.options = {
      types: 'address,poi',
      proximity: [-73.99209, 40.68933]
    };
    searchBox.marker = true;
    searchBox.mapboxgl = mapboxgl;
    searchBox.componentOptions = {
      allowReverse: true,
      flipCoordinates: true
    };

    map.addControl(searchBox);
  }

  function addMarkers() {
    markers.forEach(marker => marker.remove());
    markers.length = 0;

    stores.features.forEach((store, index) => {
      const el = document.createElement('div');
      el.className = 'marker';
      el.dataset.storeIndex = index;

      const marker = new mapboxgl.Marker({
        element: el,
        anchor: 'bottom'
      })
        .setLngLat(store.geometry.coordinates)
        .addTo(map);

      markers.push(marker);

      el.addEventListener('click', e => {
        e.stopPropagation();
        selectStore(store, index);
      });
    });
  }

  function buildLocationList() {
    storeCountEl.innerHTML = `
      <span class="marker"></span>
      <span>Bonsai Bars: ${stores.features.length}</span>
    `;

    listingsEl.innerHTML = '';

    stores.features.forEach((store, index) => {
      const listing = document.createElement('div');
      listing.className = 'store-item';
      listing.dataset.storeIndex = index;

      listing.innerHTML = `
        <h4 class="store-name">${store.properties.name}</h4>
        <div class="store-details">
          <div>
            <span class="label">Address: </span>
            ${store.properties.address}<br>
            ${store.properties.city}, ${store.properties.state}
            ${store.properties.postalCode}
          </div>
          <div>
            <a
              id="booking"
              class="fh-button--small fh-button-true-flat-cyan fh-icon--calendar-check"
              href="${store.properties.bookingLink}">
              Book This Location
            </a>
          </div>
        </div>
      `;

      listing.addEventListener('click', () => {
        selectStore(store, index);
      });

      listingsEl.appendChild(listing);
    });
  }

  function flyToStore(store) {
    map.flyTo({
      center: store.geometry.coordinates,
      zoom: 13,
      duration: 1000
    });
  }

  function selectStore(store, index) {
    root.querySelectorAll('.store-item.active').forEach(el =>
      el.classList.remove('active')
    );

    const selectedListing =
      listingsEl.children[index];
    if (selectedListing) {
      selectedListing.classList.add('active');
      selectedListing.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }

    root.querySelectorAll('.marker.active').forEach(el =>
      el.classList.remove('active')
    );

    const selectedMarker =
      markers[index]?.getElement();
    if (selectedMarker) {
      selectedMarker.classList.add('active');
    }

    flyToStore(store);
  }

  initMap();
};