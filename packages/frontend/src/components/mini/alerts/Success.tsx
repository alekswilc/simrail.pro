import { SuccessAlertIcon } from '../icons/AlertIcons.tsx';

export const SuccessAlert = ({ title, description }: { title: string, description: string }) =>
        <div
                className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#34D399]">
                <SuccessAlertIcon />
            </div>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
                    {title}
                </h5>
                <p className="text-base leading-relaxed text-body">
                    {description}
                </p>
            </div>
        </div>;