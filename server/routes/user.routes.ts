import { Request, Router, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { compareSync } from 'bcrypt';
import { config } from 'dotenv';

import { User } from '../models/user.model';
import { RefreshToken } from '../models/refreshToken.model';
import { jwtConfig } from '../config/jwtConfig';

config({ path: __dirname + '../.env' });

const router: Router = Router();

/**
 * GET
 * http://localhost:3001/api/auth/get-users
 * Gets all users
 */
router.get('/api/auth/get-users', async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * GET
 * http://localhost:3001/api/auth/get-user/:id
 * gets one user
 */
router.get('/api/auth/get-user/:id', async (req: Request, res: Response) => {
  try {
    const users = await User.findById(req.params.id);
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * POST
 * localhost:3001/api/auth/login
 * sends a request to login a user
 */
router.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('no user');
      return res
        .status(404)
        .send({ message: 'No user found with this email address.' });
    }
    let passwordIsValid = compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send({ message: 'Invalid password' });
    }

    let _token = sign({ id: user._id }, jwtConfig.secret, {
      expiresIn: jwtConfig.jwtExpiration,
    });
    let userRefreshToken = await RefreshToken.createToken(user);

    return res.status(200).send({
      id: user._id,
      user: user,
      accessToken: _token,
      refreshToken: userRefreshToken,
    });
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
});

/**
 * POST
 * Creates a user and registers them into database
 * http://localhost:3001/api/auth/register
 */
router.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateToken(user._id);
    res.status(201).send({ message: 'User created', token: token, user });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
});

/**
 * PATCH
 * localhost:3001/api/auth/update-user/:id
 * updates a user and returns the modified document
 */
// prettier-ignore
router.patch('/api/auth/update-user/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(updatedUser);
    return res.status(200).send(updatedUser)
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  };
})

/**
 * DELETE
 * http://localhost:3001/api/auth/delete-user/:id
 * deletes a user
 */
// prettier-ignore
router.delete('/api/auth/delete-user/:id', async (req: Request, res: Response) => {
  try {
    await User.findByIdAndDelete(req.params.id)
      .then(() => res.status(200).send({ message: 'User deleted' }))
      .catch((err) => res.status(400).send({ message: err.message }));
  } catch (error: any) {
    return res.status(500).send({ message: error.message });
  }
});

function generateToken(id: string) {
  return sign({ id: id }, process.env.JWT_SECRET as string);
}

export { router as userRouter };
