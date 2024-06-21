import Post from "../models/Post.js";

export const getPosts = (req, res) => {
  const posts = Post.find()
    .populate("postedBy", "_id name")
    .select("_id title body")
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
};

export const createPost = async (req, res) => {
  const { title, body } = req.body;
  let post = new Post(req.body);
  post.postedBy = req.profile;

  try {
    await post
      .save()
      .then((result) => {
        return res.json(result);
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  } catch (error) {
    return res.status(400).send("An error occured!");
  }
};
