import { Request, Response }
from "express";

import bcrypt
from "bcryptjs";

import jwt
from "jsonwebtoken";

import User
from "../models/User";

const createToken = (
  id: unknown
) =>
  jwt.sign(
    {
      id
    },
    process.env.JWT_SECRET
      || "secret",
    {
      expiresIn: "7d"
    }
  );

const toSafeUser = (
  user: {
    name: string;
    email: string;
    role?: string;
    _id: unknown;
  }
) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role || "user"
});

export const register =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        name,
        email,
        password
      } = req.body;

      if (!name || !email || !password) {
        return res.status(400)
          .json({
            success: false,
            message:
              "Name, email and password are required"
          });
      }

      const existingUser =
        await User.findOne({
          email
        });


      if (existingUser) {

        return res.status(400)
          .json({

            success: false,

            message:
              "User already exists"

          });

      }


      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );


      const user =
        await User.create({

          name,

          email,

          password:
            hashedPassword

        });


      const token =
        createToken(user._id);


      res.status(201).json({

        success: true,

        token,

        user:
          toSafeUser(user)

      });

    } catch(error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error"

      });

    }

};


export const login =
  async (
    req: Request,
    res: Response
  ) => {

    try {

      const {
        email,
        password
      } = req.body;

      if (!email || !password) {
        return res.status(400)
          .json({
            success: false,
            message:
              "Email and password are required"
          });
      }

      const user =
        await User.findOne({
          email
        });


      if (!user) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Invalid credentials"

          });

      }


      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );


      if (!isMatch) {

        return res.status(400)
          .json({

            success: false,

            message:
              "Invalid credentials"

          });

      }


      const token =
        createToken(user._id);


      res.json({

        success: true,

        token,

        user:
          toSafeUser(user)

      });

    } catch(error) {

      res.status(500).json({

        success: false,

        message:
          "Server Error"

      });

    }

};
