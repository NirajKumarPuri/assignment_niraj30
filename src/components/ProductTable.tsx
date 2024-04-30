"use client";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import styles from "./productTable.module.css";
import Link from "next/link";

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
}

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const handleClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {};
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.slice(0, 4).map((product) => (
              <TableRow
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  border: "1px solid white",
                }}
                key={product.id}
              >
                <TableCell
                  sx={{ color: "white" }}
                  onClick={() => handleClick(product)}
                  onKeyDown={(e) => handleKeyPress(e, product.id)}
                >
                  {product.id}
                </TableCell>

                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  <Link
                    href={`/Products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  <Link
                    href={`/Products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {product.image}
                  </Link>
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  <Link
                    href={`/Products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {product.category}
                  </Link>
                </TableCell>
                <TableCell sx={{ color: "white", border: "1px solid white" }}>
                  <Link
                    href={`/Products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {product.description}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {selectedProduct && (
        <div className={styles.imgbox}>
          <img
            src={selectedProduct.image}
            alt={selectedProduct.title}
            className={styles.img}
          />
        </div>
      )}
    </>
  );
};

export default ProductTable;
