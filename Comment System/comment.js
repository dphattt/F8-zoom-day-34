const $ = document.querySelector.bind(document);
const { useState, useEffect } = React;

function CommentStatus() {
  return (
    <div className="comment-status">
      <h1 className="comment-status__heading">Comments (2.4K)</h1>
      <div className="comment-status__selection">
        <button>
          <i className="fa-solid fa-ranking-star"></i>
          Popular
        </button>
        <button>
          <i className="fa-solid fa-fire"></i>
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
        <img src="https://i.pravatar.cc/40?img=3"></img>
      </div>
      <form>
        <input
          className="comment-form__text"
          type="text"
          placeholder="Write your comment here..."
        ></input>
        <button className="comment-form__submit">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

function CommentSection() {
  return <div className="comments-section"></div>;
}

function CommentSystem() {
  return (
    <div className="comments-wrapper">
      <CommentStatus />
      <CommentForm />
      <CommentSection />
    </div>
  );
}

const root = ReactDOM.createRoot($(`#root`));
root.render(<CommentSystem />);
