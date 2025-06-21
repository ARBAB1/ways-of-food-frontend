import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../server";

const CreateDeals = () => {
  const { seller } = useSelector((state) => state.seller);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mealItems, setMealItems] = useState([
    { name: "", price: "", description: "", image: null },
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleMealImageChange = (e, index) => {
    const file = e.target.files[0];
    const updatedItems = [...mealItems];
    updatedItems[index].image = file;
    setMealItems(updatedItems);
  };

  const handleMealItemChange = (index, field, value) => {
    const updatedItems = [...mealItems];
    updatedItems[index][field] = value;
    setMealItems(updatedItems);

    // Recalculate total price whenever a price changes
    if (field === "price") {
      calculateTotalPrice(updatedItems);
    }
  };

  const calculateTotalPrice = (items) => {
    const total = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      return sum + price;
    }, 0);
    setTotalPrice(total);
  };

  const addMealItem = () => {
    setMealItems([
      ...mealItems,
      { name: "", price: "", description: "", image: null },
    ]);
  };

  const removeMealItem = (index) => {
    const updatedItems = [...mealItems];
    updatedItems.splice(index, 1);
    setMealItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newForm = new FormData();

    // Append deal details
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("shopId", seller._id);
    newForm.append("startDate", startDate);
    newForm.append("endDate", endDate);
    newForm.append("totalPrice", totalPrice);

    // Append meal items
    mealItems.forEach((item, index) => {
      newForm.append(`mealItems[${index}][name]`, item.name);
      newForm.append(`mealItems[${index}][price]`, item.price);
      newForm.append(`mealItems[${index}][description]`, item.description);
      if (item.image) {
        newForm.append(`mealItems[${index}][image]`, item.image);
      }
    });

    // Here you would typically send the form data to your backend
    console.log("Form data to be submitted:", {
      name,
      description,
      images,
      startDate,
      endDate,
      mealItems,
      totalPrice,
    });
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    axios
      .post(`${server}/deal/create-deal`, newForm, config)
      .then((res) => {
        console.log("save");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full pt-1 mt-10 bg-white card-box card-wrap">
      <h5 className="text-[30px] font-Poppins">Create Deal</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Deal Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your deal name..."
            required
          />
        </div>
        <br />
        <div>
          <label className="pb-2">
            Deal Description <span className="text-red-500">*</span>
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
            placeholder="Enter your deal description..."
          ></textarea>
        </div>
        <br />

        {/* Deal Period */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="pb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="startDate"
              value={startDate}
              className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="pb-2">
              End Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="endDate"
              value={endDate}
              className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <br />

        {/* Meal Items */}
        <div>
          <label className="pb-2">
            Meal Items <span className="text-red-500">*</span>
          </label>
          {mealItems.map((item, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg relative">
              <button
                type="button"
                onClick={() => removeMealItem(index)}
                className="absolute top-2 right-2 text-red-500"
                disabled={mealItems.length === 1}
              >
                <AiOutlineClose size={20} />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="pb-2">Item Name</label>
                  <input
                    type="text"
                    value={item.name}
                    className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) =>
                      handleMealItemChange(index, "name", e.target.value)
                    }
                    placeholder="Enter item name"
                    required
                  />
                </div>
                <div>
                  <label className="pb-2">Price</label>
                  <input
                    type="number"
                    value={item.price}
                    className="mt-2 appearance-none block w-full px-3 h-[50px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    onChange={(e) =>
                      handleMealItemChange(index, "price", e.target.value)
                    }
                    placeholder="Enter price"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="pb-2">Description</label>
                <textarea
                  value={item.description}
                  className="mt-2 appearance-none block w-full px-3 h-[100px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  onChange={(e) =>
                    handleMealItemChange(index, "description", e.target.value)
                  }
                  placeholder="Enter item description"
                  required
                />
              </div>

              <div className="mt-4">
                <label className="pb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleMealImageChange(e, index)}
                  className="mt-2 block w-full"
                  required={index === 0} // Only require image for first item or adjust as needed
                />
                {item.image && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(item.image)}
                      alt="Preview"
                      className="h-[100px] w-[100px] object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMealItem}
            className="flex items-center text-blue-500 mt-2"
          >
            <AiOutlinePlusCircle size={20} className="mr-1" />
            Add Another Meal Item
          </button>
        </div>
        <br />

        {/* Total Price */}
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold">
            Total Deal Price: ${totalPrice.toFixed(2)}
          </h3>
        </div>
        <br />

        {/* Deal Images */}
        <div>
          <label className="pb-2">
            Upload Deal Images <span className="text-red-500">*</span>
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
                images.map((i, index) => (
                  <div key={index} className="relative inline-block m-2">
                    <img
                      src={URL.createObjectURL(i)}
                      alt=""
                      className="h-[120px] w-[120px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = [...images];
                        newImages.splice(index, 1);
                        setImages(newImages);
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <AiOutlineClose size={12} />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <br />
        <div>
          <input
            type="submit"
            value="Create Deal"
            className="mt-2 add-btn cursor-pointer appearance-none text-center block px-3 h-[50px] border border-gray-300 rounded-[30px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateDeals;
