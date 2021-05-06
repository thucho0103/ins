const Chat = require('../models/chat.model');

module.exports = (socket) => {

    const joinRoom = (data) => {
      socket.join(data.room);
    } 
  
    const leaveRoom = (data) => {
      socket.leave(data.room);
    } 
  
    const chatText = (data) => {
      //console.log(data.room);
      socket.to(data.room).emit("chat_text",data);
      //io.to(data.room).emit(data.messages);
      const newMessage = {
        room : data.room,
        messages : data.message,
        userId : data.user_id,
        images: data.images,
      } 
      Chat.create(newMessage);
    } 
    const chatImage = (data) => {
      //io.to(data.room).emit(data.messages);
    } 
  
    socket.on("join_room", joinRoom);
    socket.on("leave_room", leaveRoom);
    socket.on("chat_text", chatText);
    socket.on("chat_image", chatImage);
  }