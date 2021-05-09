const Chat = require('../models/chat.model');

module.exports = (io, socket) => {

  const joinRoom = (data) => {
    // console.log(data);
    socket.leave(socket.id);
    socket.join(data);
  } 

  const leaveRoom = (data) => {
    socket.leave(data.user_first_id);
  } 

  const chatText = (data) => {
    // console.log(data);
    io.to(data.user_first_id).to(data.user_second_id).emit("res_chat_text",data);
    Chat.create(data);
  } 
  const chatImage = (data) => {
    // console.log(data);
    io.to(data.user_first_id).to(data.user_second_id).emit("res_chat_image",data);
    Chat.create(data);
  } 
  socket.on("join_room", joinRoom);
  socket.on("leave_room", leaveRoom);
  socket.on("chat_text", chatText);
  socket.on("chat_image", chatImage);
}