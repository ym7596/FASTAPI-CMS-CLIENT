import React ,{useEffect, useState} from 'react';
import { API } from '../../components/ProtocolManager';
import useFetchData from '../../components/FetchData';

import { categoryState, subcategoryState, itemState } from '../../recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, FormControl, InputLabel, Select, MenuItem} from '@mui/material';

const DashboardPage = () => {
    useFetchData();

    const categories = useRecoilValue(categoryState);
    const subcategories = useRecoilValue(subcategoryState);
    const items = useRecoilValue(itemState);

    const setItems = useSetRecoilState(itemState);

    const [filteredItems, setFilteredItems] = useState(items);
    const [selectedCategoryId, setSelectedCategoryId] = useState('전체');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('전체');

    useEffect(() => {
        setFilteredItems(items);
    },[items]);

    const deleteItem = async (id) => {
        try {
            const response = await API.items.delete(id);
            console.log(response);
            setItems(items.filter(i => i.item_id !== id));
            setFilteredItems(filteredItems.filter(i => i.item_id !== id));
        }
        catch(error){
            console.error(error);
        }
    };

    const handleSubcategoryChange = (e) => {
        console.log(e.target.value);
        const subcategoryId = e.target.value;
        setSelectedSubcategoryId(subcategoryId);

        if(subcategoryId=='전체'){}
        else{
            const firstFilter = items.filter(i => i.category_id === selectedCategoryId);
            const filterSubItems = firstFilter.filter(i => i.subcategory_id === subcategoryId);
            setFilteredItems(filterSubItems);
        }
    };

    const filterCategory = (e) =>{
        const categoryId = e.target.value;
        setSelectedCategoryId(categoryId);
        if(categoryId==='전체'){
            setFilteredItems(items);
            setSelectedSubcategoryId('전체');
        }
        else{
            const filterItems = items.filter(i => i.category_id === categoryId);
            setFilteredItems(filterItems);
            setSelectedSubcategoryId('전체');
        }
    };

    return(
        <Box sx = {{margin: '0 auto', maxWidth: '1100px', padding: '40px'}}>
            <Typography variant='h4' gutterBottom>DashBoard</Typography>
            <FormControl fullWidth sx = {{mb:2}}>
                <InputLabel>카테고리</InputLabel>
                <Select
                labelId='category-select-label'
                value={selectedCategoryId}
                onChange={filterCategory}
                >
                    <MenuItem value='전체'>전체</MenuItem>
                    {categories.map(category => (
                        <MenuItem 
                        key={category.category_id} 
                        value={category.category_id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{mb:2}}>
                <InputLabel id="subcategory-select-label">서브카테고리</InputLabel>
                <Select
                labelId="subcategory-select-label"
                value={selectedSubcategoryId}
                onChange={handleSubcategoryChange}
                >
                    <MenuItem value='전체'>전체</MenuItem>
                    {subcategories.filter(sub => sub.parent_id === 
                    selectedCategoryId).
                    map((subcategory) => (
                        <MenuItem key={subcategory.subcategory_id}
                        value = {subcategory.subcategory_id}
                        >
                            {subcategory.subcategory_name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell >이미지</TableCell>
                            <TableCell >대분류</TableCell>
                            <TableCell >중분류</TableCell>
                            <TableCell >이름</TableCell>
                            <TableCell >브랜드</TableCell>
                            <TableCell >색상</TableCell>
                            <TableCell >옵션</TableCell>
                            <TableCell >작업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((item) => (
                            <TableRow key={item.item_id}>
                                <TableCell>
                                    <img src = {`${import.meta.env.VITE_AWS_ENDPOINT}${item.image}`} 
                                
                                    style={{width:64,height:64, objectFit:'cover'}}/>
                                </TableCell>
                                <TableCell>
                                    {categories.find(cat => cat.category_id === item.category_id)?.name}
                                </TableCell>
                                <TableCell>
                                    {subcategories.find(sub => sub.subcategory_id === item.subcategory_id)?.subcategory_name}
                                </TableCell>
                                <TableCell>{item.item_name}</TableCell>
                                <TableCell>{item.brand}</TableCell>
                                <TableCell>{item.color}</TableCell>
                                <TableCell>
                                    {item.options.map((option, index) => (
                                        <div key={index}>{`${option.key}: ${option.value}`}</div>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => deleteItem(item.item_id)}
                                    sx ={{boxShadow:3,
                                        '&:hover': {
                                            boxShadow: 6,
                                        }
                                    }}
                                        >
                                        삭제</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default DashboardPage;