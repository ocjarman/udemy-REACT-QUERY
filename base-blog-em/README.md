# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
# blog-em-ipsum
# blogem
# blogem

isFetching vs isLoading
- isFetching - async query function hasnt yet resolved
- isLoading - no cached data, plus isFetching

stale data
- "expired" and ready to be refetched
- still in the cache
    - "stale while revalidating"
- data refetch only triggers for stale data 
    - (i.e. component remount, window refocus)
    - staleTime translates to "max age"
    - how long to tolerate out of date data?
    - with a default staleData of 0, we're always assuming data is out of date and needs to be refetched from the server. This makes it much less likely that you will accidentally have out of date data on the client.

gcTime (garbage collection time)
- how long to keep data that might be reused later
- if no actively used query, the query goes into cold storage (in cache but not being used and its "days are numbered")
- cache data expires after gcTime (default 5 min)
- time that has elapsed since last active useQuery
- after gcTime elapses, data is garbage collected

Prefetching
- adds data to cache
- automatically stale (configurable)
- shows while refetching (as long as not expired)
- can be used for any anticipated data needs, not just pagination

Mutations
- making a network call that changes data on the server
- useMutation
    - returns mutate function
    - doesnt need query key
    - isLoading but no isFetching
    - by default, no retries (but is configurable)