// Импорты
import Game from "../pages/Game/Game"
import Start from "../pages/Start/Start"
import Results from "../pages/Results/Results"
import CustomLogin from "../pages/Login/CustomLogin"
/////////////////////////////////////////////////////

export const privateRoutes = [
	{ path: '/MafiaLegacy/game', element: <Game />, exact: true }, // Страница панели управления игры
	{ path: '/MafiaLegacy/start', element: <Start />, exact: true }, // Страница параметров игры
	{ path: '/MafiaLegacy/results', element: <Results />, exact: true }, // Страница результатов игры
] // Страницы доступные после аунтификации

export const publicRoutes = [
	{ path: '/MafiaLegacy/login', element: <CustomLogin />, exact: true }, // Страница логина
]// Страницы доступные без аунтификации


