'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Avatar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { Home, Person, Book, Group, Category, MenuOpenOutlined, Analytics } from '@mui/icons-material';
import StoreAvatarCard from "@/components/StoreAvatarCard";
import Link from "next/link";
import { Provider } from "react-redux";
import store from "@/store";
 
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import { NotificationProvider } from "@/components/NotificationProvider/useNotification";
import Notification from "@/components/Notification/Notification";
const theme = createTheme({
  palette: {
    primary: {
      main: '#1DA1F2', // Twitter blue
      dark: '#2795D9', // Dark blue variation
    },
    secondary: {
      main: '#FFFFFF', // White
      dark: '#000000', // Black
    },
    grey: {
      main: '#657786', // Twitter grey
    },
  },
});


const inter = Inter({ subsets: ["latin"] });




const drawerWidth = 300;




export default function RootLayout({ children }) {



  const pathname = usePathname()


  // const isSmallScreen = useMediaQuery((themes) => themes.breakpoints.down('sm'));
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
  
    // Initial check
    handleResize();
  
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
  
    // Clean up on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store} >
      
    <html lang="en">
      <body className={inter.className} style={{}} >
      {isSmallScreen? (
       <AppBar position="static">
       <Toolbar>
         <Avatar alt="Store Logo" src="https://img.freepik.com/premium-vector/city-building-vintage-book-store-facade-cartoon-house-exterior-with-entrance-book-shop_212168-933.jpg" />
         <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
           My Bookstore
         </Typography>
         <IconButton
           edge="start"
           color="inherit"
           aria-label="menu"
           onClick={handleMenuClick}
         >
           <MenuOpenOutlined/>
         </IconButton>
       </Toolbar>
       <Menu
         anchorEl={anchorEl}
         open={Boolean(anchorEl)}
         onClose={handleMenuClose}
       >
         <MenuItem component={Link} href="/orders" onClick={handleMenuClose}>Orders</MenuItem>
         <MenuItem component={Link} href="/customers" onClick={handleMenuClose}>Customers</MenuItem>
         <MenuItem component={Link} href="/books" onClick={handleMenuClose}>Books</MenuItem>
         <MenuItem component={Link} href="/authors" onClick={handleMenuClose}>Authors</MenuItem>
         <MenuItem component={Link} href="/Category" onClick={handleMenuClose}>Categories</MenuItem>
         <MenuItem component={Link} href="/analytics" onClick={handleMenuClose}>Analytics</MenuItem>
       </Menu>
     </AppBar>
    ) : (
      <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        borderRadius: 2,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: 'secondary.main',
          boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
          borderTopRightRadius: 40,
          borderBottomRightRadius: 40,
        },
      }}
      variant="permanent"
      anchor="left"
    >

        <StoreAvatarCard adminName={"arzit panda"} storeName={'books store'} avatarUrl={'https://img.freepik.com/premium-vector/city-building-vintage-book-store-facade-cartoon-house-exterior-with-entrance-book-shop_212168-933.jpg'} />

    
      <List sx={{paddingLeft:2,paddingRight:4,marginTop:4}}>
        {[
          { text: 'Orders', icon: <Home />, to: '/orders' },
          { text: 'Customers', icon: <Person />, to: '/customers' },
          { text: 'Books', icon: <Book />, to: '/books' },
          { text: 'Authors', icon: <Group />, to: '/authors' },
          { text: 'Category', icon: <Category />, to: '/Category' },
          { text: 'Analytics', icon: <Analytics />, to: '/analytics' },
        ].map((item, index) => (
          <ListItem 
          component={Link} 
          href={item.to}
            key={item.text} 
            sx={{ 
              color: pathname===item.to ? 'white':'black', 
              backgroundColor:pathname===item.to ? 'primary.dark':'white',
              borderRadius:6,
              '&:hover': {
                backgroundColor: pathname!==item.to ? 'primary.dark':'white',
                color: pathname!==item.to ? 'white':'black',
                transition:'background-color 0.3s ease, color 0.3s ease'
              },
              marginBottom:'2px'
            }}
          >
            <ListItemIcon sx={{
                  color:'primary.main'

            }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>)}
      <main>
      <Notification />
        {children}
          
      </main>
 
 

        </body>
    </html>

    </Provider>
    </ThemeProvider>
  );
}
