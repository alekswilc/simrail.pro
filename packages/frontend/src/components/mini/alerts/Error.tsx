import { ErrorAlertIcon } from '../icons/AlertIcons.tsx';

export const ErrorAlert = ({ title, description }: { title: string, description: string }) => <div
        className="flex w-full border-l-6 border-[#F87171] bg-[#F87171] bg-opacity-[15%] dark:bg-[#1B1B24] px-7 py-8 shadow-md dark:bg-opacity-30 md:p-9">
    <div className="mr-5 flex h-9 w-full max-w-[36px] items-center justify-center rounded-lg bg-[#F87171]">
        <ErrorAlertIcon />
    </div>
    <div className="w-full">
        <h5 className="mb-3 font-semibold text-[#B45454]">
            {title}
        </h5>
        <ul>
            <li className="leading-relaxed text-[#CD5D5D]">
                {description}
            </li>
        </ul>
    </div>
</div>;
