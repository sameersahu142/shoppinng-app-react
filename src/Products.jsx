import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import PageNotFound from "./PageNotFound";

// const products = [
//   {
//     id: 1,
//     category: "shoes",
//     image: "shoe1.jpg",
//     name: "Hiker",
//     price: 94.95,
//     skus: [
//       { sku: "17", size: 7 },
//       { sku: "18", size: 8 },
//     ],
//     description: "This rugged boot will get you up the mountain safely.",
//   },
//   {
//     id: 2,
//     category: "shoes",
//     image: "shoe2.jpg",
//     name: "Climber",
//     price: 78.99,
//     skus: [
//       { sku: "28", size: 8 },
//       { sku: "29", size: 9 },
//     ],
//     description: "Sure-footed traction in slippery conditions.",
//   },
//   {
//     id: 3,
//     category: "shoes",
//     image: "shoe3.jpg",
//     name: "Explorer",
//     price: 145.95,
//     skus: [
//       { sku: "37", size: 7 },
//       { sku: "38", size: 8 },
//       { sku: "39", size: 9 },
//     ],
//     description: "Look stylish while stomping in the mud.",
//   },
// ];

const Products = () => {
  const [size, setSize] = useState("");
  const { category } = useParams();

  const {
    data: products,
    error,
    loading,
  } = useFetch("products?category=" + category);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <PageNotFound />;

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
      </section>
      {size && <h2>Found {filteredProducts.length} items</h2>}
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
};

export default Products;
