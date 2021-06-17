import { Auth, HistoryPage, MainPage, StatisticPage } from "./components/pages";
import { HISTORY_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, STATISTIC_ROUTE, LAYOUT_ROUTE } from "./utils/consts";
import Layout from "./components/common/Layout/Layout";


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
    },
    {
        path: LAYOUT_ROUTE,
        Component: Layout,
    },
];