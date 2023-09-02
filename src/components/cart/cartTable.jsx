import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Link } from "react-router-dom";

const CartTable = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:9000/carts")
      .then((response) => {
        const initialCartItems = response.data.map((item) => ({
          ...item,
          isSelected: true,
        }));
        setCartItems(initialCartItems);
        calculateTotalPrice(initialCartItems);
        setSelectedCount(initialCartItems.length);
      })
      .catch((err) => {
        alert("Cannot fetch data!");
      });
  }, []);

  useEffect(() => {
    const count = cartItems.filter((item) => item.isSelected).length;
    setSelectedCount(count);
    setSelectAll(count === cartItems.length);
    calculateTotalPrice(cartItems);
  }, [cartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => (item.isSelected ? acc + item.price * item.quantity : acc),
      0
    );
    setTotalPrice(total);
  };

  const handleToggleAll = () => {
    const updatedCartItems = cartItems.map((item) => ({
      ...item,
      isSelected: !selectAll,
    }));
    setCartItems(updatedCartItems);
  };

  const handleToggleItem = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, isSelected: !item.isSelected };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    setSelectAll(updatedCartItems.every((item) => item.isSelected));
  };

  const handleQuantityChange = (itemId, change) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(item.quantity + change, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  const handleRemove = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  const handleRemoveAll = () => {
    const updatedCartItems = cartItems.filter((item) => !item.isSelected);
    setCartItems(updatedCartItems);
    calculateTotalPrice(updatedCartItems);
  };

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 4 }}>
          Shopping Cart
        </Typography>
        <Button
          onClick={handleRemoveAll}
          disabled={!cartItems.some((item) => item.isSelected)}
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
        >
          Remove All
        </Button>

        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox checked={selectAll} onChange={handleToggleAll} />
                </TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Price (IDR)</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Total (IDR)</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      checked={item.isSelected}
                      onChange={() => handleToggleItem(item.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <Link to={`/products/${item.id}`}>
                      <div className="flex items-center ">
                        <img
                          src={item.thumbnailUrl}
                          alt={item.name}
                          style={{ width: 50, marginRight: 16 }}
                        />
                        {item.name}
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell>{item.price.toLocaleString("id-ID")}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, -1)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    {item.quantity}
                    <IconButton
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <AddIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    {(item.price * item.quantity).toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRemove(item.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
          }}
        >
          <Typography variant="subtitle1">{selectedCount} Products</Typography>
          <Typography variant="h6">
            Total : IDR {totalPrice.toLocaleString("id-ID")}
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default CartTable;
