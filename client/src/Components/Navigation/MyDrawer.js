import  React, {useContext} from 'react';
import { MainContext } from "../Context/MainContext";
import { DRAWER, LOGOUT_USER } from "../Context/types";
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { red, yellow,purple  } from '@mui/material/colors';
import AddBoxIcon from '@mui/icons-material/AddBox';
import KayakingIcon from '@mui/icons-material/Kayaking';
import CottageIcon from '@mui/icons-material/Cottage';
import ChaletIcon from '@mui/icons-material/Chalet';
import GroupIcon from '@mui/icons-material/Group';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MyDrawer() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
	const { state, dispatch } = useContext(MainContext);
  const designationId = state.designation.id;
const handleLogout = () => {
		dispatch({ type: LOGOUT_USER });
	};
  return (
    <>
    <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/dashboard" color="inherit" underline="hover">
          <Typography variant="h6" noWrap component="div">
            Mera Tender
          </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {listData1.map((l, i) => (
              ("aa"=="aa" || (designationId==="admin" && l.admin=== true) || (designationId==="supervisor" && l.supervisor=== true) || (designationId==="fieldPartner" && l.fieldPartner=== true)) &&
              (<Link href={l.link} key={l.link} color="inherit" underline="hover">
                  <ListItem button >
                  <Tooltip title={l.text} placement="right">
              <ListItemIcon>
                {l.icon}
              </ListItemIcon>
              </Tooltip>
              <ListItemText primary={l.text} />
            </ListItem>
          </Link>)
                 
          ))}
        </List>
        <Divider />
        <List>
        {listData2.map((l, i) => (
             <Link href={l.link} key={l.text} color="inherit" underline="hover">
                 <ListItem button >
                 <Tooltip title={l.text} placement="right">
             <ListItemIcon>
               {l.icon}
             </ListItemIcon>
             </Tooltip>
             <ListItemText primary={l.text} />
           </ListItem>
         </Link> ))}
         {state.isAuthenticated ? (
				 <Link onClick={handleLogout} color="inherit" underline="hover">
         <ListItem button key="LogOut">
         <Tooltip title="LogOut" placement="right">
     <ListItemIcon>
     <LogoutIcon sx={{ color: red[500] }}/>
     </ListItemIcon>
     </Tooltip>
     <ListItemText primary="LogOut" />
   </ListItem>
 </Link>
				) : (
          <Link href="/login" color="inherit" underline="hover">
          <ListItem button key="Log In">
          <Tooltip title="Log In" placement="right">
      <ListItemIcon>
      <LoginIcon color="success"/>
      </ListItemIcon>
      </Tooltip>
      <ListItemText primary="Log In" />
    </ListItem>
  </Link>
				)}
     
        </List>
      </Drawer>
    </>
  );
}

const listData1 = [
	{ text: "Dashboard", link: "/dashboard", icon: <DashboardIcon color="primary"  />,admin:true,supervisor:true,fieldPartner:true  },
  { text: "Add Tender", link: "/AddTender", icon: <AddBoxIcon color="success" />,admin:true },
  { text: "Add Department", link: "/AddDepartment", icon: <KayakingIcon color="success" />,admin:true },
  { text: "Add State", link: "/AddState", icon: <CottageIcon color="success" />,admin:true },
  { text: "Add District", link: "/AddDistrict", icon: <ChaletIcon color="success" />,admin:true },
  { text: "Add Business", link: "/AddBusiness", icon: <KayakingIcon color="success" />,admin:true },
];
const listData2 = [

	{ text: "All User", link: "/AllUser", icon: <GroupIcon sx={{ color: purple [500] }}/> },


];
