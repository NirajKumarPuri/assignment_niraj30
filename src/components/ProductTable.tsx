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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface data {
  id: number;
  component: Product[];
}

interface Product {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
}

const ProductTable = () => {
  const [data, setData] = useState<data[]>([{ id: 0, component: [] }]);

  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      setData([{ id: 0, component: response.data }]);
    };
    fetchData();
  }, []);

  const handleClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {};
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log("recod===>", reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);
    setProducts(items);
    setData([{ id: 0, component: items }]);
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
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
            {data?.map((item, index) => (
              <Droppable key={item.id} droppableId={`products${item.id}`}>
                {(provided) => (
                  <TableBody
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {item.component.slice(0, 4).map((product, index) => (
                      <Draggable
                        key={product.id}
                        draggableId={`products${product.id}`}
                        index={index}
                      >
                        {(provided) => (
                          <TableRow
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            sx={{
                              backgroundColor: "black",
                              color: "white",
                              border: "1px solid white",
                            }}
                            // key={product.id}
                          >
                            <TableCell
                              sx={{ color: "white" }}
                              onClick={() => handleClick(product)}
                              onKeyDown={(e) => handleKeyPress(e, product.id)}
                            >
                              {product.id}
                            </TableCell>

                            <TableCell
                              sx={{ color: "white", border: "1px solid white" }}
                            >
                              <Link
                                href={{
                                  pathname: "/Products/product_details",
                                  query: { Id: product.id },
                                }}
                              >
                                {product.title}
                              </Link>
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", border: "1px solid white" }}
                            >
                              <Link
                                href={{
                                  pathname: "/Products/product_details",
                                  query: { Id: product.id },
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                {product.image}
                              </Link>
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", border: "1px solid white" }}
                            >
                              <Link
                                href={{
                                  pathname: "/Products/product_details",
                                  query: { Id: product.id },
                                }}
                                style={{ textDecoration: "none" }}
                              >
                                {product.category}
                              </Link>
                            </TableCell>
                            <TableCell
                              sx={{ color: "white", border: "1px solid white" }}
                            >
                              <Link
                                href={{
                                  pathname: "/Products/product_details",
                                  query: { Id: product.id },
                                }}
                              >
                                {product.description}
                              </Link>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </TableBody>
                )}
              </Droppable>
            ))}
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
      </DragDropContext>
    </>
  );
};

export default ProductTable;
