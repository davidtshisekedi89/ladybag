import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from '../theme';
import { addToCart } from '../state';
import { useNavigate } from 'react-router-dom';


const Item = ({item, width}) => {                  // item comes from backend
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [count, setCount ] = useState(1);   // represent the number of items we're going to add to the cart is the local state, (the count we want to add in the cart )
    const [ isHovered, setIsHovered] = useState(false);
    const {
        palette: { neutral },
    } = useTheme();

    const { category, price, name, image } = item.attributes;
    const {
        data: {
            attributes: {
                formats: {
                    medium: { url },
                }
            }
        }
    } = image;


  return (
    <Box width={width}>
        <Box 
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        >

            <img
            alt={item.name}
            width="300px"
            height="400px"
            src={`http://localhost:1337${url}`}
            onClick={() => navigate(`/item/${item.id}`)}
            style={{ cursor: 'pointer'}}
            />
            <Box
            display={isHovered ? "block" : "none"}
            position='absolute'
            bottom='10%'
            left='0'
            width='100%'
            padding='0 5%'
            >
                <Box display="flex" justifyContent="space-between">
                    {/* Amount */}
                    <Box
                    display="flex"
                    alignItems="center"
                    backgroundColor={shades.neutral[100]}
                    borderRadius='3px'
                    >
                        <IconButton onClick={() => setCount(Math.max(count -1, 1))}   //short way to make sure the count doesnt go below one
                        >
                            <RemoveIcon />
                        </IconButton>
                        <Typography color={shades.primary[300]}>{count}</Typography>
                        <IconButton onClick={() => setCount(count + 1)}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                    {/* Button */}
                    <Button onClick={() => { dispatch(addToCart({ item: {...item, count}}))}}
                    sx={{ backgroundColor: shades.primary[300], color: "white"}}>
                    Add to Cart
                    </Button>

                </Box>

            </Box>
        </Box>

        <Box mt='3px'>
            <Typography variant='subtitle2' color={neutral}>
                {category
                .replace(/([A-Z])/g, "$1")
                .replace(/^./,(str)=> str.toUpperCase())}
            </Typography>   
            <Typography>{name}</Typography>
            <Typography fontWeight="bold">${price}</Typography>

             
        </Box>

    </Box>
  )
}

export default Item


// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { IconButton, Box, Typography, useTheme, Button } from '@mui/material';
// import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
// import { shades } from '../theme';
// import { addToCart } from '../state';
// import { useNavigate } from 'react-router-dom';

// const Item = ({ item, width }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [count, setCount] = useState(1);
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const {
//     palette: { neutral },
//   } = theme;

//   if (!item) {
//     return null; // Handle the case when item is undefined
//   }

//   const { category, price, name, image } = item.attributes;
//   const imageUrl = image?.data?.attributes?.formats?.medium?.url;

//   const handleAddToCart = () => {
//     const itemWithCount = { ...item, count };
//     dispatch(addToCart(itemWithCount));
//   };

//   return (
//     <Box width={width}>
//       <Box
//         position="relative"
//         onMouseOver={() => setIsHovered(true)}
//         onMouseOut={() => setIsHovered(false)}
//       >
//         <img
//           alt={name}
//           width="300px"
//           height="400px"
//           src={`http://localhost:1337${imageUrl}`}
//           onClick={() => navigate(`/item/${item.id}`)}
//           style={{ cursor: 'pointer' }}
//         />
//         <Box
//           display={isHovered ? 'block' : 'none'}
//           position="absolute"
//           bottom="10%"
//           left="0"
//           width="100%"
//           padding="0 5%"
//         >
//           <Box display="flex" justifyContent="space-between">
//             {/* Amount */}
//             <Box
//               display="flex"
//               alignItems="center"
//               backgroundColor={shades.neutral[100]}
//               borderRadius="3px"
//             >
//               <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
//                 <RemoveIcon />
//               </IconButton>
//               <Typography color={shades.primary[300]}>{count}</Typography>
//               <IconButton onClick={() => setCount(count + 1)}>
//                 <AddIcon />
//               </IconButton>
//             </Box>
//             {/* Button */}
//             <Button
//               onClick={handleAddToCart}
//               sx={{ backgroundColor: shades.primary[300], color: "white" }}
//             >
//               Add to Cart
//             </Button>
//           </Box>
//         </Box>
//       </Box>
//       <Box mt="3px">
//         <Typography variant="subtitle2" color={neutral.dark}>
//           {category}
//         </Typography>
//         <Typography>{name}</Typography>
//         <Typography fontWeight="bold">${price}</Typography>
//       </Box>
//     </Box>
//   );
// };

// export default Item;