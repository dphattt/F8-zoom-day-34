const $ = document.querySelector.bind(document);
const { useState, useEffect } = React;

function CommentStatus() {
  return (
    <div className="comment-status">
      <h1 className="comment-status__heading">Comments</h1>
      <div className="comment-status__selection">
        <button className="comment-status__btn">
          <i className="fa-solid fa-chart-line"></i>
          Popular
        </button>
        <button className="comment-status__btn comment-status__btn--active">
          <i className="fa-solid fa-calendar"></i>
          Newest
        </button>
      </div>
    </div>
  );
}

function CommentForm() {
  return (
    <div className="comments-form">
      <div className="comments-form__avatar">
        <img src="https://i.pravatar.cc/40?img=3" alt="User avatar"></img>
      </div>
      <div className="comments-form__input-wrapper">
        <textarea
          className="comments-form__input"
          placeholder="Write your comments here..."
          rows="5"
        ></textarea>
        <button className="comment-form__submit" type="button">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

function CommentItem({ user }) {
  return (
    <div className="comment-item">
      <div className="comment-item__avatar">
        <img
          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
          alt={user.name}
        ></img>
      </div>
      <div className="comment-item__content">
        <div className="comment-item__header">
          <span className="comment-item__name">{user.name}</span>
          <span className="comment-item__email">{user.email}</span>
          <span className="comment-item__date">{user.timeAgo}</span>
        </div>
        <div className="comment-item__text">
          <p> {user.body} </p>
          <a href="#" className="comment-item__translate">
            Translate
          </a>
        </div>
        <div className="comment-item__actions">
          <button className="comment-item__action">
            <i className="fa-solid fa-thumbs-up"></i>
            <span>Likes</span>
          </button>
          <button className="comment-item__action">
            <i className="fa-solid fa-thumbs-down"></i>
            <span>Dislike</span>
          </button>
          <button className="comment-item__action">
            <i className="fa-solid fa-comment"></i>
            <span>Reply</span>
          </button>
        </div>
        <a href="#" className="comment-item__replies">
          See Replies
          <i className="fa-solid fa-chevron-down"></i>
        </a>
      </div>
    </div>
  );
}

function CommentSystem() {
  const [Users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState("");

  const getRandomHoursAgo = () => {
    const hours = Math.floor(Math.random() * 23) + 1;
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };
  const handleSubmitForm = () => {};
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments?postId=1")
      .then((res) => res.json())
      .then((data) =>
        setUsers(
          data.map((user) => ({
            ...user,
            timeAgo: getRandomHoursAgo(),
          }))
        )
      )
      .catch((error) => {
        console.error("Can't fetch this data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading-status">Loading Comments...</div>;
  }

  return (
    <section className="comments-wrapper">
      <CommentStatus />
      <CommentForm />
      <div className="comments-section">
        {Users.map((user) => (
          <CommentItem key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}

const root = ReactDOM.createRoot($(`#root`));
root.render(<CommentSystem />);
