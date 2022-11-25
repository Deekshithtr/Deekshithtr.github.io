import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: '50%',
        width: '100px',
        height: '100px',
      }}
    >
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  );
}
