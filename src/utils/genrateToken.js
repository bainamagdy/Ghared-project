import jwt from "jsonwebtoken";

export const generateJWT = async (payload) =>
{
   const  JWT =  await jwt.sign(
    payload ,
    process.env.JWT_SECRET,
    {expiresIn:'1h'}

 )
 return JWT;

}