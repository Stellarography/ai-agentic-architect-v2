import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App' // Remove old App import
import AppRoutes from './router/AppRoutes'; // Import the new router
import './index.css'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"; // Import Toaster

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes /> {/* Render the router */}
        <Toaster richColors position="top-right" /> {/* Add Toaster */}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
