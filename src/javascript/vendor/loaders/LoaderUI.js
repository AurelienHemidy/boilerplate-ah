class LoaderUI {
    constructor(el) {
        this.el = document.querySelector(`#${el}`);
    }

    setLoaderProgress(progress) {
        this.el.innerText = progress;
    }

    //Quand le loading est terminé, le laoder disparait
    toggleLoader() {
        setTimeout(() => {
            this.el.style.opacity = 0;
        }, 1000);
    }

}

export default LoaderUI;