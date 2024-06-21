import Committee from "../models/Committees.js";
import dotenv from "dotenv";
dotenv.config();

export const createCommittee = async (req, res) => {
  const { name, image } = req.body;
  const committee = new Committee({
    name,
    image,
  });

  try {
    await committee.save();
    return res.json({
      ok: true,
    });
  } catch (err) {
    return res.status(400).send("An error occured!");
  }
};

export const getCommitteeById = async (req, res, next, id) => {
  Committee.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      return res.status(400).json({
        error: "User not found",
      });
    });
};

export const getCommittee = async (req, res) => {
  try {
    res.json(req.profile);
  } catch (error) {
    res.status(400).json({
      error: "Committee not found",
    });
  }
};