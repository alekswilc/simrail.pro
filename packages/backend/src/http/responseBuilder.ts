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

import { assert } from "node:console";

export interface IResponse<T>
{
    success: boolean;
    data: T;
    code: number;
}

export class BaseResponseBuilder<T>
{
    protected success: IResponse<T>["success"] = undefined!;
    protected data: IResponse<T>["data"] = undefined!;
    protected code: IResponse<T>["code"] = undefined!;


    public constructor(data?: Partial<IResponse<T>>)
    {
        if (!data)
        {
            return;
        }
        if ("success" in data)
        {
            this.success = data.success as IResponse<T>["success"];
        }
        if ("data" in data)
        {
            this.data = data.data as IResponse<T>["data"];
        }
        if ("code" in data)
        {
            this.code = data.code as IResponse<T>["code"];
        }
    }

    public setData(data: T)
    {
        this.data = data;
        return this;
    }

    public setCode(code: number)
    {
        this.code = code;
        return this;
    }

    public toJSON()
    {
        const { success, data, code } = this;
        assert(typeof (success) === "boolean", "expected success to be boolean");
        assert(typeof (code) === "number", "expected success to be number");

        return {
            success, data, code,
        };
    }
}


export class SuccessResponseBuilder<T> extends BaseResponseBuilder<T>
{
    public constructor(options?: IResponse<T>)
    {
        super(options);
        this.success = true;
    }
}


export class ErrorResponseBuilder<T> extends BaseResponseBuilder<T>
{
    public constructor(options?: IResponse<T>)
    {
        super(options);
        this.success = false;
    }
}