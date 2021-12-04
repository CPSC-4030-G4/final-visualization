import React from "react";
import { Box } from "@mui/system";
import { Button } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const Welcome = (props) => {
  return(
    <div>
      <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
       <h1>Hello, there!</h1>
  <h2></h2>
  <ul>
    <li>
      <p>Our visualization project aims to examine the different factors that affect the sales of video games across multiple regions and generations.
      </p>
    </li>
    <li>
      <p>Available currently are 3 interactive different visualizations.</p>
    </li>
    <li>
      <h4>Helpful links</h4>
      <ul>
      <li>
        <a href="vgsales.csv" target="_blank">Link to dataset</a>
      </li>
      <li>
        <a href="https://www.kaggle.com/gregorut/videogamesales" target="_blank"> Link to data source</a>
      </li>
    </ul>
    </li>
  </ul>
  </Box>
  </div>
  )
}

export default Welcome