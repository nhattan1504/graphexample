const JWT = require('jsonwebtoken');
require('dotenv').config();
function getPayLoad(token) {
    return JWT.verify(token, process.env.JWT_KEY);
}
module.exports = {
    getUserId: (req,authToken) => {
        if (req) {
            // console.log(req);
            // console.log("tao den day roi 1");
            const authHeader = req.headers.authorization;
            // console.log(authHeader);
            if (authHeader) {
                const token = authHeader.replace('Bearer ', '');
                if (!token) {
                    throw new Error('No token found');
                }
                // console.log(getPayLoad(authHeader));
                const { userId,role } = getPayLoad(token);
                // console.log(userId,role);
                return {userId,role};
            }else if(authToken){
                console.log("tao den day roi 2");
                console.log(getPayLoad(authToken));
                const{userId,role}=getPayLoad(authToken);
                // console.log(userId,role)
                return {userId,role};
            }
        }
        else
        {
            console.log("em");
            throw new Error('Not authenticated');}
    }
};