"use client"

import FilterComp from "@/components/Organisams/FilterComp/FilterComp";
import ProductListPage from "@/pages/ProductListPage/ProductListPage";
import styled from "styled-components";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;

const Products = () => {
  return (
    <Wrapper>
      <FilterComp />
      <ProductListPage showFilter={true} />
    </Wrapper>
  );
};

export default Products;
