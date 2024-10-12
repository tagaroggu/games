export function LazyFactory(baseURL) {
    return function(relativeURL, exportedSymbol = 'default') {
        return function(...args) {
            return import(new URL(relativeURL, baseURL))
                .then(mod => mod[exportedSymbol].apply(this, args))
        }
    }
}