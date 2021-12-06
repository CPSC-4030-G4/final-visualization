import React from "react"
import { Button } from "@mui/material"
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Avatar } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function ButtonAppBar() {
const img = "8-bit-mario-11562912925mo81zmly9j.png"
 return (
   <Box sx={{ flexGrow: 1, marginBottom: 12 }}>
     <AppBar position="fixed"  sx={{ bgcolor: "#444" }}>
       <Toolbar>
         <Avatar sx={{ marginRight: "12px" }} src={'/' + img}></Avatar>
         <Button style={{backgroundColor: "red", color: '#FFFFFF',  border: 4 , borderColor: 'primary.main', borderRadius: 12}}  color='inherit' target="_blank" href="https://www.kaggle.com/gregorut/videogamesales">Link to Data Source</Button>
         <Button  style={{backgroundColor: "red", color: '#FFFFFF', marginLeft : "12px" , paddingLeft : "12px", border: 4 , borderColor: 'primary.main',  borderRadius: 12 }} color='inherit' target="_blank" href="https://github.com/CPSC-4030-G4/final-visualization">Link to Source Code</Button>
       </Toolbar>  
     </AppBar>
   </Box>
 );
}
const Welcome = (props) => {
  return(
  <div style={{ justifyContent: "center", textAlign: "center"}}>
    <ButtonAppBar></ButtonAppBar>
  <h2>Hello There!</h2>
  <p>Our visualization project aims to examine the different factors that affect the sales of video games across multiple regions and generations.</p>
  <Button style={{backgroundColor: "red"}} variant="contained" onClick={() => {props.setContinued(true)}} endIcon={<ArrowForwardIosIcon />} >Continue to Dashboard</Button>
  </div>
  )
}

export default Welcome 