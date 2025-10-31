const $ = document.querySelector.bind(document);
const { useState, useEffect } = React;

function ProductCard({ product, handleViewDetail }) {
  // Hàm viết hoa chữ cái đầu
  const capitalizeTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  // Hàm cắt ngắn ký tự
  const truncateBody = (body) => {
    return body.length > 100 ? body.slice(0, 100) + "..." : body;
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
        <button
          className="product-card__btn"
          onClick={() => handleViewDetail(product)}
        >
          View Detail
        </button>
      </div>
    </div>
  );
}

function Modal({ product, handleCloseModal }) {
  if (!product) return null;
  // Hàm viết hoa chữ cái đầu
  const capitalizeTitle = (title) => {
    return title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="modal__backdrop" onClick={handleCloseModal}>
      <div className="modal__wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Product Details</h2>
        </div>
        <div className="modal__body">
          <div className="modal__id">ID: {product.id}</div>
          <h3 className="modal__product-title">
            {capitalizeTitle(product.title)}
          </h3>
          <p className="modal__product-description">{product.body}</p>
        </div>
        <div className="modal__footer">
          <button className="modal__btn" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  // Hàm hiển thị chi tiết sản phẩm
  const handleViewDetail = (product) => {
    setSelectedProduct(product);
    setIsOpenModal(true);
  };
  // Hàm đóng modal
  const handleCloseModal = () => {
    setIsOpenModal(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return <div className="loading-status">Loading Products...</div>;
  }

  return (
    <>
      <div className="product-list">
        <h1 className="product-list__heading">Product List</h1>
        <div className="product-list__grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleViewDetail={handleViewDetail}
            />
          ))}
        </div>
      </div>
      {isOpenModal && (
        <Modal product={selectedProduct} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
}

const root = ReactDOM.createRoot($("#root"));
root.render(<ProductList />);
