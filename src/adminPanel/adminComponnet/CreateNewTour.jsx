import React, { useState } from "react";
import { createTour } from "../adminServices/adminApi";
import Logo from "../../assets/favicon.png";
import "./createTour.css";

const CreateNewTour = () => {
  const [formData, setFormData] = useState({
    name: "",
    duration: 1,
    maxGroupSize: 1,
    difficulty: "easy",
    price: 0,
    summary: "",
    ratingAverage: 4,
    imageCover: null,
    images: [],
    longitude: "",
    latitude: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // console.log("File input changed:", name, files);
      if (name === "images") {
        setFormData((prev) => ({
          ...prev,
          images: files,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: ["duration", "maxGroupSize", "price", "ratingAverage"].includes(
          name
        )
          ? Number(value)
          : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("summary", formData.summary);
    data.append("difficulty", formData.difficulty);
    data.append("duration", formData.duration);
    data.append("maxGroupSize", formData.maxGroupSize);
    data.append("price", formData.price);
    data.append("ratingAverage", formData.ratingAverage);

    if (formData.imageCover) {
      data.append("imageCover", formData.imageCover);
    }

    if (formData.images && formData.images.length > 0) {
      Array.from(formData.images).forEach((file) => {
        data.append("images", file);
      });
      console.log(formData.images);
    }

    // Add GeoJSON location
    const location = {
      type: "Point",
      coordinates: [
        parseFloat(formData.longitude),
        parseFloat(formData.latitude),
      ],
      address: "Sample location",
      description: "Starting point",
    };
    data.append("startLocation", JSON.stringify(location));

    const result = await createTour(data);
    if (result.success) {
      setMessage(" Tour created successfully!");
    } else {
      setMessage(` Error: ${result.message}`);
    }
  };

  return (
    <div className="create-tour-container">
      <h2 className="create-tour-title">
        <span className="title-icon">
          <img className="header-img" src={Logo} alt="icon" />
        </span>
        <span className="title-text">Create New Tour</span>
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <label className="input-label">Tour Name</label>

        <input
          name="name"
          placeholder="Tour Name"
          value={formData.name}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Tour Summary</label>
        <input
          name="summary"
          placeholder="Tour Summary"
          value={formData.summary}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Difficulty</label>
        <input
          name="difficulty"
          placeholder="Difficulty (easy, medium, difficult)"
          value={formData.difficulty}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Duration</label>
        <input
          name="duration"
          type="text"
          min={1}
          placeholder="Duration (in days)"
          value={formData.duration}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Max-GroupSize</label>
        <input
          name="maxGroupSize"
          type="text"
          min={1}
          placeholder="Max Group Size"
          value={formData.maxGroupSize}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Price</label>
        <input
          name="price"
          type="text"
          min={0}
          placeholder="Price ($)"
          value={formData.price}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Rating</label>
        <input
          name="ratingAverage"
          type="number"
          min={1}
          max={5}
          step="0.1"
          placeholder="Rating (1-5)"
          value={formData.ratingAverage}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Longitude</label>
        <input
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="create-tour-input"
          required
        />
        <label className="input-label">Latitude</label>
        <input
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="create-tour-input"
          required
        />

        <label className="create-tour-label">Cover Image</label>
        <input
          name="imageCover"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="create-tour-file-input"
          required
        />

        <label className="create-tour-label">
          Additional Images (multiple)
        </label>
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="create-tour-file-input"
        />

        <button type="submit" className="create-tour-submit-btn">
          Create Tour
        </button>
      </form>
      {message && <p className="">{message}</p>}
    </div>
  );
};

export default CreateNewTour;
