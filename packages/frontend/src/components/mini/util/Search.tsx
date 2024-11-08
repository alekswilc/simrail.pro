import { ChangeEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

export const Search = ({ searchItem, handleInputChange }: {
    searchItem: string;
    handleInputChange: ChangeEventHandler
}) => {
    const { t } = useTranslation();
    return <div
            className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
        <div className="flex justify-center items-center">
            <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-5 pr-5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    type="text"
                    onChange={handleInputChange}
                    value={searchItem}
                    placeholder={t('logs.search')}
            />
        </div>
    </div>;
};