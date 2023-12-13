import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.abs(now - date) / 1000; // difference in seconds

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let unit in intervals) {
    if (diff >= intervals[unit]) {
      const count = Math.floor(diff / intervals[unit]);
      return `${count} ${unit}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
}

export const checkIsLiked = (likeList, userId) => {
  return likeList.includes(userId);
};
