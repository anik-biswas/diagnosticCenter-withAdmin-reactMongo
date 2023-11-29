import React, { useEffect, useState } from 'react';
import TestCart from './TestCart';

const AllTest = () => {
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchDate, setSearchDate] = useState('');
  
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
        console.log('Trimmed Search Date:', trimmedSearchDate);
      
        // Filter tests based on the trimmed search date
        const filtered = tests.filter((test) => {
          const testDate = test.testDate.trim();
      
          // Convert testDate to the same format as the search date
          const [month, day, year] = testDate.split('/');
          const formattedTestDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
          const includes = formattedTestDate === trimmedSearchDate;
          console.log(`Formatted Test Date: ${formattedTestDate}, Includes: ${includes}`);
          return includes;
        });
      
        console.log('Filtered Tests:', filtered);
      
        setFilteredTests(filtered);
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
          {filteredTests.map((test) => (
            <TestCart test={test} key={test._id}></TestCart>
          ))}
        </div>
      </div>
    );
  };
  
export default AllTest;