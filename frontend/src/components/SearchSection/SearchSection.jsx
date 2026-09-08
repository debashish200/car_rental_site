import "./SearchSection.css";

function SearchSection() {
  return (
    <section className="search-section">

      <div className="search-container">

        <h2>Find Your Perfect Car</h2>
        <p>Choose your location and travel dates.</p>

        <form className="search-form">

          <div className="form-group">
            <label>Pickup Location</label>
            <input
              type="text"
              placeholder="Enter City"
            />
          </div>

          <div className="form-group">
            <label>Pickup Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Return Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Car Type</label>

            <select>

              <option>All Cars</option>
              <option>SUV</option>
              <option>Sedan</option>
              <option>Luxury</option>
              <option>Hatchback</option>

            </select>

          </div>

          <button type="submit">
            Search Cars
          </button>

        </form>

      </div>

    </section>
  );
}

export default SearchSection;