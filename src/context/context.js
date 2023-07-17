import { createContext } from "react"
export const StoreContext = createContext(null) // Глобальное хранилище состояний App.js
export const AppRouterContext = createContext(null) // Хранилище хранилище состояний AppRouter.jsx
export const AutorizationContext = createContext(null) // Хранилище хранилище состояний Autorization.js