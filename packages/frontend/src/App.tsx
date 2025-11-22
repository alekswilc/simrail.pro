/*
 * Copyright (C) 2025 Aleksander <alekswilc> Wilczyński (aleks@alekswilc.dev)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * See LICENSE for more.
 */

import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Loader } from "./components/mini/loaders/PageLoader.tsx";
import { Home } from "./pages/Home";
import DefaultLayout from "./layout/DefaultLayout";
import "./i18n";
import { Leaderboard } from "./pages/leaderboard/Leaderboard.tsx";
import { TrainLogs } from "./pages/logs/TrainLogs.tsx";
import { StationLogs } from "./pages/logs/StationLogs.tsx";
import { Profile } from "./pages/profiles/Profile.tsx";
import { Log } from "./pages/log/Log.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import useColorMode from "./hooks/useColorMode.tsx";
import { HelmetProvider } from "react-helmet-async";
import { PageMeta } from "./components/mini/util/PageMeta.tsx";
import { ActiveStationsPlayers } from "./pages/activePlayers/ActiveStationsPlayers.tsx";
import { ActiveTrainPlayers } from "./pages/activePlayers/ActiveTrainPlayers.tsx";
import { AuthProvider } from "./hooks/useAuth.tsx";
import { NotFoundError } from "./pages/errors/NotFound.tsx";
import { Profiles } from "./pages/profiles/Profiles.tsx";

function App()
{
    const [ loading, setLoading ] = useState<boolean>(true);
    const { pathname, } = useLocation();
    const [ theme ] = useColorMode();
    useEffect(() =>
    {
        window.scrollTo(0, 0);
    }, [ pathname ]);

    useEffect(() =>
    {
        setTimeout(() => setLoading(false), 400);

        if (['simrail.pro', 'simrail.info'].includes(window.location.hostname)) {
            window.location.href = window.location.hostname.replace(/simrail\.pro|simrail\.info/g, 'simrail.alekswilc.dev');
        }
    }, []);



    return <HelmetProvider>
        <AuthProvider>
            { loading ? (
                    <Loader/>
            ) : (
                    <>
                        <ToastContainer
                                position="top-center"
                                autoClose={ 1500 }
                                hideProgressBar={ false }
                                newestOnTop={ false }
                                closeOnClick
                                rtl={ false }
                                pauseOnHover
                                theme={ theme as "light" | "dark" }
                        />
                        <DefaultLayout>
                            <Routes>
                                <Route
                                        index
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Home"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                <Home/>
                                            </>
                                        }
                                />
                                <Route
                                        path="/leaderboard/"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Train Leaderboard"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                <Leaderboard/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/logs/trains"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Trains Logs"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                <TrainLogs/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/logs/stations"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Stations Logs"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                <StationLogs/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/active/trains"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Active Trains"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                <ActiveTrainPlayers/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/active/stations"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Active Station"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                <ActiveStationsPlayers/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/profile/:id"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Profile"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                {/* page meta is modified in component! */ }
                                                <Profile/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/profiles/"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Profiles"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                {/* page meta is modified in component! */ }
                                                <Profiles/>
                                            </>
                                        }
                                />

                                <Route
                                        path="/log/:id"
                                        element={
                                            <>
                                                <PageMeta title="simrail.alekswilc.dev | Log"
                                                          description="Simrail Stats - The best SimRail logs and statistics site!"/>
                                                {/* page title is modified after API response */ }
                                                <Log/>
                                            </>
                                        }
                                />

                                <Route
                                        path="*"
                                        element={
                                            <>
                                                <NotFoundError/>
                                            </>
                                        }
                                />
                            </Routes>
                        </DefaultLayout>
                    </>
            ) }
        </AuthProvider>
    </HelmetProvider>;
}

export default App;
