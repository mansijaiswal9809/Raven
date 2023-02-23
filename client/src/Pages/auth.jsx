import React, { useEffect } from "react";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";
import { useNavigate } from "react-router-dom";


const Auth = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      Navigate("/chats");
    }
  }, [Navigate]);

  return (
    <Box
      sx={{
        width: "100vw",
        typography: "body1",
        display: "grid",
        placeContent: "center",
        height: "100vh",
        // backgroundColor: "green",
        boxSizing: "border-box",
      }}
    >
      <Box height={{xs:"100vh",sm:"auto"}} marginTop={{xs:"30px", sm:"auto"}}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              width: { xs: "100vw", sm: "500px" },
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              sx={{ width: "100%" }}
            >
              <Tab
                label="Sign Up"
                value="1"
                sx={{ backgroundColor: "#9c27b0", width: "50%" }}
              />
              <Tab
                label="Sign In"
                value="2"
                sx={{ backgroundColor: "#9c27b0", width: "50%" }}
              />
              {/* <Tab label="Item Three" value="3" /> */}
            </TabList>
          </Box>
          <TabPanel
            value="1"
            sx={{ width: { xs: "100vw", sm: "500px" }, padding: "5% 2%" , transform:"translateX(-10px)"}}
          >
            <SignUp />
          </TabPanel>
          <TabPanel
            value="2"
            sx={{ width: { xs: "100vw", sm: "500px" }, padding: "5% 2%",transform:"translateX(-10px)" }}
          >
            <SignIn />
          </TabPanel>
          {/* <TabPanel value="3">Item Three</TabPanel> */}
        </TabContext>
      </Box>
    </Box>
  );
};

export default Auth;
