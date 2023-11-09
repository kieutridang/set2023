const products = [
  { title: "Cabbage", id: 1 },
  { title: "Garlic", id: 2 },
  { title: "Apple", id: 3 },
];

function Product({ title, id }) {
  return (
    <li>
      <h2>{title}</h2>
      <p><span>{id}</span></p>
    </li>
  );
}

function Products() {
  const listProduct = products.map((product) => (
    <Product key={product.id} title={product.title} id={product.id} />
  ));
  return <ul>{listProduct}</ul>;
}

export default Products;
