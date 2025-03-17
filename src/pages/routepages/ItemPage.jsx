import React , {useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { categoryState,subcategoryState } from '../../recoil/atom';
import { useRecoilValue } from 'recoil';

import useFetchData from '../../components/FetchData';

import { API } from '../../components/ProtocolManager';
import ImageUpload from '../../components/ImageUpload';


const ItemPage = () => {
    useFetchData();
   
    const categories = useRecoilValue(categoryState);
    const subcategories = useRecoilValue(subcategoryState);

    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState('');

    const [itemName, setItemName] = useState('');
    const [brand, setBrand] = useState('');
    const [color, setColor] = useState('');
    const [options, setOptions] = useState([{key: '', value: ''}]);
    const [image, setImage] = useState('');

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;

        setSelectedCategoryId(categoryId);
        const filter = subcategories.filter(subcategory => subcategory.parent_id === categoryId);
        setFilteredSubcategories(filter);
        setSelectedSubcategoryId('');
    };

    const handleSubcategoryChange = (e) => {
        setSelectedSubcategoryId(e.target.value);
    }

    const handleOptionChange = (index, key, value) => {
        const newOptions = [...options];
        newOptions[index][key] =value;
        setOptions(newOptions);
    };

    const addOption = () => {
        console.log('Option added');
        setOptions([...options, {key: '', value: ''}]);
    }

    const handleImageUpload = (url) =>{
        setImage(url);
    }

    const handleSubmit = async () => {

        console.log('Item submitted');
        const itemPacket = {
            category_id: selectedCategoryId,
            subcategory_id: selectedSubcategoryId,
            item_name: itemName,
            brand: brand,
            color: color,
            options: options.filter(option => option.key && option.value),
            image: image,
        }

        try{
            const res =  await API.items.create(itemPacket);
            console.log('Item created:', res);
            init();
        }
        catch(error){
            console.error('Error:', error);
        }

    }

    const init = () => {
        setSelectedCategoryId('');
        setSelectedSubcategoryId('');
        setItemName('');
        setBrand('');
        setColor('');
        setOptions([{key: '', value: ''}]);
        setImage('');
    }

    return (
        <Box sx = {{p: 3}}>
            <Typography variant ="h4">Item Page</Typography>

            <FormControl fullWidth sx ={{mb:2, mt:2}}>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategoryId}
                    label="Category"
                    onChange={handleCategoryChange}>
                        {categories.map((category) => (
                            <MenuItem key={category.category_id} value={category.category_id}>
                                {category.name}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <FormControl  fullWidth sx={{mb:2}}>
                    <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                    <Select
                        labelId="subcategory-select-label"
                        id="subcategory-select"
                        value={selectedSubcategoryId}
                        label="Subcategory"
                        onChange={handleSubcategoryChange}>
                            {filteredSubcategories.map((subcategory) => (
                                <MenuItem key={subcategory.subcategory_id} value={subcategory.subcategory_id}>
                                    {subcategory.subcategory_name}
                                </MenuItem>
                            ))}
                        </Select>
            </FormControl>
            <TextField
            label ="아이템 이름"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            sx ={{mb:2}}
            disabled={!selectedSubcategoryId}
            />
            <TextField
            label ="브랜드"
            value={brand}
            onChange={(e) =>setBrand(e.target.value)}
            fullWidth
            sx ={{mb:2}}
            disabled={!selectedSubcategoryId}
            />
            <TextField
            label ="색상"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            fullWidth
            sx ={{mb:2}}
            disabled={!selectedSubcategoryId}
            />
            {options.map((option, index) => (
                <Box key = {index} sx ={{display: 'flex',mb:2}}>
                    <TextField
                    label="옵션키"
                    value={option.key}
                    onChange={(e) => handleOptionChange(index, 'key', e.target.value)}
                    sx ={{mr:2}}
                    disabled={!selectedSubcategoryId}
                    />
                    <TextField
                    label="옵션값"
                    value={option.value}
                    onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                    disabled={!selectedSubcategoryId}
                    />
                </Box>
            ))}
            <Button onClick={addOption} disabled={!selectedSubcategoryId}>옵션 추가</Button>
            <ImageUpload onUpload={handleImageUpload}/>
            <Button variant='contained'
            sx = {{mt:2}}
            onClick={ handleSubmit}
            disabled={!selectedSubcategoryId || !itemName || !brand || !color}>
                 아이템 생성
            </Button>
        </Box>
    );
    
}

export default ItemPage;