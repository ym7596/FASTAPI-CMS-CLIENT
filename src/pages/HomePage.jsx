import * as React from 'react';

import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import TimelineIcon from '@mui/icons-material/Timeline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutPage from './LayoutPage';

import CategoryPage from './routepages/CategoryPage';
import DashboardPage from './routepages/DashboardPage';
import ItemPage from './routepages/ItemPage';

const NAVIGATION =[
    {
        kind: 'header',
        title: 'Main items'
    },
    {
        segment: '',
        title: 'DashBoard',
        icon: <DashboardIcon />,
    },
    {
        segment: 'categories',
        title: 'Categories',
        icon: <CategoryIcon />,
    },
    {
        segment: 'items',
        title: 'Items',
        icon: <TimelineIcon />,
    }
]

const theme = createTheme();

const HomePage = () => {
    return (
        <ThemeProvider theme = {theme}>
            <Router>
                <LayoutPage navigation={NAVIGATION}>
                    <Routes>
                        <Route path = '' element={<DashboardPage />} />
                        <Route path = 'categories' element={<CategoryPage />} />
                        <Route path = 'items' element={<ItemPage />} />

                    </Routes>
                </LayoutPage>
            </Router>
        </ThemeProvider>
    )
}

export default HomePage;