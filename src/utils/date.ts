import {formatRelative, parseJSON} from 'date-fns';
import {enUS} from 'date-fns/locale';

const formatRelativeLocale = {
  lastWeek: 'MMM L, yyyy',
  yesterday: "'Yesterday', h:mm a",
  today: 'h:mm a',
  tomorrow: "'Tomorrow', h:mm a",
  nextWeek: 'MMM L, yyyy',
  other: 'MMM L, yyyy',
};

const locale = {
  ...enUS,
  formatRelative: (token: keyof typeof formatRelativeLocale) =>
    formatRelativeLocale[token],
};

export function formatDate(str: string) {
  return formatRelative(parseJSON(str), new Date(), {
    weekStartsOn: 1,
    locale,
  });
}
