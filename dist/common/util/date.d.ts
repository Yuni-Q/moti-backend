import dayjs, { Dayjs } from 'dayjs';
export declare const getDateString: ({ date, years, month, day, }: {
    date?: string;
    years?: number;
    month?: number;
    day?: number;
}) => string;
export declare const getFirstDate: (now: Dayjs) => string;
export declare const getLastDate: (now: Dayjs) => string;
export declare const getNow: (date?: string | null) => dayjs.Dayjs;
export declare const getMonthDate: (now: Dayjs) => {
    firstDate: string;
    lastDate: string;
};
