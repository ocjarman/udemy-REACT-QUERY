# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


React Query Notes
- larger apps - common to make custom hook for each type of data
    - can access from multiple components
    - no risk of mixing up keys
    - query function encapsulated in custom hook
    - abstracts implementation from display layer
        - update hook if you change implementation and there is no need to update components