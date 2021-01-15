const router = require("express").Router();
const db = require("../database/db");

//get comments for selected post
router.get("/getcomments/:post_uid/:current_user_uid", (req, res) => {
  db.query(
    `SELECT username as poster_username,
    '${req.params.current_user_uid}'=ANY(likers) AS liked_by_me,
  profile_image_url as poster_profile_image,array_length(likers,1) as comment_likes_count,comment,posted_date
  FROM comments INNER JOIN users ON (comments.commenter_uid)=(users.uid)::text
  WHERE post_uid='${req.params.post_uid}'`,
    (err, res1) => {
      if (!err) res.send(res1.rows);
      else throw err;
    }
  );
});

router.post("/addcomment", (req, res) => {
  db.query(
    `INSERT INTO comments(comment,commenter_uid,post_uid,post_owner_uid,posted_date)
    VALUES('${req.body.comment}','${req.body.commenter_uid}',
    '${req.body.post_uid}','${req.body.post_owner_uid}','${req.body.posted_date}')`,
    (err, res1) => {
      if (!err) res.send("success");
      else throw err;
    }
  );
});

module.exports = router;