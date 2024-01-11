import React, { useEffect, useState } from "react";
import ProductCard from "../component/ProductCard";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const ProductAll = () => {
  //db.json 에서 데이터 받아오기
  const [productList, setProductList] = useState([]);
  const [query, setQuery] = useSearchParams();
  const getProducts = async () => {
    let searchQuery = query.get("q") || "";
    console.log("쿼리값은?", searchQuery);
    let url = `https://my-json-server.typicode.com/LeeSence/hnm-react-router/products?q=${searchQuery}`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    setProductList(data);
  };

  useEffect(() => {
    getProducts();
  }, [query]);

  return (
    <div>
      <Container className="container-img">
        <Row>
          {productList.map((item) => (
            <Col lg={3} key={item.id}>
              <ProductCard item={item} />
            </Col>
          ))}
        </Row>
      </Container>
      <ProductCard />
    </div>
  );
};

export default ProductAll;
