/**
* Base
*/
import '../scss/app.scss';

/**
* Javascript
*/

// Loaders
import ResourceLoader from "./vendor/loaders/ResourceLoader";
import ThreeGLTFLoader from "./vendor/loaders/loaders/three-gltf-loader";
import ImageLoader from "./vendor/loaders/loaders/image-loader";
import LoaderUI from './vendor/loaders/LoaderUI';
import LazyLoader from './vendor/lazyLoader/LazyLoader';
import PageManager from './vendor/pageManager/PageManager';

// Resources
import globalResources from '../../static/datas/globalResources';

// Utils
import bindAll from "./utils/bindAll";

class App {
    constructor() {
        this._resourceLoader = new ResourceLoader();
        this.loaderUI = new LoaderUI("loader");
        this._lazyLoader = new LazyLoader();
        this._pageManager = new PageManager();

        this.datas = null;

        this._bindAll();

        this.registerLoaders();
        this.setupResources();
        this.setupEventListeners();
        this.loadResources();
    }

    registerLoaders() {
        this._resourceLoader.registerLoader({ loader: ThreeGLTFLoader, type: "gltf" });
        this._resourceLoader.registerLoader({ loader: ImageLoader, type: "jpg" });
    }

    setupResources() {
        this._resourceLoader.add({
            resources: globalResources,
            preload: true
        });
    }

    loadResources() {
        this._resourceLoader.preload();
    }

    setupEventListeners() {
        this._resourceLoader.addEventListener('complete', this._loadResourcesCompleteHandler);
        this._resourceLoader.addEventListener('progress', this._loadResourcesProgressHandler);
    }

    _loadResourcesCompleteHandler(e) {
        // console.log("loaded");
        // console.log(e)
        this.datas = e;
        this.loaderUI.toggleLoader();
    }

    _bindAll() {
        bindAll(this, '_loadResourcesProgressHandler', '_loadResourcesCompleteHandler');
    }

    _loadResourcesProgressHandler(e) {
        // console.log(Math.round(e * 100))
        this.loaderUI.setLoaderProgress(Math.round(e * 100));
    }

}

const app = new App();
