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

import { ReactNode, useState } from "react";

interface SidebarLinkGroupProps
{
    children: (handleClick: () => void, open: boolean) => ReactNode;
    activeCondition: boolean;
    isOpen: boolean;
}

const SidebarLinkGroup = ({ children, activeCondition, isOpen }: SidebarLinkGroupProps) =>
{
    const [ open, setOpen ] = useState<boolean>(isOpen ?? activeCondition);

    const handleClick = () =>
    {
        setOpen(!open);
    };

    return <li>{ children(handleClick, open) }</li>;
};

export default SidebarLinkGroup;
