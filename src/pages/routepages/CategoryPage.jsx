import { Box,InputLabel, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, {useState} from 'react';
import { API } from '../../components/ProtocolManager';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, subcategoryState } from '../../recoil/atom';
import useFetchData from '../../components/FetchData';

const CategoryPage = () => {
    useFetchData();
    const categories = useRecoilValue(categoryState);
    const subcategories = useRecoilValue(subcategoryState);
    const setCategories = useSetRecoilState(categoryState);
    const setSubcategories = useSetRecoilState(subcategoryState);

    const [selectCategoryId, setSelectCategoryId] = useState(null);

    const [newSubcategory, setNewSubcategory] = useState({
        category_id: '',
        subcategory_name: '',
    });

    const [newCategory, setNewCategory] = useState({
        category_name: '',
    });

    const createSubcategory = async () =>{
        const subcategoryPacket ={
            category_id: selectCategoryId,
            subcategory_name: newSubcategory.subcategory_name,
        }
        try{
            const subcreated = await API.subcategories.create(subcategoryPacket);
            console.log(subcreated);

        }
        catch(error){
            console.error(error);
        }
    }

    const createCategory = async () => {
        console.log(newCategory.category_name);
        const categoryPacket = {
            name: newCategory.category_name
        };
        try{
            const created = await API.categories.create(categoryPacket);
            console.log(created);
        }
        catch(error){
            console.error(error);
        }
    }

    return(
        <Box sx={{p: 3}}>
            <h1>카테고리</h1>
            {/*카테고리 생성 폼*/}
            <Box sx={{ mb:6, display: 'flex', alignItems: 'center'}}>
                <TextField
                label="카테고리 이름"
                value={newCategory.category_name}
                onChange={(e) => setNewCategory({category_name: e.target.value})}
                sx ={{mr:2}}
                />
                <Button 
                variant='contained'
                onClick={createCategory}
                >카테고리 생성</Button>
            </Box>

            <Typography variant='h6' gutterBottom>카테고리 목록</Typography>
            {selectCategoryId && (
                <Typography color="primary" sx={{ mb :2 }}>
                    선택된 카테고리: {categories.find(cat => cat.category_id === 
                        selectCategoryId)?.name}
                        </Typography>
                    )}
            <Box sx={{mb:4, display: 'flex', alignItems:'center'}}>
                <Box sx={{width: '300px', mr:2}}>
                    <FormControl fullWidth>
                        <InputLabel id='category-select-label'>카테고리</InputLabel>
                        <Select
                        labelId='category-select-label'
                        value={selectCategoryId || ''}
                        onChange={(e) => setSelectCategoryId(e.target.value)}
                        label='카테고리'
                    >
                        {categories.map((category) => (
                            
                            <MenuItem key={category.category_id}
                            value={category.category_id}>
                                {category.name}
                            </MenuItem>
                        ))}

                    </Select>
                    </FormControl>
                </Box>

                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <TextField
                    label='서브카테고리 이름'
                    value={newSubcategory.subcategory_name}
                    onChange={(e) => setNewSubcategory({
                        ...newSubcategory,
                        subcategory_name: e.target.value
                    })}
                    sx = {{mr:2}}
                    disabled={!selectCategoryId}
                    />
                    <Button
                    variant='contained'
                    onClick={createSubcategory}
                    disabled={!selectCategoryId || !newSubcategory.subcategory_name.trim()}
                    >
                        서브카테고리생성
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default CategoryPage;