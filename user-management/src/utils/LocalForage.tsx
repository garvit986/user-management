import localforage from 'localforage';
import {User} from '../interfaces/Types' 

const USERS_KEY = 'users';
const ADMIN_KEY = 'admin';


export interface Users {
  id: number;
  username: string;
  password: string;
  name: string;
  address: string;
  phoneNumber: string;
  role: string;
}


export const saveUser = async (user: User): Promise<void> => {
  const users = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const admin = await localforage.getItem<User>(ADMIN_KEY);

  if (user.role === 'Admin') {
    if (admin && admin.id !== user.id) {
      throw new Error('Only one admin allowed.');
    }
    await localforage.setItem(ADMIN_KEY, user);
  } else {
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex > -1) {
      users[userIndex] = user;
    } else {
      if (users.length >= 5) {
        throw new Error('Only 5 users are allowed.');
      }
      user.id = users.length + 1;
      users.push(user);
    }
    await localforage.setItem(USERS_KEY, users);
  }
};


export const getUserByUsername = async(username: string) =>{
    const users = await getUsers()
    return users.find(user=>(user.username === username))
};

export const getUsers = async () => {
  const users = (await localforage.getItem<User[]>(USERS_KEY)) || [];
  const admin = await localforage.getItem<User>(ADMIN_KEY);
  if (admin) {
    users.push(admin);
  }
  return users;
};

export const getAdmin = async () => {
  return await localforage.getItem<User>(ADMIN_KEY);
};

export const getUserById = async (id: number)=> {
  const users = await getUsers();
  return users.find(user => user.id === id) || null;
};
