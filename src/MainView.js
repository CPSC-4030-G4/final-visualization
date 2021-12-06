import logo from './logo.svg';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {border} from '@mui/system'
import Card from '@mui/material/Card';
import GitHubIcon from '@mui/icons-material/GitHub';
import './App.css';
import { csv, filter } from 'd3';
import dataset from '../src/vgsales.csv';
import React, { useState } from 'react';
import Barchart from './charts/Barchart'
import Heatmap from './charts/Heatmap'
import Scatterplot from './charts/Scatterplot';
import {MenuItem , FormControl, Select, InputLabel, Stack,  Grid, Link, Avatar, FormHelperText, ListItem, ListItemText, ListItemAvatar, List} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';



  function ButtonAppBar(props) {
    let bColor = props.publisher === "Nintendo" ? "red" : props.publisher === "Microsoft" ? "green" : "blue"
    const dict = {
      "Nintendo": "8-bit-mario-11562912925mo81zmly9j.png",
      "Microsoft": "cgoqo9wrp7e51.png",
      "Sony": "st,small,507x507-pad,600x600,f8f8f8.u4.jpg"
    }
   return (
     <Box sx={{ flexGrow: 1, marginBottom: 12 }}>
       <AppBar position="fixed"  sx={{ bgcolor: "#444" }}>
         <Toolbar>
           <Avatar sx={{ marginRight: "12px" }} src={'/' + dict[props.publisher]}></Avatar>
           <Button size='small' style={{backgroundColor: bColor, color: '#FFFFFF',  border: 1 , borderColor: 'primary.main', borderRadius: 12}}  color='inherit' target="_blank" href="https://www.kaggle.com/gregorut/videogamesales">Data Source</Button>
           <Button size='small' style={{backgroundColor: bColor, color: '#FFFFFF', marginLeft : "12px" , border: 1, borderColor: 'primary.main',  borderRadius: 12 }} color='inherit' target="_blank" href="https://github.com/CPSC-4030-G4/final-visualization">Source Code</Button>
           <Box sx={{ minWidth: 275, marginLeft : "400px" }}>
          <Card variant="outlined">Showing Data for 
            <Typography sx={{ m : .5 }} color="black">
            <strong>{props.filterPlat !== null ? props.filterPlat : "All Platforms"}</strong>
            </Typography>
          </Card>
        </Box>
            <List disablePadding={true} style={{display : "flex", marginLeft: "300px"}}>
                <ListItem >
                  <ListItemText primary="&#128994;"/>
                  <ListItemText primary="Microsoft"/>
                </ListItem>
                <ListItem>
                  <ListItemText primary="&#128309;"/>
                  <ListItemText primary="Sony"/>
                </ListItem>
                <ListItem>
                  <ListItemText primary="&#128308;"/>
                  <ListItemText primary="Nintendo"/>
                </ListItem>
            </List>
         </Toolbar>  
       </AppBar>
     </Box>
   );
 }
 
 const Img = (props) => {
   if(props.publisher === "Nintendo") {
     return (
         <img  src="https://cdn.discordapp.com/attachments/593601038162984961/916191037796544522/Screen_Shot_2021-12-02_at_11.55.49_PM.png" width="800" height="42"></img>
     )
   }
   else if(props.publisher === "Microsoft") {
     return (
       <img  src="https://cdn.discordapp.com/attachments/593601038162984961/916191394438185000/Screen_Shot_2021-12-02_at_11.57.20_PM.png" width="800" height="42"></img>
     )
   }
   else if(props.publisher === "Sony"){
     return (
       <img src="https://cdn.discordapp.com/attachments/593601038162984961/916191228670935080/Screen_Shot_2021-12-02_at_11.56.41_PM.png" width="800" height="42"></img>
     )
   }
 }
 const MainView = () => {

   const [data, setData] = React.useState([]);
   const [welcomed, setWelcomed] = useState(false)
   const [render, setRender] = React.useState(false)
   const [loading, setLoading] = React.useState(true);
   const [filterPlat, setFilterPlat] = React.useState(null)
   const [show, setShow] = useState(false)
   const [publisher, setPublisher] = React.useState("Nintendo")
   const nintendo = ['Wii', 'GBA', 'GB', 'DS', 'SNES', 'NES', 'WiiU', '3DS', 'GC', 'N64']
   const playstation = ['PS2', 'PS3', 'PSV', 'PSP', 'PS', 'PS4']
   const microsoft = ['XB', 'X360', 'XOne']
   const [platforms, setPlatforms] = React.useState(nintendo)
   const [region, setRegion] = React.useState("Global_Sales")
   const [filteredData, setFilteredData] = React.useState([])
   const [clicked, setClicked] = React.useState(false)
   console.log(filteredData)

   const handlePublisherChange = (data) => {
     if(show === false) setShow(true)
     const publisher = data.target.value
     setPublisher(publisher)
     if(publisher === "Nintendo")  setPlatforms(nintendo)
     if(publisher === "Sony")   setPlatforms(playstation)
     if(publisher === "Microsoft")     setPlatforms(microsoft)
     setFilterPlat(null)
     setFilteredData([])
 
   }
 
   const handleRegionChange = (data) => {
     if(show === false) setShow(true)
     const region = data.target.value
     setRegion(region)
   }
 
   const filterPlatform = (dataset, platform) => {
     const filteredData = dataset.map((d) => {
       console.log(d)
     })
   } 
 
   React.useEffect(() => {
     csv(dataset).then(data => {
       setData(data);
       console.log(filterPlat) 
       setLoading(false);
     })  
   }, []);

    console.log(filteredData)
     return (
     <div className="App">
     <div>
     <ButtonAppBar publisher={publisher} filterPlat={filterPlat}></ButtonAppBar>  
     </div>
     <div style={{ display: "flex", justifyContent: "center", marginRight : "100px"}}>
     <Box>
     <FormControl sx={{ m: 1, minWidth: 80, color: 'red'  }}>
       <InputLabel id="demo-simple-select-label">Publisher </InputLabel>
       <Select
         label="Publisher"
         value={publisher}
         placeholder='Select Publisher'
         onChange={handlePublisherChange}
       >
         <MenuItem value="Nintendo">Nintendo</MenuItem>
         <MenuItem value="Sony">Sony</MenuItem>
         <MenuItem value="Microsoft">Microsoft</MenuItem>
       </Select>
       <FormHelperText>Affects All Visualizations</FormHelperText>
       </FormControl>
       </Box>
       <Box>
         <FormControl sx={{ m: 1, minWidth: 80, color: 'red'  }}>
           <InputLabel id="demo-simple-select-label">Region</InputLabel>
           <Select
             label="Region"
             value={region}
             placeholder='Select Region'
             onChange={handleRegionChange}
           >
             <MenuItem value="Global_Sales">Global</MenuItem>
             <MenuItem value="NA_Sales">North America</MenuItem>
             <MenuItem value="EU_Sales">Europe</MenuItem>
             <MenuItem value="JP_Sales">Japan</MenuItem>
           </Select>
           <FormHelperText>Affects Only Barchart and Heatmap</FormHelperText>
           </FormControl>
       </Box>
       </div>
       <div className='top-container'>
         <div className='chart-style'>
         <Barchart dataset={data} platforms={platforms} publisher={publisher} region={region} filterFunc={setFilterPlat} filterPlat={filterPlat} filterDataFunc={setFilteredData} clickFunction={setClicked} clicked={clicked}></Barchart>
         </div>
         <div style ={{margin : "60px"}}>
           
         </div>
         <div>
           <div>
           <Img publisher={publisher}></Img>
           <Heatmap dataset={filteredData == [] || filteredData.length == 0 ? data : filteredData} platforms={platforms}  publisher={publisher} region={region} render={render} setRender={setRender}></Heatmap>
           </div>
         </div>
       </div>
         <div className='bottom-container'>
           <div>
             <Scatterplot dataset={filteredData == [] || filteredData.length == 0 ? data : filteredData} platforms={platforms} publisher={publisher} show={show} filterPlat={filterPlat}></Scatterplot>
           </div>
         </div>
     </div>
   );
 }


export default MainView