
import React, { useState, useEffect } from 'react';


import Data from '../jsonData/data.json';

import './index.css'

import SearchTable from '../searchTable';
import Table from '../tableui';




const HomePage = () => {

  // eslint-disable-next-line
  const [jsonData, setJsonDate] = useState(Data)
  const [jsonDataOne, setJsonDataOne] = useState(() => {
    const storedValue = localStorage.getItem('myData');

    return storedValue ? JSON.parse(storedValue) : jsonData
  })


  // for Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [finalModalOpen, setFinalModalOpen] = useState(false);

  // For return Model
  const [returnModel, setReturnModel] = useState(false);
  const [finalReturnModel, setFinalReturnModel] = useState(false);

  // calculate Date
  const [date1, setDate1] = useState('');
  const [date2, setDate2] = useState('');

  // For Search
  const [searchQuery, setSearchQuery] = useState('')

  // For Price Calculate
  const [productPrice, setProductPrice] = useState('');
  const [calculationPrice, setcalculationPrice] = useState('')
  const [productRent, setProductRent] = useState('');

  // for Ruturn Price Calculate
  const [returnCalculatePrice, setReturnCalculatePrise] = useState('')

  // Knowing parches Deatils
  const [perchacesDetails, setPerchacesDetails] = useState();

  // Booking product List
  const [productBookingList, setProductBookingList] = useState(() => {
    const storedList = localStorage.getItem('bookingProductList');
    return storedList ? JSON.parse(storedList) : [];
  })
  
  
  useEffect(() => {
    localStorage.setItem("myData", JSON.stringify(jsonDataOne));
  }, [jsonDataOne]);
  

  useEffect(() => {
    let curentDate = new Date();
  
    const interval = setInterval(() => {
      const newDate = new Date();
      if(   newDate.getDate() !== curentDate.getDate() ){

        const functionalData = JSON.parse(localStorage.getItem('myData'));
        const addingNumber = functionalData.map((element) => {
          if(element.type === 'meter'){
            
            return {...element, durability: element.durability-4, mileage:  element.mileage + 10}
          }else{
            return {...element , durability: element.durability-1, mileage: 0 };
          }
        })
        
        
        setJsonDataOne(addingNumber);
        localStorage.setItem('myData', JSON.stringify(addingNumber));
      }
      
    }, 60 * 60 * 24 * 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedName = event.target.options[event.target.selectedIndex].text;

    setProductPrice(selectedValue);
    setProductRent(selectedName);
  }

  const bookModal = () => {
    if(finalModalOpen === true || returnModel === true || finalReturnModel){
      setModalOpen(false)
    }
    else{
      setModalOpen(!modalOpen);
    }
  }
  

  const returnModal = () => {
    if(finalReturnModel === true || modalOpen === true || finalModalOpen === true){
      setReturnModel(false)

    }else{
      setReturnModel(!returnModel);
    }
  }

  const handleagreement = () => {
    setModalOpen(!modalOpen);
    setFinalModalOpen(!finalModalOpen);

    const toDate = new Date(date2);
    const fromDate = new Date(date1)

    const calculateDate = Math.abs(toDate - fromDate);
    const diffrenceDate = Math.floor(calculateDate / (1000 * 60 * 60 * 24));  
    
    const filter = jsonData.filter((element) => element.name === productRent);
    
    setPerchacesDetails(filter);
    setcalculationPrice(diffrenceDate * productPrice);

  }
  const handleFinalagreement = () => {
    setReturnModel(!returnModel);
    setFinalReturnModel(!finalReturnModel);

    const fullData =  JSON.parse(localStorage.getItem('bookingProductList'));
    const filteredFullData = fullData.filter((element) => element.productName === productRent)

    setReturnCalculatePrise(filteredFullData[0].prductPrice)
  }

    const handleSubmit = () => {
      setFinalModalOpen(!finalModalOpen);
      const recordStore = {
      productName: productRent,
      prductPrice: calculationPrice
      }

    handleAddItem(recordStore)
    
    localStorage.setItem('rentDetails', JSON.stringify(perchacesDetails));
  }


  const handleReturnSubmit = () => {
    setFinalReturnModel(!finalReturnModel);
  }

  function handleAddItem(newItem) {
    const newData = [...productBookingList, newItem];
    localStorage.setItem('bookingProductList', JSON.stringify(newData));
    setProductBookingList(newData);
  }


  const catchQuery = (query) => {
    setSearchQuery(query)
  } 

  const searchFunc = (data) => {
    return data.filter((item) => item.name.toLowerCase().includes(searchQuery))
  }

  return (  
    <div className=' section__padding container'>
      <div  style={modalOpen || finalModalOpen || returnModel || finalReturnModel ? {filter: 'blur(5px)'} : {filter : 'none'} }  className='table__section'>
        
        <div className='table__section-header'>
  
          <h1 className='background__text'>Welcome to Technical Project</h1>
          <SearchTable onCatchQuery={catchQuery} />
        </div>

        <Table data={searchFunc(jsonDataOne)} />

      </div>

          <div className='buttonSection'>
            <button className='btn-agree' onClick={bookModal}>Book</button>
            <button className='btn-primary' onClick={returnModal}>Return</button>
          </div>

          {modalOpen&& <div className='book_modal  scale-up-ver-center'>
            <h3>Book {productRent} Product</h3>
            <h5>This product price is {productPrice}</h5>
            <div className='book_modal-select'>
              <select onChange={handleChange}>
                <option value="">select a product for rent</option>
                {jsonData?.map((element) => {
                  return <option key={element.id}  value={element.price}>{element.name}</option>
                })}
              </select>
            </div>

            <div className='book_modal-input'>
              <div>
                <label htmlFor="date-label">From :</label><input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} />
              </div> 

              <div>
                <label htmlFor="date-label">To :</label><input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} />
              </div>
            </div>

            <div className='book_modal-button'>
                <button className='btn-agree' onClick={handleagreement}>Yes</button>
                <button className='btn-primary' onClick={() => setModalOpen(!modalOpen)}>No</button>
            </div>         
            </div>
          }


          {finalModalOpen && <div className='book_modal  scale-up-ver-center'>
            <h3>Book a Product</h3>
            <p>Your Estimated price is : {calculationPrice + '$'}</p>
            <p>Do you want to procedure?</p>
            <div className='book_modal-button'>
              <button className='btn-agree' onClick={handleSubmit} >Yes</button>
              <button className='btn-primary' onClick={() => setFinalModalOpen(!finalModalOpen)}>No</button>
            </div>
          </div>
          }


        {returnModel&& <div className='book_modal  scale-up-ver-center'>
            <h3>Book {productRent} Product</h3>
            <div className='book_modal-select'>
              <select onChange={handleChange}>
                <option value="">select a product for rent</option>
                {JSON.parse(localStorage.getItem('bookingProductList'))?.map((element, index) => {
                  return <option key={index}  value={element.productPrice}>{element.productName}</option>
                })}
              </select>
            </div>
                
            <div className='book_modal-button'>
                <button className='btn-agree' onClick={handleFinalagreement}>Yes</button>
                <button className='btn-primary' onClick={() => setReturnModel(!returnModel)}>No</button>
            </div>         
            </div>
          }

          {finalReturnModel && <div className='book_modal  scale-up-ver-center'>
            <h3>Book A Product</h3>
            <p>Your Estimated price is : {returnCalculatePrice + '$'}</p>
            <p>Do you want to procedure?</p>
            <div className='book_modal-button'>
              <button className='btn-agree' onClick={handleReturnSubmit} >Confirm</button>
            </div>
          </div>
          }
    </div>      
  );
}

export default HomePage
