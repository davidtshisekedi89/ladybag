import { Box, Alert, AlertTitle } from '@mui/material';

const Confirmation = () => (
  <Box m="90px auto" width="80%" minHeight="50vh">
    <Alert severity="info">
      <AlertTitle>Checkout return</AlertTitle>
      You returned from checkout. Payment and order fulfillment have not been independently verified.
      Please check your payment provider or contact the store before assuming the order is confirmed.
    </Alert>
  </Box>
);

export default Confirmation;
