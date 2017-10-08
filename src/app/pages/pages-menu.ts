import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Check-In',
    icon: 'fa fa-check-square-o',
    children: [
      {
        title: 'Mobile Phone Number',
        link: '/pages/checkin/mobile-phone-number',
      },
      {
        title: 'Reward Card',
        link: '/pages/checkin/reward-card',
      },
    ],
  },
  {
    title: 'Notification',
    icon: 'ion-ipad',
    children: [
      {
        title: 'Guest Queue',
        link: '/pages/notifications/guest-queue',
      }, {
        title: 'Estimated Wait Time',
        link: '/pages/components/notifications',
      },
    ],
  },
  {
    title: 'Seating',
    icon: 'fa fa-table',
    children: [
      {
        title: 'Mobile Phone Number',
        link: '/pages/seating/mobile-phone-number',
      },
      {
        title: 'Reward Card',
        link: '/pages/seating/reward-card',
      },
    ],
  },
];
