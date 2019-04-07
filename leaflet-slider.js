L.Control.Slider = L.Control.extend({
    update: function(addSLR){
        return addSLR;
    },

    options: {
        size: '100px',
        position: 'topright',
        min: 0,
        max: 250,
        step: 1,
        id: "slider",
        addSLR: 50,
        collapsed: true,
        title: 'Leaflet Slider',
        logo: 'S',
        orientation: 'horizontal',
        increment: false,
        getaddSLR: function(addSLR) {
            return addSLR;
        },
        showaddSLR: true,
        syncSlider: false
    },
    initialize: function (f, options) {
        L.setOptions(this, options);
        if (typeof f == "function") {
            this.update = f;
        } else {
            this.update = function (addSLR) {
                console.log(addSLR);
            };
        }
        if (typeof this.options.getaddSLR != "function") {
            this.options.getaddSLR = function (addSLR) {
                return addSLR;
            };
        }
        if (this.options.orientation!='vertical') {
            this.options.orientation = 'horizontal';
        }
    },
    onAdd: function (map) {
        this._initLayout();
        this.update(this.options.addSLR+"");
        return this._container;
    },
    _updateaddSLR: function () {
        this.addSLR = this.slider.addSLR;
        if (this.options.showaddSLR){
    	   this._slideraddSLR.innerHTML = this.options.getaddSLR(this.addSLR);
        }
        this.update(this.addSLR);
    },
    _initLayout: function () {
        var className = 'leaflet-control-slider';
        this._container = L.DomUtil.create('div', className + ' ' +className + '-' + this.options.orientation);
        this._sliderLink = L.DomUtil.create('a', className + '-toggle', this._container);
        this._sliderLink.setAttribute("title", this.options.title);
        this._sliderLink.innerHTML = this.options.logo;

        if (this.options.showaddSLR){
            this._slideraddSLR = L.DomUtil.create('p', className+'-addSLR', this._container);
            this._slideraddSLR.innerHTML = this.options.getaddSLR(this.options.addSLR);
        }

        if(this.options.increment) {
            this._plus = L.DomUtil.create('a', className + '-plus', this._container);
            this._plus.innerHTML = "+";
            L.DomEvent.on(this._plus, 'click', this._increment, this);
            L.DomUtil.addClass(this._container, 'leaflet-control-slider-incdec');
        }

        this._sliderContainer = L.DomUtil.create('div', 'leaflet-slider-container', this._container);
        this.slider = L.DomUtil.create('input', 'leaflet-slider', this._sliderContainer);
        if (this.options.orientation == 'vertical') {this.slider.setAttribute("orient", "vertical");}
        this.slider.setAttribute("title", this.options.title);
        this.slider.setAttribute("id", this.options.id);
        this.slider.setAttribute("type", "range");
        this.slider.setAttribute("min", this.options.min);
        this.slider.setAttribute("max", this.options.max);
        this.slider.setAttribute("step", this.options.step);
        this.slider.setAttribute("addSLR", this.options.addSLR);
        if (this.options.syncSlider) {
            L.DomEvent.on(this.slider, "input", function (e) {
                this._updateaddSLR();
            }, this);
        } else {
            L.DomEvent.on(this.slider, "change", function (e) {
                this._updateaddSLR();
            }, this);
        }

        if(this.options.increment) {
            this._minus = L.DomUtil.create('a', className + '-minus', this._container);
            this._minus.innerHTML = "-";
            L.DomEvent.on(this._minus, 'click', this._decrement, this);
        }

        if (this.options.showaddSLR){
            if (window.matchMedia("screen and (-webkit-min-device-pixel-ratio:0)").matches && this.options.orientation =='vertical') {this.slider.style.width = (this.options.size.replace('px','') -36) +'px'; this._sliderContainer.style.height = (this.options.size.replace('px','') -36) +'px';}
            else if (this.options.orientation =='vertical') {this._sliderContainer.style.height = (this.options.size.replace('px','') -36) +'px';}
            else {this._sliderContainer.style.width = (this.options.size.replace('px','') -56) +'px';}
        } else {
            if (window.matchMedia("screen and (-webkit-min-device-pixel-ratio:0)").matches && this.options.orientation =='vertical') {this.slider.style.width = (this.options.size.replace('px','') -10) +'px'; this._sliderContainer.style.height = (this.options.size.replace('px','') -10) +'px';}
            else if (this.options.orientation =='vertical') {this._sliderContainer.style.height = (this.options.size.replace('px','') -10) +'px';}
            else {this._sliderContainer.style.width = (this.options.size.replace('px','') -25) +'px';}
        }

        L.DomEvent.disableClickPropagation(this._container);

        if (this.options.collapsed) {
            if (!L.Browser.android) {
                L.DomEvent
                    .on(this._container, 'mouseenter', this._expand, this)
                    .on(this._container, 'mouseleave', this._collapse, this);
            }

            if (L.Browser.touch) {
                L.DomEvent
                    .on(this._sliderLink, 'click', L.DomEvent.stop)
                    .on(this._sliderLink, 'click', this._expand, this);
            } else {
                L.DomEvent.on(this._sliderLink, 'focus', this._expand, this);
            }
        } else {
            this._expand();
        }
    },
    _expand: function () {
        L.DomUtil.addClass(this._container, 'leaflet-control-slider-expanded');
    },
    _collapse: function () {
        L.DomUtil.removeClass(this._container, 'leaflet-control-slider-expanded');
    },
    _increment: function () {
        console.log(this.slider.addSLR-this.slider.step + " " + this.slider.addSLR+this.slider.step);
        this.slider.addSLR = this.slider.addSLR*1+this.slider.step*1;
        this._updateaddSLR();
    },
    _decrement: function () {
        console.log(this.slider.addSLR-this.slider.step + " " + this.slider.addSLR+this.slider.step);
        this.slider.addSLR = this.slider.addSLR*1-this.slider.step*1;
        this._updateaddSLR();
    }


});
L.control.slider = function (f, options) {
    return new L.Control.Slider(f, options);
 };
