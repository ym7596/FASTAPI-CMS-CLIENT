class ItemModel {
    constructor() {
        this.category_id = '';
        this.subcategory_id = '';
        this.item_name = '';
        this.brand = '';
        this.color = '';
        this.options = [{key: '', value: ''}];
        this.image = '';
    }

    setCategoryId(category_id) {
        this.category_id = category_id;
    }

    setSubcategoryId(subcategory_id){
        this.subcategory_id = subcategory_id;
    }
    
    setName(name) {
        this.item_name = name;
    }

    setBrand(brand) {
        this.brand = brand;
    }

    setColor(color) {
        this.color = color;
    }

    setOptions(options) {
        this.options = options;
    }

    addOption(){
        this.options.push({key: '', value: ''});
    }

    setImage(url) {
        this.image = url;
    }

    reset() {
        this.category_id = '';
        this.subcategory_id = '';
        this.item_name = '';
        this.brand = '';
        this.color = '';
        this.options = [{key: '', value: ''}];
        this.image = '';
    }

}

export default ItemModel;