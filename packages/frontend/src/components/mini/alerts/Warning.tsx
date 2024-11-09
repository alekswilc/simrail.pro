import { WarningAlertIcon } from "../icons/AlertIcons.tsx";

export const WarningAlert = ({ title, description }: { title: string, description: string }) =>
        <div
                className="flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
            <div className="mr-5 flex h-9 w-9 items-center justify-center rounded-lg bg-warning bg-opacity-30">
                <WarningAlertIcon/>
            </div>
            <div className="w-full">
                <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
                    { title }
                </h5>
                <p className="leading-relaxed text-[#D0915C]">
                    { description }
                </p>
            </div>
        </div>;
