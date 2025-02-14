// Search.jsx
import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Phone, Filter } from 'lucide-react';
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  return (
    <div className="search-page">
      
      <div className="search-header">
            <SearchBar />
      </div>
    </div>
  );
};

export default SearchPage;