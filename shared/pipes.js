EventTarget.prototype.pipe = function(...args) {
    const pipeFunctions = Array.from(args);
    const eventName = typeof pipeFunctions[0] === 'string' ? pipeFunctions.shift() : 'value';
    const newTarget = new EventTarget();
    newTarget.handleEvent = function(e) {
        this.dispatchEvent(new CustomEvent('value',
            { detail: pipeFunctions.reduce((value, func) => func(value), e.detail) }));
    }

    this.addEventListener(eventName, newTarget);

    return newTarget;
};

EventTarget.prototype.subscribe = function(listener) {
    const l = e => listener(e.detail);
    this.addEventListener('value', l);
    return () => { this.removeEventListener('value', l) };
};

EventTarget.prototype.update = function(newValue) {
    this.dispatchEvent(new CustomEvent('value', { detail: newValue}));
}

EventTarget.prototype.eventToValue = function(eventName, conversionFunction) {
    this.addEventListener(eventName, (e) => {
        this.dispatchEvent(new CustomEvent('value', { detail: conversionFunction(e) }));
    });
};