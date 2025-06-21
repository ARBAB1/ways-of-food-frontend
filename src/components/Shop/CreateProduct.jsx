import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";

const CreateProduct = () => {
    const { seller } = useSelector((state) => state.seller);
    const { success, error } = useSelector((state) => state.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [images, setImages] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredient, setIngredient] = useState("");
    const [heatinstruction, setHeatinstruction] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubtCategory] = useState("");
    const [tags, setTags] = useState("");
    
    const [categoriesData, setCategoryData] = useState([]);
    const [subcategoriesData, setSubCategoryData] = useState([]);
    // For size options (Small, Medium, Large)
    const [sizes, setSizes] = useState({
        small: { price: "", discountPrice: "", stock: "" },
        medium: { price: "", discountPrice: "", stock: "" },
        large: { price: "", discountPrice: "", stock: "" }
    });

    useEffect(() => {
        const get_category = async () => {
            try {
                const response = await axios.get(`${server}/category/admin-all-category`);
                if (response.data.success) {
                    // Filter active categories and subcategories
                    const activeCategories = response.data.category.filter(
                        category => category.status === "Active"
                    );
                
                    setCategoryData(activeCategories);
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        get_category();
    }, []);

    // When category changes, filter out the subcategories that are also active
    useEffect(() => {
        if (category) {
            const selectedCategory = categoriesData.find(
                (cat) => cat._id === category
            );
            // console.log(selectedCategory)
            if (selectedCategory) {
                const activeSubcategories = selectedCategory.subcategories.filter(
                    (subcat) => subcat.status === "Active"
                );
                
                setSubCategoryData(activeSubcategories);
                setSubtCategory(""); // Reset subcategory when category changes
            }
        }
    }, [categoriesData,category ]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (success) {
            toast.success("Product created successfully!");
            navigate("/dashboard");
            window.location.reload();
        }
    }, [dispatch, error, success]);

    const handleImageChange = (e) => {
        e.preventDefault();
        let files = Array.from(e.target.files);
        setImages((prevImages) => [...prevImages, ...files]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newForm = new FormData();
        images.forEach((image) => {
            newForm.append("images", image);
        });
        newForm.append("name", name);
        newForm.append("description", description);
        newForm.append("ingredient", ingredient);
        newForm.append("heatinstruction", heatinstruction);
        newForm.append("category", category);
        newForm.append("subcategory", subcategory);
        newForm.append("tags", tags);
       
        newForm.append("shopId", seller._id);
         // Append sizes array (Small, Medium, Large)
         newForm.append("sizes", JSON.stringify(sizes));
        // console.log(newForm)
        dispatch(createProduct(newForm));
    };



const handleSizeChange = (size, field, value) => {
    setSizes((prevSizes) => ({
        ...prevSizes,
        [size]: {
            ...prevSizes[size],
            [field]: value
        }
    }));
};


    return (
        <div className="w-full pt-1 mt-10 bg-white card-box card-wrap">
            <h5 className="text-[30px] font-Poppins">Create Product</h5>
            {/* create product form */}
            <form onSubmit={handleSubmit}>
                <br />
                <div>
                    <label className="pb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your product name..."
                        required
                    />
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={description}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Ingredient <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={ingredient}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setIngredient(e.target.value)}
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Heat Instructions <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        cols="30"
                        required
                        rows="8"
                        type="text"
                        name="description"
                        value={heatinstruction}
                        className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setHeatinstruction(e.target.value)}
                        placeholder="Enter your product description..."
                    ></textarea>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[50px] rounded-[5px]"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Choose a category</option>
                        {categoriesData &&
                            categoriesData.map((i) => (
                                <option value={i._id} key={i._id}>
                                    {i.categoryname}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">
                        Sub Category <span className="text-red-500">*</span>
                    </label>
                    <select
                        className="w-full mt-2 border h-[50px] rounded-[5px]"
                        value={subcategory}
                        onChange={(e) => setSubtCategory(e.target.value)}
                        disabled={!category}
                        required
                    >
                        <option value="">Choose a subcategory</option>
                        {subcategoriesData &&
                            subcategoriesData.map((i) => (
                                <option value={i._id} key={i._id}>
                                    {i.subcategoryname}
                                </option>
                            ))}
                    </select>
                </div>
                <br />
                <div>
                    <label className="pb-2">Tags</label>
                    <input
                        type="text"
                        name="tags"
                        required
                        value={tags}
                        className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Enter your product tags..."
                    />
                </div>
                <br />
                {/* price start */}
                <div className="sizes-p">
                <label className="pb-2">Select Sizes</label>
                    <div className="pro-sizes">
                        <div className="size-s">
                            <input
                                type="checkbox"
                                id="small"
                                
                                onChange={(e) => handleSizeChange('small', 'selected', e.target.checked)}
                            />
                            <label htmlFor="small">Small</label>
                            {sizes.small.selected && (
                                <div className="formbox">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        value={sizes.small.price}
                                        required
                                        onChange={(e) => handleSizeChange('small', 'price', e.target.value)}
                                    />
                                    <label>Discount Price</label>
                                    <input
                                        type="number"
                                        value={sizes.small.discountPrice}
                                        required
                                        onChange={(e) => handleSizeChange('small', 'discountPrice', e.target.value)}
                                    />
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        value={sizes.small.stock}
                                        required
                                        onChange={(e) => handleSizeChange('small', 'stock', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="size-s">
                            <input
                                type="checkbox"
                                id="medium"
                                onChange={(e) => handleSizeChange('medium', 'selected', e.target.checked)}
                            />
                            <label htmlFor="medium">Medium</label>
                            {sizes.medium.selected && (
                                <div className="formbox">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        value={sizes.medium.price}
                                        required
                                        onChange={(e) => handleSizeChange('medium', 'price', e.target.value)}
                                    />
                                    <label>Discount Price</label>
                                    <input
                                        type="number"
                                        value={sizes.medium.discountPrice}
                                        required
                                        onChange={(e) => handleSizeChange('medium', 'discountPrice', e.target.value)}
                                    />
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        value={sizes.medium.stock}
                                        required
                                        onChange={(e) => handleSizeChange('medium', 'stock', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="size-s">
                            <input
                                type="checkbox"
                                id="large"
                                onChange={(e) => handleSizeChange('large', 'selected', e.target.checked)}
                            />
                            <label htmlFor="large">Large</label>
                            {sizes.large.selected && (
                                <div className="formbox">
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        value={sizes.large.price}
                                        required
                                        onChange={(e) => handleSizeChange('large', 'price', e.target.value)}
                                    />
                                    <label>Discount Price</label>
                                    <input
                                        type="number"
                                        value={sizes.large.discountPrice}
                                        required
                                        onChange={(e) => handleSizeChange('large', 'discountPrice', e.target.value)}
                                    />
                                    <label>Stock</label>
                                    <input
                                        type="number"
                                        value={sizes.large.stock}
                                        required
                                        onChange={(e) => handleSizeChange('large', 'stock', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <br />
                    {/* price end */}
                <div>
                    <label className="pb-2">
                        Upload Images <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="file"
                        name=""
                        id="upload"
                        className="hidden"
                        multiple
                        onChange={handleImageChange}
                        required
                    />
                    <div className="w-full flex flex-wrap upload-item-img">
                        <label htmlFor="upload" className="upload-img">
                            <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
                        </label>
                        <div className="uploaded">
                        {images &&
                            images.map((i) => (
                                <img
                                    src={URL.createObjectURL(i)}
                                    key={i}
                                    alt=""
                                    className="h-[120px] w-[120px] object-cover m-2"
                                />
                            ))}
                        </div>
                    </div>
                    <br />
                    <div>
                        <input
                            type="submit"
                            value="Create Product"
                            className="mt-2 add-btn cursor-pointer appearance-none text-center block px-3 h-[50px] border border-gray-300 rounded-[30px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
