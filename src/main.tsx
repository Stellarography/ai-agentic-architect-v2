import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from "@/components/theme-provider";
import AppRoutes from './router/AppRoutes';
import './styles.css'; // Use the correct global CSS file
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Toaster } from "@/components/ui/sonner";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster 
          richColors 
          position="top-right"
          closeButton
          theme="system" // Use system theme by default
          expand={false} // Compact by default
          duration={4000} // 4 seconds display time
        />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
