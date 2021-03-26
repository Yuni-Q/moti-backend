"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthDate = exports.getNow = exports.getLastDate = exports.getFirstDate = exports.getDateString = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const getDateString = ({ date = undefined, years, month, day, }) => {
    return dayjs_1.default(date)
        .locale('ko')
        .add(years || 0, 'years')
        .add(month || 0, 'months')
        .add(day || 0, 'days')
        .format('YYYY-MM-DD');
};
exports.getDateString = getDateString;
const getFirstDate = (now) => {
    const date = now.locale('ko');
    return dayjs_1.default(new Date(parseInt(date.format('YYYY'), 10), parseInt(date.format('MM'), 10) - 1, 1))
        .locale('ko')
        .format('YYYY-MM-DD');
};
exports.getFirstDate = getFirstDate;
const getLastDate = (now) => {
    const date = now.locale('ko');
    const day = new Date(parseInt(date.format('YYYY'), 10), parseInt(date.format('MM'), 10), 0);
    console.log(222, day);
    return dayjs_1.default(day).locale('ko').format('YYYY-MM-DD');
};
exports.getLastDate = getLastDate;
const getNow = (date) => {
    return !!date ? dayjs_1.default(date).locale('ko') : dayjs_1.default().locale('ko');
};
exports.getNow = getNow;
const getMonthDate = (now) => {
    const firstDate = exports.getFirstDate(now);
    const lastDate = exports.getLastDate(now);
    return { firstDate, lastDate };
};
exports.getMonthDate = getMonthDate;
//# sourceMappingURL=date.js.map