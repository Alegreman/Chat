import { Profile } from "../../models/profile/profile.interface";

const userList: Profile[] = [
    {
        firstName: 'Jorge',
        lastName: 'Alegría',
        email: 'alegre@alegre.com',
        avatar: '../../assets/imgs/avatar.png',
        dateOfBirth: new Date()
    },
    {
      firstName: 'Till',
      lastName: 'Lindemann',
      email: 'till@rammstein.com',
      avatar: '../../assets/imgs/avatar.png',
      dateOfBirth: new Date()
    },
    {
      firstName: 'Richard',
      lastName: 'Kruspe',
      email: 'richard@rammstein.com',
      avatar: '../../assets/imgs/avatar.png',
      dateOfBirth: new Date()
    }
  ];

  export const USER_LIST = userList;