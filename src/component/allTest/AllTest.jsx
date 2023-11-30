import React, { useEffect, useState } from 'react';
import TestCart from './TestCart';

const ITEMS_PER_PAGE = 4; 

const AllTest = () => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://diagnostic-server-site.vercel.app/test')
      .then((res) => res.json())
      .then((data) => {
        const sortedTests = data.sort((a, b) => new Date(a.testDate) - new Date(b.testDate));
        setTests(sortedTests);
        setFilteredTests(sortedTests); // Initialize filteredTests with all tests
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchDate(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const trimmedSearchDate = searchDate.trim();

    // Filter tests based on the trimmed search date
    const filtered = tests.filter((test) => {
      const testDate = test.testDate.trim();

      // Convert testDate to the same format as the search date
      const [month, day, year] = testDate.split('/');
      const formattedTestDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

      return formattedTestDate === trimmedSearchDate;
    });

    setFilteredTests(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Pagination
  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const firstIndex = lastIndex - ITEMS_PER_PAGE;
  const currentTests = filteredTests.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredTests.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className='text-3xl mt-5 text-center'>All Test</h2>
      <form onSubmit={handleSearchSubmit}>
        <div className="my-4 mx-4">
          <label htmlFor="searchDate" className="block text-sm font-medium text-gray-700">
            Search by Date
          </label>
          <input
            type="date"
            id="searchDate"
            name="searchDate"
            value={searchDate}
            onChange={handleSearchChange}
            className="mt-1 p-2 border rounded-md"
          />
        </div>
        <div className="my-4 mx-4">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
            Search
          </button>
        </div>
      </form>
      <div className="px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-2 justify-items-center my-10">
        {currentTests.map((test) => (
          <TestCart test={test} key={test._id}></TestCart>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-2 px-4 py-2 border ${
              currentPage === index + 1 ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllTest;
