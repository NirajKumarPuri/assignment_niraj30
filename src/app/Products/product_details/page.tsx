"use client";

import { Typography } from "@mui/material";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
}

const SidePanel = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("Id");
  const [products, setProducts] = useState<Product[]>([]);
  const [filterData, setFilterData] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    if (products?.length > 0 && slug !== "") {
      setFilterData(products?.find((item: any) => item.id == slug));
    }
  }, [products, slug]);

  console.log(slug);
  return (
    <div>
      {filterData ? (
        <>
          <Typography variant="h6" style={{ margin: "10px 0px 0px 10px" }}>
            {filterData.title}
          </Typography>
          <img
            src={filterData.image}
            style={{ width: "200px", height: "200px", marginLeft: "20px" }}
            alt={filterData.title}
          />
          <p style={{ margin: "24px" }}>{filterData.category}</p>
        </>
      ) : (
        <Typography variant="body1">
          Select a product to view details
        </Typography>
      )}
    </div>
  );
};

const SidePanelWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SidePanel />
    </Suspense>
  );
};

export default SidePanelWrapper;
