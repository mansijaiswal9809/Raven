import React from "react";
import { Box, Container, Tabs } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "100vw",
        typography: "body1",
        display: "grid",
        placeContent: "center",
        height: "100vh",
        // backgroundColor: "green",
        boxSizing:"border-box"
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", width:"25vw"}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{width:"100%"}}>
            <Tab
              label="Sign Up"
              value="1"
              sx={{ backgroundColor: "#AFEEEE", width:"50%" }}
            />
            <Tab
              label="Sign In"
              value="2"
              sx={{ backgroundColor: "#AFEEEE", width:"50%" }}
            />
            {/* <Tab label="Item Three" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="1" sx={{width:"25vw",padding:"5% 2%"}}>
          <SignUp />
        </TabPanel>
        <TabPanel value="2" sx={{width:"25vw", padding:"5% 2%"}}>
          <SignIn />
        </TabPanel>
        {/* <TabPanel value="3">Item Three</TabPanel> */}
      </TabContext>
    </Box>
  );
};

export default Auth;
