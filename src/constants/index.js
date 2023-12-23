import home from '../../puplic/assets/icons/home.svg'
import wallpaper from '../../puplic/assets/icons/wallpaper.svg'
import people from '../../puplic/assets/icons/people.svg'
import bookmark from '../../puplic/assets/icons/bookmark.svg'
import gallery from '../../puplic/assets/icons/gallery-add.svg'


export const sidebarLinks = [
  {
    imgURL: home,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: wallpaper,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: people,
    route: '/all-users',
    label: 'People',
  },
  {
    imgURL: bookmark,
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: gallery,
    route: '/create-post',
    label: 'Create Post',
  },
];

export const bottombarLinks = [
  {
    imgURL: home,
    route: '/',
    label: 'Home',
  },
  {
    imgURL: wallpaper,
    route: '/explore',
    label: 'Explore',
  },
  {
    imgURL: bookmark,
    route: '/saved',
    label: 'Saved',
  },
  {
    imgURL: gallery,
    route: '/create-post',
    label: 'Create',
  },
];
