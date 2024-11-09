import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Loader } from './components/mini/loaders/PageLoader.tsx';
import { Home } from './pages/Home';
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
import { HelmetProvider } from 'react-helmet-async';
import { PageMeta } from './components/mini/util/PageMeta.tsx';

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

    return <HelmetProvider>


        {loading ? (
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
                                            <PageMeta title="simrail.alekswilc.dev | Home"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            <Home />
                                        </>
                                    }
                            />
                            <Route
                                    path="/leaderboard/trains"
                                    element={
                                        <>
                                            <PageMeta title="simrail.alekswilc.dev | Train Leaderboard"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            <TrainLeaderboard />
                                        </>
                                    }
                            />

                            <Route
                                    path="/logs/trains"
                                    element={
                                        <>
                                            <PageMeta title="simrail.alekswilc.dev | Trains Logs"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            <TrainLogs />
                                        </>
                                    }
                            />

                            <Route
                                    path="/logs/stations"
                                    element={
                                        <>
                                            <PageMeta title="simrail.alekswilc.dev | Stations Logs"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            <StationLogs />
                                        </>
                                    }
                            />

                            <Route
                                    path="/leaderboard/stations"
                                    element={
                                        <>
                                            <PageMeta title="simrail.alekswilc.dev | Station Leaderboard"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            <StationLeaderboard />
                                        </>
                                    }
                            />

                            <Route
                                    path="/profile/:id"
                                    element={
                                        <>
                                            <PageMeta title="simrail.alekswilc.dev | Profile"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            {/* page meta is modified in component! */}
                                            <Profile />
                                        </>
                                    }
                            />

                            <Route
                                    path="/log/:id"
                                    element={
                                        <>
                                            <PageMeta title="simrail.alekswilc.dev | Log"
                                                      description="Simrail Stats - The best SimRail logs and statistics site!" />
                                            {/* page title is modified after API response */}
                                            <Log />
                                        </>
                                    }
                            />
                        </Routes>
                    </DefaultLayout>
                </>
        )}
    </HelmetProvider>;
}

export default App;
