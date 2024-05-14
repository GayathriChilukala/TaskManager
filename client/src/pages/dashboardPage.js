import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import LabelIcon from '@mui/icons-material/Label';
import ReminderIcon from '@mui/icons-material/NotificationImportant';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskDashboard from '../components/Tasks';
import Profile from '../components/Profile';
import { Provider } from 'react-redux';
import store from '../store/store';
import CalendarDashboard from '../components/Calender';
import LabelDashboard from '../components/Labels';
import ReminderDashboard from '../components/Reminders';
import SettingsDashboard from '../components/Settings';
import TrashDashboard from '../components/Trash';
import SearchDashboard from '../components/Search';
import ReportsDashboard from '../components/Reports';
const drawerWidth = 240;

const menuItems = [
    { text: 'Tasks', link: '#tasks', icon: <AssignmentIcon />, component:<Provider store={store}><TaskDashboard /> </Provider> },
    { text: 'Calendar', link: '#calendar', icon: <EventIcon />, component: <Provider store={store}><CalendarDashboard/>  </Provider>  },
    { text: 'Labels', link: '#labels', icon: <LabelIcon />, component: <Provider store={store}><LabelDashboard/></Provider> },
    { text: 'Reminders', link: '#reminders', icon: <ReminderIcon />, component:  <Provider store={store}><ReminderDashboard/></Provider>},
    { text: 'Settings', link: '#settings', icon: <SettingsIcon />, component:<Provider store={store}><SettingsDashboard/></Provider> },
    { text: 'Reports', link: '#reports', icon: <BarChartIcon />, component: <Provider store={store}><ReportsDashboard/></Provider>},
    { text: 'Trash', link: '#trash', icon: <DeleteIcon />, component: <Provider store={store}><TrashDashboard/></Provider> },
    { text: 'Search', link: '#search', icon: <SearchIcon />, component:  <Provider store={store}><SearchDashboard/></Provider>},
    { text: 'Profile', link: '#profile', icon: <AccountCircleIcon />, component:    <Provider store={store}><Profile /> </Provider>},
    { text: 'Logout', link: '/login', icon: <ExitToAppIcon /> }, // Updated logout link
];

function Dashboard() {
    const [selectedItem, setSelectedItem] = useState(menuItems[0]);

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
        // Redirect only when the "Logout" item is clicked
        if (item.text === 'Logout') {
            // Redirect to the login page
            window.location.href = '/';
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                    },
                }}
            >
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem
                            key={index}
                            button
                            selected={selectedItem === item}
                            onClick={() => handleMenuItemClick(item)}
                            sx={{ '&.Mui-selected': { backgroundColor: '#e0e0e0' } }}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'subtitle1', fontWeight: 'bold' }} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main style={{ flexGrow: 1, padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Container maxWidth="md" sx={{ marginTop: '20px', textAlign: 'center' }}>
                    <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
                        Welcome to Your Dashboard
                    </Typography>

                    {selectedItem.component}
                </Container>
            </main>
        </div>
    );
}

export default Dashboard;
