import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
const image_hosting_api = `https://api.imgbb.com/1/upload?key=83a471512dcffa8098e5f1e4afd247df`;
const itemsPerPage = 4; 
const ManageTest = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [tests,setTests]= useState([]);
    
    const [selectedTest, setSelectedTest] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect ( () => {
        fetch('http://localhost:5000/dashboard/test')
        .then (res => res.json())
        .then(data =>setTests(data))
        
    },[])
    useEffect(() => {
        fetchTests();
      }, []); 
    const fetchTests = () => {
        fetch('http://localhost:5000/dashboard/test')
          .then(res => res.json())
          .then(data => setTests(data))
          .catch(error => console.error('Error fetching banners:', error));
      };
      const [testDate, setTestDate] = useState(null);
      const [currentPage, setCurrentPage] = useState(0);

    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const displayedTests = tests.slice(indexOfFirstItem, indexOfLastItem);

    const pageCount = Math.ceil(tests.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
      console.log("select")
        setCurrentPage(selected);
    };
    //setTests(displayedTests)
      const openModal = (user) => {
        console.log(user)
        setTestDate(null)
        setSelectedTest(user);
        
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setSelectedTest(null);
        setIsModalOpen(false);
      };

      const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Delete Test won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/dashboard/test/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Coffee has been deleted.',
                                'success'
                            )
                            const remainingTests = tests.filter(test=> test._id !== id);
                            setTests(remainingTests);
                    
                        }
                    })

            }
        })
    }
    
    const handleUpdateTest = async (e) => {
        try {
            e.preventDefault();
    
            const form = new FormData(e.currentTarget);
            const name = form.get('name');
            const description = form.get('description');
            const price = form.get('price');
            const slot = form.get('slot');
            const testDate = form.get('testDate');
            const imageFile = form.get('testImg');
    
            let imageUrl = selectedTest?.testImg; 
    
            if (imageFile && imageFile.size > 0) {
                const imgbbFormData = new FormData();
                imgbbFormData.append('image', imageFile);
                
                const imgbbRes = await fetch(image_hosting_api, {
                    method: 'POST',
                    body: imgbbFormData,
                });
    
                if (!imgbbRes.ok) {
                    throw new Error('Image upload failed');
                }
    
                const imgbbData = await imgbbRes.json();
                imageUrl = imgbbData.data.url;
            }
    
            const updateTest = { name, description, testDate, price, slot, testImg: imageUrl };
    
            const response = await fetch(`http://localhost:5000/dashboard/test/${selectedTest._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(updateTest),
            });
    
            if (!response.ok) {
                throw new Error('Test update failed');
            }
    
            const data = await response.json();
    
            if (data.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Test Updated Successfully',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
                closeModal()
                // navigate(location?.state?.from || '/dashboard/manageTest');
                // window.location.reload();
                const updatedTest= await fetch(`http://localhost:5000/test`);
                const updatedTestData = await updatedTest.json();

            setTests(updatedTestData);

            } else {
                console.log('No update');
            }
        } catch (error) {
            console.error('Error updating test:', error);
            // Handle the error (show a message to the user, etc.)
        }
    };
    
    return (
        <div>
        
        <div className='overflow-x-auto justify-center items-center text-center px-5 md:px-10 lg:px-20'>
        {isModalOpen && selectedTest && (
            <div className="fixed inset-0 z-50 overflow-auto bg-[#CBE4E9]   bg-opacity-50 flex">
            <div className="relative p-4 max-w-xl m-auto bg-[#CBE4E9] w-full">
            <div className=" md:p-4 lg:p-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            <h2 className="text-xl mb-3 md:text-2xl lg:text-2xl font-extrabold">
              Update Test
            </h2>

            <p className="text-right">
              <button className="text-center text-lg bg-red-400 w-6 h-6" onClick={closeModal}>x</button>
            </p>
          </div>
           <form onSubmit={handleUpdateTest} >
         
            <div className="md:flex  mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Test Title</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="name"
                    defaultValue={selectedTest?.name} 
                    
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Slots</span>
                </label>
                <label className="input-group">
                <input
                    type="text"
                    name="slot"
                    defaultValue={selectedTest?.slot} 
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
            </div>
            
            <div className="md:flex mb-4 lg:mb-8">
              <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="price"
                    defaultValue={selectedTest?.price} 
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
                <label className="label">
                  <span className="label-text">Date</span>
                </label>
                <label className="input-group">
                <DatePicker
                selected={testDate || (selectedTest && new Date(selectedTest.testDate))}
                onChange={(date) => {
                    console.log(date);
                    setTestDate(date);
                }}
                placeholderText="Select a date"
                name="testDate"
                className="input input-bordered w-full"
                required
                />
                </label>
              </div>
            </div>
            <div className="md:flex  mb-4 lg:mb-8">
            <div className="form-control md:w-full lg:w-1/2">
                <label className="label">
                  <span className="label-text">DescripTion</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="description"
                    defaultValue={selectedTest?.description} 
                    className="input input-bordered w-full"
                    required
                  />
                </label>
              </div>
              <div className="form-control md:w-full lg:w-1/2 ml-0 lg:ml-4 mt-4 lg:mt-0">
            <label className="label">
                <span className="label-text">Test Image</span>
            </label>
            <label className="input-group grid grid-cols-2">
                
                <input
                type="file"
                name="testImg"
                className="input input-bordered w-full"
                
                />
                {selectedTest && selectedTest.testImg && (
                <img src={selectedTest.testImg} alt="Current Test Image" className="w-12 h-16 mb-2" />
                )}
                
            </label>
            </div>
            </div>
            
            <input type="submit" value="Update Test" className="btn btn-block" />
            
          </form> 
        </div>
            
        </div>
        </div>

          )}  
            <table className="table">
                        
                        <thead>
                            <tr className="text-center">
                                <th></th>
                                <th className="text-red-400">Title</th>
                                <th className="text-red-400">Description </th>
                                <th className="text-red-400">Price</th>
                                <th className="text-red-400">Slots</th>
                                <th className="text-red-400">Image</th>
                                <th className="text-red-400">Test Date</th>
                                <th className="text-red-400">action</th>
                                <th className="text-red-400">Delete</th>
                            </tr>
                        </thead>
                        
                        <tbody>
                            {tests.map((test, index) => (
                                <tr className="text-center" key={test._id}>
                                    <td>{index + 1}</td>
                                    <td className="text-xs">{test.name}</td>
                                    <td className="text-justify">
                                    {test.description.length > 20
                                        ? `${test.description.slice(0, 20)}...`
                                        : test.description}
                                    </td>
                                    <td>{test.price}</td>
                                    <td>{test.slot}</td>
                                    <td><img src={test.testImg} alt=""  className="w-14 h-14"/></td>
                                    <td>
                                    {test.testDate}
                                    </td>
                                    <td><button onClick={() => openModal(test)} >Edit</button></td>
                                    <td>
                                    <FaTrash  onClick={() => handleDelete(test._id)}  className="text-red-500"></FaTrash>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
                   
        </div>
        </div>
    );
};

export default ManageTest;