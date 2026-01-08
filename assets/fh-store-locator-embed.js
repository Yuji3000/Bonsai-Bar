(function () {
  if (window.__FH_STORE_LOCATOR_LOADED__) return;
  window.__FH_STORE_LOCATOR_LOADED__ = true;

  const assets = window.FH_STORE_LOCATOR_ASSETS;
  if (!assets || !assets.css || !assets.stores || !assets.app) {
    console.error('FH_STORE_LOCATOR_ASSETS missing. Did you include the Liquid config block?');
    return;
  }

  // Create root container
  const root = document.createElement('div');
  root.id = 'fh-store-locator';
  root.style.width = '100%';
  root.style.minHeight = '600px';

  // Inject base HTML structure
  root.innerHTML = `
    <div class="sidebar">
      <h2 id="store-count" class="sidebar-title">
        <div class="marker"></div>
        <span>Bonsai Bars: 0</span>
      </h2>
      <div id="listings" class="listings"></div>
    </div>
    <div id="map" class="map"></div>
  `;

  // Mount: put it before the current script tag (standard embed behavior)
  const scriptTag = document.currentScript;
  scriptTag.parentNode.insertBefore(root, scriptTag);

  // Load embed CSS
  const embedCss = document.createElement('link');
  embedCss.rel = 'stylesheet';
  embedCss.href = assets.css;
  document.head.appendChild(embedCss);

  // Mapbox CSS
  const mapboxCss = document.createElement('link');
  mapboxCss.rel = 'stylesheet';
  mapboxCss.href = 'https://api.mapbox.com/mapbox-gl-js/v3.14.0/mapbox-gl.css';
  document.head.appendChild(mapboxCss);

  // Assembly CSS
  const assemblyCss = document.createElement('link');
  assemblyCss.rel = 'stylesheet';
  assemblyCss.href = 'https://api.mapbox.com/mapbox-assembly/v1.3.0/assembly.min.css';
  document.head.appendChild(assemblyCss);

  // Load Mapbox JS → Search JS → stores.js → app.js → init
  const mapboxJs = document.createElement('script');
  mapboxJs.src = 'https://api.mapbox.com/mapbox-gl-js/v3.14.0/mapbox-gl.js';
  mapboxJs.onload = loadSearch;
  document.head.appendChild(mapboxJs);

  function loadSearch() {
    const searchJs = document.createElement('script');
    searchJs.src = 'https://api.mapbox.com/search-js/v1.5.0/web.js';
    searchJs.onload = loadStores;
    document.head.appendChild(searchJs);
  }

  function loadStores() {
    const storesScript = document.createElement('script');
    storesScript.src = assets.stores;
    storesScript.onload = loadApp;
    document.head.appendChild(storesScript);
  }

  function loadApp() {
    const appScript = document.createElement('script');
    appScript.src = assets.app;
    appScript.onload = init;
    document.head.appendChild(appScript);
  }

  function init() {
    if (!window.BBStoreLocatorInit) {
      console.error('BBStoreLocatorInit not found');
      return;
    }

    window.BBStoreLocatorInit({ root, baseUrl: '' });
    console.log('FH Store Locator initialized');
  }
})();