const $ = document.querySelector.bind(document);
const { useState, useEffect } = React;

function ProfileCard() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading-status">Loading ProfileCard...</div>;
  }

  return (
    <div className="profile-card">
      {/* Header */}
      <div className="profile-card__header">
        <div className="profile-card__avatar-wrapper">
          <img
            src="https://i.pravatar.cc/150?img=5"
            alt={user.name}
            className="profile-card__avatar"
          />
        </div>
      </div>

      {/* Body */}
      <div className="profile-card__body">
        <h1 className="profile-card__name">{user.name}</h1>

        <div className="profile-card__info">
          <div className="profile-card__info-item">
            <div className="profile-card__info-content">
              <span className="profile-card__info-label">Email</span>
              <span className="profile-card__info-value">{user.email}</span>
            </div>
          </div>

          <div className="profile-card__info-item">
            <div className="profile-card__info-content">
              <span className="profile-card__info-label">Phone</span>
              <span className="profile-card__info-value">{user.phone}</span>
            </div>
          </div>

          <div className="profile-card__info-item">
            <div className="profile-card__info-content">
              <span className="profile-card__info-label">Website</span>
              <span className="profile-card__info-value">{user.website}</span>
            </div>
          </div>

          <div className="profile-card__info-item">
            <div className="profile-card__info-content">
              <span className="profile-card__info-label">Address</span>
              <span className="profile-card__info-value">
                {user.address.street}, {user.address.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="profile-card__footer">
        <button className="profile-card__btn profile-card__btn--primary">
          Send Message
        </button>
        <button className="profile-card__btn profile-card__btn--secondary">
          Add Friend
        </button>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot($("#root"));
root.render(<ProfileCard />);
