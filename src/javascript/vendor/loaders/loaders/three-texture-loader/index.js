import { TextureLoader } from 'three';

class ThreeTextureLoader {
    constructor() {
        this._loader = new TextureLoader();
    }
    
    /**
     * Public
     */
    load({ path }) {
        const promise = new Promise((resolve, reject) => {
            this._loader.load(path, resolve, null, reject);
        });

        return promise;
    }
}

export default ThreeTextureLoader;