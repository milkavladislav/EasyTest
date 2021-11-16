import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { ListItemText, IconButton } from "@mui/material/";
import { Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const CustomMenu = () => {
  const [isOpen, setOpen] = useState(false);

  const handleChange = () => {
    setOpen(!isOpen);
  };

  interface MenuItemProps{
    text: string,
    link: string
  }

  const menuItem : MenuItemProps[] = [
    {
      text: "Всі тести",
      link: "/tests",
    },
    {
      text: "Подивитися результати",
      link: "/tests/results"
    },
    {
      text: "Мої тести",
      link: "/tests/my"
    }
  ];

  return (
    <>
      <IconButton onClick={handleChange}>
        <Menu color={"primary"} fontSize={"large"} />
      </IconButton>
      <SwipeableDrawer
        anchor={"right"}
        open={isOpen}
        onClose={handleChange}
        onOpen={handleChange}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={handleChange}
          onKeyDown={handleChange}
        >
          <List>
            {menuItem.map((item: MenuItemProps, index) => (
              <Link to={item.link} key={index}>
                <ListItem button key={index}>
                  <ListItemText primary={item.text} />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
};
