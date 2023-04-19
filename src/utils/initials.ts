import type {User} from '../types/api';

export function getUserInitials(user: User) {
  const splitted = (user.displayName || user.username)
    .trim()
    .toUpperCase()
    .split(' ');
  const first = splitted[0];
  const last = splitted[splitted.length - 1];

  if (splitted.length === 1) {
    return first.substring(0, 2);
  } else {
    return first.charAt(0) + last.charAt(0);
  }
}
