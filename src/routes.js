import { Auth, HistoryPage, MainPage, StatisticPage } from "./pages";
import { HISTORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, STATISTIC_ROUTE } from "./utils/consts";


export const routes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth,
    },
    {
        path: MAIN_ROUTE,
        Component: MainPage,
    },
    {
        path: STATISTIC_ROUTE,
        Component: StatisticPage,
    },
    {
        path: HISTORY_ROUTE,
        Component: HistoryPage,
    }
];