const db = require("../models");
// const ROLES = db.ROLES;
const Role = db.Role;
const User = db.User;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  if (req.body.username && req.body.username.trim() !== '') {

    // Username
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }

      // Email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }

        next();
      });
    });
  }
  else {
    res.status(400).send({
      message: "Username not defined!"
    });
    return;
  }
};

// checkRolesExisted = (req, res, next) => {
//   if (req.body.roles) {
//     for (let i = 0; i < req.body.roles.length; i++) {
//       if (!ROLES.includes(req.body.roles[i])) {
//         res.status(400).send({
//           message: "Failed! Role does not exist = " + req.body.roles[i]
//         });
//         return;
//       }
//     }
//   }

//   next();
// };

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      Role.findOne({
        where: {
          name: req.body.roles[i]
        }
      }).then(user => {
        if (!user) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
        else {
          next();
        }


      });
    }
  }

}



const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;