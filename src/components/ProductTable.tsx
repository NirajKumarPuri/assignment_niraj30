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
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

interface Product {
  id: number;
  title: string;
  image: string;
}
interface data {
  id: number;
  component: Product[];
}

const ProductTable = () => {
  const [data, setData] = useState<data[]>([{ id: 0, component: [] }]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://fakestoreapi.com/products");
      console.log("rers====>", response);
      setProducts(response.data);
      setData([{ id: 0, component: response.data }]);
    };
    fetchData();
  }, []);

  const handleClick = (product: Product, index: any) => {
    setSelectedProduct(product);
    setCurrentIndex(index);
  };

  const handleKeyPress = (event: React.KeyboardEvent, index: number) => {
    // Handle arrow key navigation
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    console.log("recod===>", reorderedItem);
    items.splice(result.destination.index, 0, reorderedItem);
    setProducts(items);
    setData([{ id: 0, component: items }]);
  };
  console.log("data====>", data);
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Image</TableCell>
            </TableRow>
          </TableHead>
          {data?.map((item, index) => (
            <Droppable key={item.id} droppableId={`products${item.id}`}>
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {item?.component?.map((product, index) => (
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
                          // key={product.id}
                        >
                          <TableCell
                            onClick={() => handleClick(product, index)}
                            onKeyDown={(e) => handleKeyPress(e, product.id)}
                          >
                            {product.id}
                          </TableCell>
                          <TableCell>{product.title}</TableCell>
                          <TableCell>{product.image}</TableCell>
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
        <div>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
        </div>
      )}
    </DragDropContext>
  );
};

export default ProductTable;
