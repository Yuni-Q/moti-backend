import dayjs, { Dayjs } from 'dayjs';

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
    .locale('ko')
    .add(years || 0, 'years')
    .add(month || 0, 'months')
    .add(day || 0, 'days')
    .format('YYYY-MM-DD');
};

export const getFirstDate = (now: Dayjs) => {
  const date = now.locale('ko');
  return dayjs(
    new Date(
      parseInt(date.format('YYYY'), 10),
      parseInt(date.format('MM'), 10) - 1,
      1,
    ),
  )
    .locale('ko')
    .format('YYYY-MM-DD');
};

export const getLastDate = (now: Dayjs) => {
  const date = now.locale('ko');
  const day = new Date(
    parseInt(date.format('YYYY'), 10),
    parseInt(date.format('MM'), 10),
    0,
  );
  console.log(222, day);
  return dayjs(day).locale('ko').format('YYYY-MM-DD');
};

export const getNow = (date?: string | null) => {
  return !!date ? dayjs(date).locale('ko') : dayjs().locale('ko');
};

export const getMonthDate = (now: Dayjs) => {
  console.log(1331, now.format('YYYY-MM-DD'));
  const firstDate = getFirstDate(now);
  const lastDate = getLastDate(now);
  return { firstDate, lastDate };
};
