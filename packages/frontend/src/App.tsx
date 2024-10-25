import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Loader } from './components/loaders/PageLoader.tsx';
import { PageTitle } from './components/common/PageTitle.tsx';
import Chart from './old/Chart.tsx';
import { Home } from './pages/Home';
import Settings from './old/Settings.tsx';
import Tables from './old/Tables.tsx';
import Alerts from './old/UiElements/Alerts.tsx';
import Buttons from './old/UiElements/Buttons.tsx';
import DefaultLayout from './layout/DefaultLayout';
import "./i18n";
import { TrainLeaderboard } from './pages/leaderboard/TrainLeaderboard.tsx';
import { StationLeaderboard } from './pages/leaderboard/StationsLeaderboard.tsx';
import { TrainLogs } from './pages/logs/TrainLogs.tsx';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 400);
  }, []);

  return loading ? (
    <Loader />
  ) : (
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
          path="/leaderboard/stations"
          element={
            <>
              <PageTitle title="simrail.alekswilc.dev | Stations Leaderboard" />
              <StationLeaderboard />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
