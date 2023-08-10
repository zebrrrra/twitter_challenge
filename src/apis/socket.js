import { io } from 'socket.io-client';
export const socket = io("https://twitter-ac-team-d93c31406834.herokuapp.com", {
  autoConnect: false
});