// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
// import { setItems } from '../../state';
// import Item from "../../components/Item"

// const ShoopingList = () => {
//     const dispatch = useDispatch();
//     const [value, setValue] = useState("all");
//     const isNonMobile = useMediaQuery("(min-width:600px)");
//     const items = useSelector((state) => state.cart.items);
//     console.log("items", items);

//     const handleChange =(event, newValue) => {
//         setValue(newValue);
//     };

//     async function getItems() {
//         const items = await fetch(
//             "http://localhost:1337/api/items?populate=image",
//             { method: "GET"}
//         );
//         const itemsJson = await items.json();
//         dispatch(setItems(itemsJson.data));
//     }

//     useEffect(() =>{
//         getItems()
//     }, []) // eslint-disable-line react-hooks/exhaustive-deps

    
//   const topRatedItems = items.filter(
//     (item) => item.attributes.category === "topRated"
//   );
//   const newArrivalsItems = items.filter(
//     (item) => item.attributes.category === "newArrivals"
//   );
//   const bestSellersItems = items.filter(
//     (item) => item.attributes.category === "bestSellers"
//   );

     
  
// return  <Box width='80%' margin='80px auto'>
//         <Typography variant='h5' textAlign='center'>
//             Our Featured <b>Products</b>
//         </Typography>
//         <Tabs
//         textColor='primary'
//         indicatorColor='primary'
//         value={value}
//         onChange={handleChange}
//         centered
//         TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none"}}}
//         sx={{
//             m: "60px",
//             "& .MuiTabds-flexContainer": {
//                 flexWrap: 'wrap'
//             }
//         }}
//         >
//             <Tab label="ALL" value="all"/>
//             <Tab label="NEW ARRIVALS" value="newArrivals"/>
//             <Tab label="BEST SELLERS" value="bestSellers"/>
//             <Tab label="TOP RATED" value="topRated"/>

//         </Tabs>
//         <Box
//         margin='0 auto'
//         display='grid'
//         gridTemplateColumns='repeat(auto-fill, 300px)'
//         justifyContent='space-around'
//         rowGap='20px'
//         columnGap='1.33%'
//         >
//             {value === 'all' && items.map((item) => (
//                 <Item item={item} key={`${item.name}-${item.id}`} />
//             ))}
//             {value === 'newArrivals' && newArrivalsItems.map((item) => (
//                 <Item item={item} key={`${item.name}-${item.id}`} />
//             ))}
//             {value === 'bestSellers' && bestSellersItems.map((item) => (
//                 <Item item={item} key={`${item.name}-${item.id}`} />
//             ))}
//             {value === 'topRated' && topRatedItems.map((item) => (
//                 <Item item={item} key={`${item.name}-${item.id}`} />
//             ))}

//         </Box>
//     </Box>
   
// }

// export default ShoopingList


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Tab, Tabs, useMediaQuery } from '@mui/material';
import { setItems } from '../../state';
import Item from "../../components/Item"

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const items = useSelector((state) => state.cart.items);
  console.log("items", items);

  

  const getItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/items?populate=image"
      );
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      const itemsJson = await response.json();
      dispatch(setItems(itemsJson.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedItems = items.filter(
    (item) => item.attributes.category === "topRated"
  );
  const newArrivalsItems = items.filter(
    (item) => item.attributes.category === "newArrivals"
  );
  const bestSellersItems = items.filter(
    (item) => item.attributes.category === "bestSellers"
  );


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    
  return (
    <Box width='80%' margin='80px auto'>
        <Typography variant='h5' textAlign='center'>
            Our Featured <b>Products</b>
        </Typography>
        <Tabs
        textColor='primary'
        indicatorColor='primary'
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none"}}}
        sx={{
            m: "50px",
            "& .MuiTabds-flexContainer": {
                flexWrap: 'wrap'
            }
        }}
        >
            <Tab label="ALL" value="all"/>
            <Tab label="NEW ARRIVALS" value="newArrivals"/>
            <Tab label="BEST SELLERS" value="bestSellers"/>
            <Tab label="TOP RATED" value="topRated"/>

        </Tabs>
        <Box
        margin='0 auto'
        display='grid'
        gridTemplateColumns='repeat(auto-fill, 300px)'
        justifyContent='space-around'
        rowGap='20px'
        columnGap='1.33%'
        >
            {value === 'all' && items.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === 'newArrivals' && newArrivalsItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === 'bestSellers' && bestSellersItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}
            {value === 'topRated' && topRatedItems.map((item) => (
                <Item item={item} key={`${item.name}-${item.id}`} />
            ))}

        </Box>
    </Box>
  );
}

export default ShoppingList;