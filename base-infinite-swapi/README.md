# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Infinite Scroll Notes
- fetch new data just in time as user scrolls
- more efficient than fetching all data at once

Task
- fetch new data when: user clicks a button, & user scrolls to certain point on the page

useInfiniteQuery
- requires different API format than pagination
- pagination - tracks current page in component state, and new query updates page #
- useInfiniteQuery tracks the next query - "next" query is returned as part of the data
    - object with 2 properties: "pages", and "pageParams" (what param is for every page)
    - every query has its own element in the pages array; query changes as we advance the pages
    - pageParams tracks the keys of queries that have been retrieved (rarely used, wont use in this repo)

Syntax for useInfiniteQuery
    useInfiniteQuery({
        queryKey: ["sw-people"],
        queryFn: ({ pageParam = initialUrl }) => fetchUrl(pageParam)
    })

- Current valuye of pageParam is maintained by React Query
- useInfiniteQuery options
    - getNextPageParam: (lastPage, allPages)
    - updates pageParam
    - might use all of the pages of data (allPages)
    - we will just use the lastPage of data (specifically the "next" property)

- fetchNextPage - function to call when the user needs more data
- hasNextPage - based on the return value of getNextPageParam. If undefined, no more data
- isFetchingNextPage - for displaying a loading spinner

The flow
Component mounts --> Fetch first page --> getNextPageParam (Update pageParam)
- if pageParam is defined, hasNextPage is true
- when the user scrolls/clicks button, fetchNextPage --> update pageParam and the cycle continues
- when pageParam is undefined, hasNextPage is false, so the scrolling is "done"

React Infinite Scroller Package
- works nicely with useInfiniteQuery
- populate 2 props for InfiniteScroll component
- hasMore={hasNextPage}
- loadMore={() => {
    if (!isFetching) fetchNextPage();
}}
- Component takes care of detecting when to load more
- data in data.pages[x].results

Bidirectional Scrolling
- useful when starting in the middle
- all "next" methods and properties have equivalent for "previous"

Summary
- React Query manages:
    - pageParam for next page to be fetched
        - getNextPageParam option
        - could be from lastPage, or allPages
    - hasNextPage - boolean indicatign whether pageParam is undefined
- Component handles calling fetchNextPage
    - use hasNextPage value to determine when to stop

https://swapi-node.vercel.app
https://swapi.dev
https://www.npmjs.com/package/react-infinite-scroller