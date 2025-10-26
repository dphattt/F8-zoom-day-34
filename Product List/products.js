const $ = document.querySelector.bind(document);
const { useState, useEffect } = React;

function ProductCard({ product }) {
  // Hàm viết hoa chữ cái đầu
  const capitalizeTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Hàm cắt ngắn ký tự
  const truncateBody = (body) => {
    if (body.length > 100) {
      return body.substring(0, 100) + "...";
    }
    return body;
  };
  // Hàm hiển thị chi tiết sản phẩm
  const handleViewDetail = () => {
    alert(
      `Xem chi tiết sản phẩm ID: ${product.id}\n\nTitle: ${product.title}\n\nBody: ${product.body}`
    );
  };

  return (
    <div className="product-card">
      <div className="product-card__header">
        <span className="product-card__id">ID: {product.id}</span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__title">
          {capitalizeTitle(product.title)}
        </h3>
        <p className="product-card__description">
          {truncateBody(product.body)}
        </p>
      </div>
      <div className="product-card__footer">
        <button className="product-card__btn" onClick={handleViewDetail}>
          View Detail
        </button>
      </div>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=12")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="loading-status">Loading Products...</div>;
  }

  return (
    <div className="product-list">
      <h1 className="product-list__heading">Product List</h1>
      <div className="product-list__grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot($("#root"));
root.render(<ProductList />);
