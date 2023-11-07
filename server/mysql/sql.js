module.exports = {
  categoriesAllList: `SELECT * FROM category_TBL;`,
  categorieslnbList: `SELECT * FROM category_TBL WHERE cat_parent_no = ?;`,
  categoriesInsert: `INSERT INTO category_TBL SET ?;`,
  categoriesUpdate: `UPDATE category_TBL SET ? WHERE cat_no=?;`,
  categoriesDelete: `DELETE FROM category_TBL WHERE cat_no=?;`,
  headsAllList: `SELECT * FROM head_TBL;`,
  headsByLnbList: `SELECT * FROM head_TBL WHERE cat_no=?;`,
  headsInsert: `INSERT INTO head_TBL SET ?;`,
  headsUpdate: `UPDATE head_TBL SET ? WHERE head_no=?;`,
  headsDelete: `DELETE FROM head_TBL WHERE head_no=?;`,
  postsAllList: `SELECT * FROM post_TBL;`,
  postsInsert: `INSERT INTO post_TBL SET ?;`,
  postsUpdate: `UPDATE post_TBL SET ? WHERE post_no=?;`,
  postsDelete: `UPDATE post_TBL SET ? WHERE post_no=?;`,
  postDBDelete: `DELETE FROM post_TBL WHERE post_no=?;`,
  postCountWithKeyWord:
    "SELECT COUNT(*) as count FROM post_TBL P, user_TBL U WHERE post_status = 1 AND P.cat_no=? AND (P.post_title LIKE ? OR U.user_nick LIKE ?) ",
  postCountWithKeyMine:
    "SELECT COUNT(*) as count FROM post_TBL P, user_TBL U WHERE post_status = 1  AND U.user_no = ? AND (P.post_title LIKE ? OR U.user_nick LIKE ?) ",
  postCount: `SELECT COUNT(*) as count FROM post_TBL WHERE post_status = 1 AND cat_no=?`,
  postCountMine: `SELECT COUNT(*) as count FROM post_TBL WHERE post_status = 1 AND user_no=?`,
  postPagination: `SELECT ROW_NUMBER() OVER(PARTITION BY P.post_is_important ORDER BY P.post_ins_date) AS idx,P.post_no, P.post_thumb1, CONCAT(H.head_name, ' ', P.post_title) AS title, U.user_class, U.user_nick, P.post_hit, P.post_ins_date, P.post_is_important\
  FROM post_TBL P, user_TBL U, head_TBL H, category_TBL C\
  WHERE P.user_no = U.user_no\
  AND P.head_no = H.head_no\
  AND P.cat_no = C.cat_no\
  AND P.cat_no = ?\
  AND P.post_status = 1\
  ORDER BY P.post_is_important DESC, idx DESC\
  LIMIT ?, ?`,
  postPaginationMine: `SELECT ROW_NUMBER() OVER(PARTITION BY P.post_is_important ORDER BY P.post_ins_date) AS idx,P.post_no, P.post_thumb1, CONCAT(H.head_name, ' ', P.post_title) AS title, U.user_class, U.user_nick, P.post_hit, P.post_ins_date, P.post_is_important\
  FROM post_TBL P, user_TBL U, head_TBL H, category_TBL C\
  WHERE P.user_no = U.user_no\
  AND P.head_no = H.head_no\
  AND P.cat_no = C.cat_no\
  AND P.post_status = 1\
  AND P.user_no = ? \
  ORDER BY P.post_is_important DESC, idx DESC\
  LIMIT ?, ?`,
  postPaginationWithKeyWord: `SELECT ROW_NUMBER() OVER(PARTITION BY P.post_is_important ORDER BY P.post_ins_date) AS idx,P.post_no, P.post_thumb1, CONCAT(H.head_name, ' ', P.post_title) AS title, U.user_class, U.user_nick, P.post_hit, P.post_ins_date, P.post_is_important\
  FROM post_TBL P, user_TBL U, head_TBL H, category_TBL C\
  WHERE P.user_no = U.user_no\
  AND P.head_no = H.head_no\
  AND P.cat_no = C.cat_no\
  AND P.cat_no = ?\
  AND P.post_status = 1\
  AND (P.post_title LIKE ? OR U.user_nick LIKE ?)\
  ORDER BY P.post_is_important DESC, idx DESC\
  LIMIT ?, ?`,
  postHitsUp: `UPDATE post_TBL SET post_hit=post_hit+1 WHERE post_no=?;`,
  postFindById: `SELECT P.post_no, U.user_class, U.user_nick, C.cat_name, CONCAT(H.head_name,' ' ,P.post_title) AS title, P.post_content, P.post_hit, P.post_status, P.post_is_important, P.post_ins_date, P.post_upd_date  \
  FROM post_TBL P,user_TBL U, category_TBL C, head_TBL H \
  WHERE U.user_no = P.user_no AND P.cat_no = C.cat_no AND P.head_no = H.head_no AND P.post_no=? AND C.cat_no=?`,
  postsListByCatNo: `SELECT ROW_NUMBER() OVER(PARTITION BY P.post_is_important ORDER BY P.post_ins_date) AS idx,P.post_no, P.post_thumb1, CONCAT(H.head_name, ' ', P.post_title) AS title, U.user_class, U.user_nick, P.post_hit, P.post_ins_date, P.post_is_important\
  FROM post_TBL P, user_TBL U, head_TBL H, category_TBL C\
  WHERE P.user_no = U.user_no\
  AND P.head_no = H.head_no\
  AND P.cat_no = C.cat_no\
  AND P.cat_no = ?\
  AND P.post_status = 1\
  ORDER BY P.post_is_important DESC, idx DESC`,
  postsDeleteImportant: `UPDATE post_TBL SET post_is_important=0 WHERE cat_no=?`,
  likesFindByPostId: `SELECT like_no, U.user_nick FROM like_TBL L, user_TBL U WHERE U.user_no = L.user_no AND L.post_no=?`,
  likesFindByUserId: `SELECT like_no FROM like_TBL WHERE post_no=? AND user_no=?`,
  likesInsert: `INSERT INTO like_TBL SET ?;`,
  likesDelete: `DELETE FROM like_TBL WHERE like_no=?;`,
  commentsFindByPostId: `SELECT C.comment_no, C.comment_isdeleted, U.user_class, U.user_nick, C.comment_ins_date, C.comment_content, C.comment_parent_no \
  FROM comment_TBL C, user_TBL U WHERE U.user_no = C.user_no AND c.comment_parent_no IS NULL AND C.post_no=?`,
  commentsInsert: `INSERT INTO comment_TBL SET ?;`,
  commentsUpdate: `UPDATE comment_TBL SET ? WHERE comment_no=?;`,
  commentsDelete: `UPDATE comment_TBL SET comment_isdeleted=1, comment_content="삭제된 댓글입니다." WHERE comment_no=?;`,
  commentsDBDelete: `DELETE FROM comment_TBL WHERE comment_no=?;`,
  commentsCount: `SELECT COUNT(*) as count FROM comment_TBL C, user_TBL U WHERE U.user_no = C.user_no AND C.post_no=?`,
  commentsFindByParentId: `SELECT C.comment_no, C.comment_isdeleted, U.user_class, U.user_nick, C.comment_ins_date, C.comment_content, C.comment_parent_no \
  FROM comment_TBL C, user_TBL U WHERE U.user_no = C.user_no AND C.post_no=? AND C.comment_parent_no=?;`,
  usersInsert: `INSERT INTO user_TBL SET ?;`,
  findByID: `SELECT * FROM user_TBL WHERE user_id = ?;`,
  findByNo: `SELECT * FROM user_TBL WHERE user_no = ?;`,
  findByEmail: `SELECT * FROM user_TBL WHERE user_nick = ?;`,
  mainPage1_2: `SELECT C.cat_name, CONCAT(H.head_name,' ' ,P.post_title) AS title, C.cat_no, P.post_no, P.post_ins_date,\
  CASE WHEN P.post_ins_date BETWEEN DATE_ADD(NOW(), INTERVAL -3 DAY) AND NOW() THEN 'True' ELSE 'False' END AS NEW \
  FROM post_TBL P, category_TBL C, head_TBL H \
  WHERE P.cat_no = C.cat_no AND P.head_no = H.head_no \
  AND P.post_no IN (SELECT MAX(post_no) FROM post_TBL GROUP BY cat_no HAVING cat_no = 4 OR cat_no = 5 OR cat_no = 6 OR cat_no = 7)\
  ORDER BY P.cat_no;`,
  mainPage2: `SELECT C.cat_name, CONCAT(H.head_name,' ' ,P.post_title) AS title, C.cat_no, P.post_no, P.post_ins_date, P.post_thumb1\
  FROM post_TBL P, category_TBL C, head_TBL H \
  WHERE P.cat_no = C.cat_no AND P.head_no = H.head_no \
  AND P.post_no IN (SELECT MAX(post_no) FROM post_TBL GROUP BY cat_no HAVING cat_no = 27 OR cat_no = 16 OR cat_no = 17)\
  ORDER BY P.cat_no;`,
  mainPage3: `SELECT ROW_NUMBER() over(ORDER BY brand_when *1 DESC) AS idx, brand_name, brand_when FROM brand_TBL;`,
  noticesFindByUserId: `SELECT N.noti_no ,N.noti_type, U.user_nick, N.noti_created_at, CONCAT(H.head_name," " ,P.post_title) AS title,C.cat_parent_no, C.cat_no, P.post_no \
  FROM post_TBL P,user_TBL U, category_TBL C, head_TBL H, notice_TBL N
  WHERE N.user_no_to = ? \
  AND N.user_no_from = U.user_no \
  AND P.post_no = N.post_no \
  AND P.cat_no = C.cat_no \
  AND P.head_no = H.head_no \
  AND N.noti_read_at IS NULL \
  ORDER BY N.noti_created_at DESC;`,
  noticesInsert: `INSERT INTO notice_TBL SET ?;`,
  noticesReadByNotiId: `UPDATE notice_TBL SET noti_read_at=? WHERE noti_no=?;`,
  noticesReadByUserId: `UPDATE notice_TBL SET noti_read_at=? WHERE user_no_to=? AND noti_read_at IS NULL;`,
  noticesFindUserByPostId: `SELECT U.user_no \
  FROM post_TBL P, user_TBL U \
  WHERE P.user_no = U.user_no \
  AND P.post_no = ?;`,
  noticesFindByParentId: `SELECT U.user_no \
  FROM comment_TBL C, user_TBL U \
  WHERE C.user_no = U.user_no \
  AND C.comment_no = ?;`,

  teamCurrentFindById: `SELECT T.team_no, T.team_name, group_concat(U.user_nick) AS team_member \
  FROM team_TBL T, user_TBL U, team_user_TBL TU\
  WHERE TU.user_no = U.user_no AND TU.team_no = T.team_no \
  AND T.team_no IN( \
  SELECT team_no \
  FROM team_user_TBL \
  WHERE user_no = ? \
  AND team_status=0) \
  GROUP BY T.team_no;`,

  teamFinishedFindById: `SELECT T.team_no, T.team_name, group_concat(U.user_nick) AS team_member \
  FROM team_TBL T, user_TBL U, team_user_TBL TU\
  WHERE TU.user_no = U.user_no AND TU.team_no = T.team_no \
  AND T.team_no IN( \
  SELECT team_no \
  FROM team_user_TBL \
  WHERE user_no = ? \
  AND team_status=1) \
  GROUP BY T.team_no;`,

  teamsJoin: `INSERT INTO team_user_TBl SET ?;`,
  teamsCreate: `INSERT INTO team_TBL SET ?`,
  teamsJoinLeader: `INSERT INTO team_user_TBl(team_no, user_no,team_leader)\
    SELECT team_no, user_no, 1\
    FROM team_TBL \
    WHERE user_no = ? `,
  teamsfinished: `UPDATE team_TBL SET team_status=1 WHERE team_no=?;`,
  teamEvaluate: `UPDATE user_TBL SET eval1 = eval1 + ?, eval2 = eval2 + ?, eval3 = eval3 + ?, eval4 = eval4 + ?, eval5 = eval5 + ? WHERE user_nick=?;`,
};
