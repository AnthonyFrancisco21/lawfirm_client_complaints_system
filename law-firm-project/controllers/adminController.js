import { UserModel } from "../models/userModels.js";

export const AdminController = {
  async statistics(req, res) {
    try {
      const users = await UserModel.countUsers();
      res.json({
        message: "Superadmin statistics access granted!",
        totalUsers: users,
        loggedInAs: req.session.user
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  }
};
