'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import Navbar from '../components/navbar'

const OnboardingForm = () => {
    const { register, handleSubmit, setValue, watch } = useForm();
    const [data, setData] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const categories = ["Singer", "Dancer", "DJ", "Speaker"];
    const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
    const selectedCategories = watch("category") || [];
    const categoryDropdownRef = useRef(null);

    // Watch for file input changes
    const profileImage = watch("profileImage");

    useEffect(() => {
        if (profileImage && profileImage[0]) {
            const file = profileImage[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    }, [profileImage]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
                setCategoryDropdownOpen(false);
            }
        }
        if (categoryDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [categoryDropdownOpen]);

    const handleCategoryChange = (value) => {
        let newValues = Array.isArray(selectedCategories) ? [...selectedCategories] : [];
        if (newValues.includes(value)) {
            newValues = newValues.filter((v) => v !== value);
        } else {
            newValues.push(value);
        }
        setValue("category", newValues, { shouldValidate: true });
    };

    return (
        <div>
            <Navbar />
            <div className="mt-8 mb-6 flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-4">Register Yourself</h1>
                <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg space-y-4">
                    <input {...register("name", { required: true })} placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200" />

                    {/* Category Multi-Select Dropdown with Checkboxes */}
                    <div className="relative" ref={categoryDropdownRef}>
                        <div
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 cursor-pointer"
                            onClick={() => setCategoryDropdownOpen((open) => !open)}
                            tabIndex={0}

                        >
                            {selectedCategories.length > 0
                                ? categories.filter((cat) => selectedCategories.includes(cat)).join(", ")
                                : <span className="text-gray-400">Select category...</span>}
                        </div>
                        {categoryDropdownOpen && (
                            <div
                                className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                                {categories.map((cat) => (
                                    <label key={cat} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(cat)}
                                            onChange={() => handleCategoryChange(cat)}
                                            className="mr-2"
                                        />
                                        {cat}
                                    </label>
                                ))}
                            </div>
                        )}
                        <input type="hidden" {...register("category", { required: true })} />
                    </div>
                    {/* Fee Range Select */}
                    <select {...register("feeRange", { required: true })} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 bg-white">
                        <option value="">Select Fee Range (₹)</option>
                        <option value="5000 - 10,000">₹5000 - ₹10000</option>
                        <option value="10,000 - 15,000">₹10000 - ₹15000</option>
                        <option value="15,000 - 20,000">₹150000 - ₹20000</option>
                        <option value="20,000 - 30,000">₹20000 - ₹30000</option>
                        <option value="30,000+">₹30000+</option>
                    </select>
                    {/* Languages Spoken Checkboxes */}
                    <div className="space-y-2">
                        <label className="block font-medium">Languages Spoken:</label>
                        <div className="flex flex-wrap gap-4">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="Hindi" {...register("languagesSpoken")} /> Hindi
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="English" {...register("languagesSpoken")} /> English
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="Assamese" {...register("languagesSpoken")} /> Assamese
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="Tamil" {...register("languagesSpoken")} /> Tamil
                            </label>
                            <label className="flex items-center gap-2">
                                <input type="checkbox" value="Bengali" {...register("languagesSpoken")} /> Bengali
                            </label>
                        </div>
                    </div>

                    {/* Profile Image Upload */}
                    <div className="space-y-2">
                        <label className="block font-medium">Profile Image:</label>
                        <input type="file" accept="image/*" {...register("profileImage")} className="w-full" />
                        {imagePreview && (
                            <img src={imagePreview} alt="Profile Preview" className="mt-2 w-24 h-24 object-cover rounded-full border" />
                        )}
                    </div>
                    <textarea {...register("location", { required: true })} placeholder="Location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 min-h-24 resize-y" />
                    <p>{data}</p>
                    <input type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 cursor-pointer font-medium" />
                </form>
            </div>
        </div>

    )
}

export default OnboardingForm;       