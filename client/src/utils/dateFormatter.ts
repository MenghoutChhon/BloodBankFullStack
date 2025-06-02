import dayjs from 'dayjs';
import { DATE_FORMAT } from './constants';

export const formatDate = (date: string | Date) => {
  return dayjs(date).format(DATE_FORMAT);
};