## `useMemo`

This is a contrived search example, designed to explore the [`useMemo`](https://react.dev/reference/react/useMemo) hook in React. 

The demo implements real-time filtering and sorting that runs on every keystroke. Without `useMemo`, the filter and sort functions would re-execute on every render, even when their inputs haven't changed.

### What `useMemo` helps with

`useMemo` caches the results of expensive calculations and only recalculates when dependencies change. In this demo:
- Filtered products are memoized based on `products`, `searchTerm`, and `category`
- Sorted products are memoized based on the filtered results and `sortBy`

This prevents unnecessary recalculations when typing in the search box or interacting with other UI elements.

### Real-world alternatives

In a production environment, this problem could be resolved differently:
* **Debouncing** - delay the search until the user stops typing
* **Search on submit** - only filter when the user clicks a button/submits a <form>
* **Server-side filtering** - let the backend handle search, filter, and sort operations

For a dataset of this size (1000 products), these alternatives might be more appropriate than `useMemo`.

## Tech Stack
Vite, React and TypeScript.  
[DummyJSON](https://dummyjson.com/) for the fake product data endpoint.

### Installation
`npm install`

### Running
`npm run dev`