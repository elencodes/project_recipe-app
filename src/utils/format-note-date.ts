import 'dayjs/locale/ru';

import dayjs from 'dayjs';

export const formatNoteDate = (time: string) => dayjs(time).locale('ru').format('DD MMMM HH:mm');
