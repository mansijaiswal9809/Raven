import { Box, Stack } from "@mui/system";
import { BsSearch } from "react-icons/bs";
import React from "react";
import { useChatContext } from "../context/contextProvider";
import PositionedMenu from "./Menu";

const NavBar = () => {
  const { setSidebarOpen, sidebarOpen } = useChatContext();
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      padding={2}
      marginX={1}
      marginTop={1}
      sx={{ fontSize: "20px", backgroundColor: "white", borderRadius: "10px" }}
    >
      <Stack
        direction="row"
        gap={2}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        sx={{ cursor: "pointer" }}
      >
        <Box>
          <BsSearch />
        </Box>
        <Box>Search User</Box>
      </Stack>
      <Box
        sx={{
          fontFamily: "'Kenia', cursive",
          fontSize: "40px",
          color: "green",
        }}
      >
        {" "}
        Raven
      </Box>
      <Box>
        <PositionedMenu />
      </Box>
    </Stack>
  );
};

export default NavBar;
