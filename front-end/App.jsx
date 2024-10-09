import  { useEffect, useState } from "react";
import axios from "axios";

function App() {
const [product, setProduct] = useState([]);

  let setProducts=()=>{
    axios.get("https://dummyjson.com/products").then((data) => {
      console.log(data.data.products);
      setProduct(data.data.products);
      // setProduct(data?.data.data.products);
    });
  }
  let setCategory=()=>{
    axios.get("https://dummyjson.com/products").then((data) => {
      console.log(data.data.products);
      
      // setProduct(data?.data.data.products);
    });
  }
useEffect(() => {
    setProducts();
    setCategory();
  }
   , []);
  return (
    <>
     <div className=" max-w-[1320px] mx-auto">
        <h1 className=" text-center font-bold text-[40px] mb-[30px]">Our Products</h1>
        <div className="grid grid-cols-[30%_auto] gap-[20px]">
            <div className=" bg-slate-400">
                <h3 className='text-[25px] font-500 p-[10px]'>Product Category</h3>
                <ul>  
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>iPhone 9</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>
                    <li  className=' cursor-pointer p-[7px] bg-[#ccc] text-[20px] font-serif font-[500] mb-2'>item</li>

                </ul>
            </div>
            <div>
                  <div className="grid grid-cols-3 gap-5">

                {
                product.map((item,i)=>{
                  return( 
                  <div key={i} className=" shadow-lg text-center">
                  <img className=" h-[220px] w-[100%]" alt="" src={item.images[0]} />
                  <h4>{item.title}</h4>
                  <b> {item.price}</b>
                  </div>
                  )
                })}
                 
                     


                 
                     
                  </div>
            </div>


        </div>

        


     </div>    
    </>
  )
}

export default App