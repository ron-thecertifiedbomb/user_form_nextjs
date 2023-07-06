import React, { useState, useRef } from "react";


interface AddProductForm {
  dispatch: React.Dispatch<any>;
}

const AddProductForm: React.FC<AddProductForm> = ({ dispatch }) => {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemPhoto, setItemPhoto] = useState<File | null>(null); // File object for the selected photo
  const [priceError, setPriceError] = useState("");
  const [quantityError, setQuantityError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const priceValue = parseFloat(itemPrice);
    const quantityValue = parseInt(itemQuantity);

    if (isNaN(priceValue)) {
      setPriceError("Please enter a valid numeric value for price.");
      return;
    } else {
      setPriceError("");
    }

    if (isNaN(quantityValue)) {
      setQuantityError("Please enter a valid numeric value for quantity.");
      return;
    } else {
      setQuantityError("");
    }

    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("price", itemPrice);
    formData.append("quantity", itemQuantity);
    formData.append("photo", itemPhoto || "");

    try {
      const response = await fetch("http://localhost:3001/api/mycart", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const addedItem = await response.json();

        // Dispatch an action to update the state with the added item
        dispatch({ type: "ADD_TO_CART", payload: addedItem });

        setItemName("");
        setItemPrice("");
        setItemQuantity("");
        setItemPhoto(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }

      const updatedResponse = await fetch("http://localhost:3001/api/mycart");
      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        dispatch({ type: "FETCH_CART_ITEMS", payload: updatedData });
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Network/server error:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Item Name:</label>
        <input
          type="text"
          id="name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="price">Item Price:</label>
        <input
          type="text"
          id="price"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
        />
        {priceError && <p className="error">{priceError}</p>}
      </div>
      <div>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        {quantityError && <p className="error">{quantityError}</p>}
      </div>
      <div>
        <label htmlFor="photo">Select Photo:</label>
        <input
          type="file"
          id="photo"
          onChange={(e) => setItemPhoto(e.target.files?.[0] || null)}
          ref={fileInputRef}
        />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
