import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { Button, Box, Drawer, AppBar, Toolbar, Typography, List, ListItem } from '@mui/material';


const drawerWidth = 240;

const LayoutPage = ({ navigation, children }) => {
    const navigate = useNavigate();

    return(
        <Box sx={{ display: 'flex'}}>
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Toolbar>
                    <Typography variant='h6'>
                        CMS PAGE
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink:0,
                    '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box'
                    }
                }}>
                <Toolbar />
                <Box sx= {{overflow: 'auto'}}>
                    <List>
                        {navigation.map((item) => (
                            item.kind==='header' ? (
                                <Typography key={item.title} variant='h6' sx={{ pl:2 , pt:2, color: 'text.secondary'}}>
                                    {item.title}
                                    </Typography>
                            ) : (
                                <ListItem
                                key={item.segment}
                                onClick={() => navigate(`/${item.segment}`)}
                                >
                                    <Button 
                                    fullWidth
                                    startIcon={item.icon}
                                    sx={{ justifyContent: 'flex-start'}}>
                                        {item.title}
                                    </Button>

                                </ListItem>
                            )
                        ))}
                    </List>
                </Box>
                </Drawer>
                <Box component="main" sx={{flexGrow:1, p:3, mt:8}}>
                    {children}
                </Box>
        </Box>
    );
}

export default LayoutPage;