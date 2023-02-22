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
      color="green"
      sx={{ backgroundColor: "white", borderRadius: "10px" ,fontFamily: "'Kenia', cursive",
      fontSize: "25px" }}
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
        <Box sx={{display:{xs:"none", sm:"inline-block"}}}>Search User</Box>
      </Stack>
      <Box
        sx={{
          fontSize: "40px",
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
