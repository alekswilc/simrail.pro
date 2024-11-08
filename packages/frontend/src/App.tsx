import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Loader } from './components/mini/loaders/PageLoader.tsx';
import { PageTitle } from './components/mini/util/PageTitle.tsx';
import Chart from './old/Chart.tsx';
import { Home } from './pages/Home';
import Alerts from './old/UiElements/Alerts.tsx';
import Buttons from './old/UiElements/Buttons.tsx';
import DefaultLayout from './layout/DefaultLayout';
import './i18n';
import { TrainLeaderboard } from './pages/leaderboard/TrainLeaderboard.tsx';
import { StationLeaderboard } from './pages/leaderboard/StationsLeaderboard.tsx';
import { TrainLogs } from './pages/logs/TrainLogs.tsx';
import { StationLogs } from './pages/logs/StationLogs.tsx';
import { Profile } from './pages/profile/Profile.tsx';
import { Log } from './pages/log/Log.tsx';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import useColorMode from './hooks/useColorMode.tsx';

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const { pathname } = useLocation();
    const [theme] = useColorMode();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 400);
    }, []);

    return loading ? (
            <Loader />
    ) : (
            <>
                <ToastContainer
                        position="bottom-right"
                        autoClose={1500}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnHover
                        theme={theme as 'light' | 'dark'}
                />
                <DefaultLayout>
                    <Routes>
                        <Route
                                index
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | Home" />
                                        <Home />
                                    </>
                                }
                        />
                        <Route
                                path="/leaderboard/trains"
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | Train Leaderboard" />
                                        <TrainLeaderboard />
                                    </>
                                }
                        />

                        <Route
                                path="/logs/trains"
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | Train logs" />
                                        <TrainLogs />
                                    </>
                                }
                        />

                        <Route
                                path="/logs/stations"
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | Station logs" />
                                        <StationLogs />
                                    </>
                                }
                        />

                        <Route
                                path="/leaderboard/stations"
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | Stations Leaderboard" />
                                        <StationLeaderboard />
                                    </>
                                }
                        />

                        <Route
                                path="/profile/:id"
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | User Profile" />
                                        {/* page title is modified after API response */}
                                        <Profile />
                                    </>
                                }
                        />

                        <Route
                                path="/log/:id"
                                element={
                                    <>
                                        <PageTitle title="simrail.alekswilc.dev | Log" />
                                        {/* page title is modified after API response */}
                                        <Log />
                                    </>
                                }
                        />
                    </Routes>
                </DefaultLayout>
            </>
    );
}

export default App;
