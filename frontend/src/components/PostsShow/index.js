import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import "./PostsShow.scss";
import {
  fetchPost,
  getPost,
  deletePost,
} from "../../store/reducers/posts_reducer";

import PostItem from "../PostItem";

import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import CommentsIndex from "../CommentsIndex";

const PostsShow = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const { postId } = useParams();
  const history = useHistory();

  const post = useSelector(getPost(postId));
  // Progress bar status
  const [currentProgress, setCurrentProgress] = useState(0);

  // Evaluate what the current progress is and call it in the use effect
  const calcCurrentProgress = () => {
    // A counter to set the current progress to
    if (!post?.author) return;
    let amount = 0;
    for (let i = 0; i < post.items.length; i++) {
      let arrayItem = post.items[i];
      if (arrayItem.status) {
        amount += arrayItem.totalCost;
      }
    }
    console.log(amount);
    return amount;
  };

  useEffect(() => {
    setCurrentProgress(calcCurrentProgress());
    dispatch(fetchPost(postId));
  }, [currentProgress]);

  // Exit out for first render
  if (!post?.author) return null;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deletePost(postId));
    // After deletion, the deleted post is still in index until refresh
    // history.push('/posts')
  };

  // Total cost of all the items, or goal of the go fund me
  let totalCost = 0;

  post.items.forEach((item) => {
    totalCost += item.totalCost;
  });

  // Make progress bar fill up based on status

  const handleEdit = (e) => {
    e.preventDefault();
    history.push(`/posts/${postId}/edit`);
  };

  let comments = {};
  console.log(post);
  return (
    <>
      <div id="post-show">
        <div id="post-show-container">
          <div id="post-show-left">
            <p>POST IMAGE HERE</p>
            <p>{post.body}</p>
            <button onClick={handleDelete}>DELETE POST</button>
            <button onClick={handleEdit}>EDIT POST</button>
          </div>

          <div id="post-show-right">
            <h2>{post.title}</h2>
            <h2>
              ${currentProgress} <span>raised of ${totalCost}</span>
            </h2>
            <ProgressBar now={(currentProgress / totalCost) * 100} />

            <div className="item-labels">
              <p></p>
              <p>Amount</p>
              <p id="label-2">Total Cost</p>
              <p>Status</p>
            </div>
            {post.items.map((item) => {
              return (
                <PostItem
                  currentProgress={currentProgress}
                  setCurrentProgress={setCurrentProgress}
                  post={post}
                  item={item}
                  authorId={post.author._id}
                  key={`${item._id}`}
                />
              );
            })}
          </div>
        </div>
        {sessionUser && <CommentsIndex comments={comments}/>}
      </div>
    </>
  );
};

export default PostsShow;
