import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { deepPurple } from "@mui/material/colors";
import { useChatContext } from "../context/contextProvider";

export default function PositionedMenu() {
  const { userL } = useChatContext();
  const [user, setUser] = React.useState();
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleShowProfile = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    Navigate("/");
    setAnchorEl(null);
  };
  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")) || null);
  }, [userL]);
  // console.log(user)
  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {user && (
          <Avatar sx={{ width: 32, height: 32, bgcolor: deepPurple[500] }}>
            {user.name[0]}
          </Avatar>
        )}
      </Button>
      {!user && (
        <Link to="/" style={{ textDecoration: "none" }}>
          Login
        </Link>
      )}
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {userL && <MenuItem onClick={handleShowProfile}>{userL.name}</MenuItem>}
        {userL && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
