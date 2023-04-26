# Installation
```aidl
Node 18 and latest React
```

```sh
cd pokedex
npm install
npm run dev
```

# Testing
```sh
npm run test
```
# TODO
* Image loading in pokemon list
* Concurrent environment
    * Authentication
    * Cache/Use Database for all details queries on pageload
    * Store user search history
* Base component to handle loading, error, no results
* Pokemon detail layout
* invalidatesTags for query caching
* 95% test coverage
* Typescript fixes
* Search box shared component
* Details screen should take details as a prop and if not passed in make details query
* CSS classes and line length (use classnames module)
* Tailwind theme