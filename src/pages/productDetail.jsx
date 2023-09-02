import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import axios from "axios";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const DetailPage = () => {
  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9000/carts/${id}`)
      .then((response) => {
        setData(response?.data);
      })
      .catch((err) => {
        alert("Cannot fetch data!");
      });
  }, [id]);

  const handleIncrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateTotalPrice = () => {
    return data?.price * quantity;
  };

  return (
    <>
      <Container>
        <Typography
          sx={{
            justifyContent: "center",
            display: "flex",
            my: "30px",
          }}
          variant="h4"
        >
          Product Detail
        </Typography>
        <Card className="flex items-center m-4">
          <img
            className="w-80 h-[350px] p-5 mr-4"
            src={data?.thumbnailUrl}
            title={data?.name}
          />
          <CardContent className="flex flex-col items-start">
            <Typography
              className="text-xl font-bold"
              sx={{ fontSize: "20px", fontWeight: "bold" }}
              variant="h6"
            >
              {data?.name}
            </Typography>
            <div className="mt-1">
              <Typography>Quantity:</Typography>
              <IconButton onClick={handleDecrementQuantity}>
                <RemoveIcon />
              </IconButton>
              <span className="mx-2">{quantity}</span>
              <IconButton onClick={handleIncrementQuantity}>
                <AddIcon />
              </IconButton>
            </div>
            <Typography
              sx={{
                marginTop: "8px",
                fontSize: "17px",
                fontWeight: "bold",
              }}
              className="mt-2 text-xl font-bold text-secondary"
            >
              Price: Rp{" "}
              {data?.price ? data.price.toLocaleString("id-ID") : "N/A"}
            </Typography>
            <Typography
              sx={{ marginTop: "8px", fontSize: "17px", fontWeight: "bold" }}
            >
              Product Total Price: Rp{" "}
              {calculateTotalPrice().toLocaleString("id-ID")}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default DetailPage;
