import express from 'express';
import * as tokenController from '../controllers/tokenController';
import * as userController from '../controllers/userController';
import * as multerController from '../controllers/multerController';

const userRouter = express.Router();

// Gets Own User Info (TODO)
userRouter.get('/', tokenController.validateUser, userController.getOwnInfo);

// Verify User
/* userRouter.get(
  '/verify',
  tokenController.validateUser,
  userController.verifyUser
); */

// Sign Up User (Register)
userRouter.post('/signup', userController.signup, tokenController.setTokensEnd);

// Sign In User (Login)
userRouter.post('/signin', userController.signin, tokenController.setTokensEnd);

// Log Out User
userRouter.post(
  '/signout',
  tokenController.validateUser,
  userController.signout
);

// Update User
userRouter.put(
  '/update',
  tokenController.validateUser,
  userController.updateUser
);

// Upload Profile Picture
userRouter.post(
  '/upload-profile-picture',
  tokenController.validateUser,
  multerController.prepareUpload,
  multerController.uploadProfile,
  userController.uploadProfilePicture
);

// Update Social Media
userRouter.put(
  '/update/social-media',
  tokenController.validateUser,
  userController.linkSocialMedia
);

// Update User Password
userRouter.put(
  '/update/password',
  tokenController.validateUser,
  userController.updateUserPassword
);

// Update Drive Info
userRouter.put(
  '/update/drive',
  tokenController.validateUser,
  userController.updateDriveInfo
);

// Add to Log of User Routes Taken
userRouter.post(
  '/log/add',
  tokenController.validateUser,
  userController.addRoute
);

// Confirms Route Was Taken
userRouter.put(
  '/log/confirm',
  tokenController.validateUser,
  userController.confirmRoute
);

// Gets User by Username
userRouter.get(
  '/get/:username',
  tokenController.validateUser,
  userController.getUser
);

// Search User by Username
userRouter.get('/search', userController.searchUser);

export default userRouter;
