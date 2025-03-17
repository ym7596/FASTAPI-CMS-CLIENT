import { useEffect } from 'react';
import { useSetRecoilState} from 'recoil';
import { categoryState, subcategoryState, itemState } from '../recoil/atom';
import { API } from './ProtocolManager';

const useFetchData = () =>{
    const setCategories = useSetRecoilState(categoryState);
    const setSubcategories = useSetRecoilState(subcategoryState);
    const setItems = useSetRecoilState(itemState);

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const categoryResponse = await API.categories.getAll();

                const responseCategory = categoryResponse.map(item => ({
                    category_id: item.category_id,
                    name: item.category_name
                }))

                const responseSub = categoryResponse.flatMap(item =>
                    item.subcategories.map(sub =>({
                        subcategory_id: sub.subcategory_id,
                        subcategory_name: sub.subcategory_name,
                        parent_id: item.category_id,
                    }))
                );

                const itemResponse = await API.items.getAll();
                const responseItem = itemResponse.map(item => ({
                    item_id: item.item_id,
                    item_name: item.item_name,
                    category_id: item.category_id,
                    subcategory_id: item.subcategory_id,
                    brand: item.brand,
                    color: item.color,
                    options: item.options,
                    image: item.image,
                }))
                console.log(categoryResponse)
                console.log(itemResponse)
                setCategories(responseCategory);
                setSubcategories(responseSub);
                setItems(responseItem);
            }
            catch(error){
                console.log(error);
            }
        };

        fetchData();
  
    },[setCategories, setSubcategories, setItems]);
}

export default useFetchData;