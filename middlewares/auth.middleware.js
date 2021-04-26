const jwtHelper = require('../helpers/jwt.helpers');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

module.exports.isAuth = async (req,res,next)=>{
    const auth = req.headers.authorization;
    var tokenFromClient;
    if (auth && auth.split(' ')[0] === 'Bearer')
    {
        tokenFromClient = auth.split(' ')[1];
    }
    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
          // Thực hiện giải mã token xem có hợp lệ hay không?
          const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);
    
          // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
          req.jwtDecoded = decoded;
    
          // Cho phép req đi tiếp sang controller.
          next();
        } catch (error) {
          // Nếu giải mã gặp lỗi: Không đúng, hết hạn...etc:
          // Lưu ý trong dự án thực tế hãy bỏ dòng debug bên dưới, mình để đây để debug lỗi cho các bạn xem thôi
          console.log("Error while verify token:", error);
          return res.status(401).json({
            status:"401",
            message: 'Unauthorized.',
            data:"",
          });
        }
      } else {
        // Không tìm thấy token trong request
        return res.status(403).send({     
          status:"403",
          message: 'No token provided.',
          data:"",   
        });
      }
}