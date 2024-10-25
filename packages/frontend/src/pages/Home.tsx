import React from 'react';
import CardDataStats from '../old/CardDataStats';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <CardDataStats title={t('home.stats.trains')} total="5,000" />
          <CardDataStats title={t('home.stats.dispatchers')} total="3,000" />
          <CardDataStats title={t('home.stats.profiles')} total="1,000" />
        </div>


        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 pb-6 text-center">
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                {t('home.title')}
              </h3>
              <p className="font-medium">{t('home.description')}</p>

              <div className="p-4 md:p-6 xl:p-9 flex gap-2 justify-center">
                <Link
                  to="https://git.alekswilc.dev/simrail/simrail.alekswilc.dev"
                  className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  {t('home.buttons.project')}
                </Link>
                <Link
                  to="https://forum.simrail.eu/topic/9142-logowanie-wyj%C5%9B%C4%87-z-posterunk%C3%B3w/"
                  className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-8 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  {t('home.buttons.forum')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="px-4 pb-6 text-center">

            <div className="mt-6.5">
              <p>{t('home.footer.commit')} <Link className='color-orchid' to={"https://git.alekswilc.dev/simrail/simrail.alekswilc.dev/commit/COMMIT"}>COMMIT</Link> | {t('home.footer.version')} <Link className='color-orchid' to={"https://git.alekswilc.dev/simrail/simrail.alekswilc.dev/releases/tag/VERSION"}>VERSION</Link></p>
              <p>{t("home.footer.license")} <Link className='color-orchid' to={'https://git.alekswilc.dev/simrail/simrail.alekswilc.dev/src/branch/main/LICENSE'}>GNU AGPL V3</Link></p>
              <p>{t("home.footer.powered")} <Link className='color-orchid' to={"https://tailadmin.com/"}>TailAdmin</Link></p>

            </div>

          </div>
        </div>
      </div>




    </>
  );
};