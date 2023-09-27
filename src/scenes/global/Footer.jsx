// import {useState } from '@mui/material';
// import { Box, Typography } from '@mui/material';
// import { shades } from '../../theme';
// import { useTheme } from '@emotion/react';

// const Footer = () => {
//     const {
//         palette: { neutral},

//     } = useTheme()
//   return (
//     <Box mt='70px' p='40px 0' backgroundColor={neutral}>
//         <Box
//         width='80%'
//         margin='auto'
//         display='flex'
//         justifyContent='space-between'
//         flexWrap='wrap'
//         rowGap='30px'
//         columnGap='clamp(20px, 30px, 40px)'
//         >
//             <Box width='clamp(20px, 30px, 40px)'>
//                 <Typography 
//                 variant='h4'
//                 fontWeight='bold'
//                 mb='30px'
//                 color={shades.secondary[500]}
//                 >
//                     LADYBAG

//                 </Typography>
//                 <div>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
//                 </div>
//             </Box>

//             <Box>
//                 <Typography variant='h4' fontWeight='bold' mb='30px'>
//                     About Us
//                 </Typography>
//                 <Typography mb='30px'>Careers</Typography>
//                 <Typography mb='30px'>Ours Stores</Typography>
//                 <Typography mb='30px'>Term & Conditions</Typography>
//                 <Typography mb='30px'>Privacy Policy</Typography>
//             </Box>

//             <Box>
//                 <Typography variant='h4' fontWeight='bold' mb='30px'>
//                     Customer Care
//                 </Typography>
//                 <Typography mb='30px'>Help Center</Typography>
//                 <Typography mb='30px'>Track Your Order</Typography>
//                 <Typography mb='30px'>Corporate & Purchasing </Typography>
//                 <Typography mb='30px'>Returns & Refunds</Typography>
//             </Box>

//             <Box>
//                 <Typography variant='h4' fontWeight='bold' mb='20px'>
//                     Conctact Us
//                 </Typography>
//                 <Typography mb='10px'>5th north Lafayette Blvd, Charlotte, NC 10245</Typography>
//                 <Typography mb='10px'>Email: ladybag@gmail.com</Typography>
//                 <Typography mb='10px'>(222)345-6789 </Typography>
//             </Box>
//         </Box>

//     </Box>
//   )
// }

// export default Footer


import { Box, Typography } from '@mui/material';
import { shades } from '../../theme';
import { useTheme } from '@emotion/react';

const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();

  return (
    <Box mt='70px' p='40px 0' bgcolor='rgb(242, 242, 242)'>
      <Box
        width='80%'
        margin='auto'
        display='flex'
        justifyContent='space-between'
        flexWrap='wrap'
        rowGap='30px'
        columnGap='clamp(20px, 30px, 40px)'
      >
        <Box width='clamp(20% , 30% , 40% )' >
          <Typography
            variant='h5'
            fontWeight='bold'
            mb='30px'
            color={shades.secondary[500]}
          >
            LADYBAG
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
        </Box>

        <Box>
          <Typography variant='h5' fontWeight='bold' mb='30px'>
            About Us
          </Typography>
          <Typography mb='10px'>Careers</Typography>
          <Typography mb='10px'>Our Stores</Typography>
          <Typography mb='10px'>Terms & Conditions</Typography>
          <Typography mb='10px'>Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant='h5' fontWeight='bold' mb='30px'>
            Customer Care
          </Typography>
          <Typography mb='10px'>Help Center</Typography>
          <Typography mb='10px'>Track Your Order</Typography>
          <Typography mb='10px'>Corporate & Purchasing</Typography>
          <Typography mb='10px'>Returns & Refunds</Typography>
        </Box>

        <Box width='clamp(20%, 25%, 30%)'>
          <Typography variant='h5' fontWeight='bold' mb='30px'>
            Contact Us
          </Typography>
          <Typography mb='10px'>5th North Lafayette Blvd, Charlotte, NC 10245</Typography>
          <Typography mb='10px'>Email: ladybag@gmail.com</Typography>
          <Typography mb='10px'>(222)345-6789</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;