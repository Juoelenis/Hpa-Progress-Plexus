import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../utils/constants";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    // sx={{
    // overflowY: "auto",
    // height: { sx: "auto", md: "95%" },
    // flexDirection: { md: "column" },
    // }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          background: category.name === selectedCategory && "#FC1503",
          color: "blue",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          // color: "white",
          fontStyle: "bold",
          margin: "12px",
        }}
        key={category.name}
      >
        <span
          style={{
            color: category.name === selectedCategory ? "white" : "red",
          }}
        >
          <img src={category.icon} alt={category.icon} />
        </span>
        <span
          style={{ opacity: category.name === selectedCategory ? "1" : "0.8" }}
        >
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Categories;
