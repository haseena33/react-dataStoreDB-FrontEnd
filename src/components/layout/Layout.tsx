import SideBar from '../sidebar/Sidbar';
import Footer from '../footer/Footer';
import { Box } from '@mui/material';

const Layout = ({ children }:any) => {
  const childStyle = {
    marginLeft: '50px'
  };
  return (
    <Box style={childStyle}>
      <SideBar />
      {children }
      <Footer />
    </Box>
  );
};

export default Layout;
