import dayjs from 'dayjs';

export const getDateString = ({
  date = undefined,
  years,
  month,
  day,
}: {
  date?: string;
  years?: number;
  month?: number;
  day?: number;
}) => {
  return dayjs(date)
    .add(years || 0, 'years')
    .add(month || 0, 'months')
    .add(day || 0, 'days')
    .format('YYYY-MM-DD');
};

export const getFirstDate = (now: Date) => {
  return dayjs(new Date(now.getFullYear(), now.getMonth(), 1)).format(
    'YYYY-MM-DD',
  );
};

export const getLastDate = (now: Date) => {
  return dayjs(new Date(now.getFullYear(), now.getMonth() + 1, 0)).format(
    'YYYY-MM-DD',
  );
};

export const getNow = (date?: string | null) => {
  return !!date ? new Date(date) : new Date();
};

export const getMonthDate = (now: Date) => {
  const firstDate = getFirstDate(now);
  const lastDate = getLastDate(now);
  return { firstDate, lastDate };
};
