import jwt from "jsonwebtoken";
import argon from "argon2";
import {prisma} from "../../../prismaClient"

const registerUser = async (userName: string, email: string, password: string) => {
  const emailExists = await prisma.user.findUnique({ where: { email } });
  if (emailExists) {
    const error = new Error("This email already exists");
    error.statusCode = 409;
    throw error;
  }
  const hashPassword = await argon.hash(password,{
     type: argon.argon2id,
            timeCost: 4,
            memoryCost: 65536,
            parallelism: 1
  });
  await prisma.user.create({
    data: { userName, email, password: hashPassword },
  });
};

const loginUser = async (email: string, password: string) => {
  const foundUser = await prisma.user.findUnique({ where: { email } });
  if (!foundUser) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const match = await argon.verify(foundUser.password, password);
  if (!match) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { userId: foundUser.id, email: foundUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token, userId: foundUser };
};

const getUserProfile = async (userId: string) => {
  const userProfile = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      userName: true,
      id: true,
      email: true,
      children: true,
    },
  });

  if (!userProfile) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return userProfile;
};

const authService  = { registerUser, loginUser, getUserProfile };
export default authService;