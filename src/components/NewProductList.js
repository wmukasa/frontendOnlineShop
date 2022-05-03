import {React,useState,useEffect} from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import NewProducts from '../components/NewProducts'
import { listProducts} from '../actions/productActions'
import  Paginate from '../components/Paginate'
const NewproductList = () => {
    const productList = useSelector(state => state.productList)
	const {error, loading,products,page,pages} =productList
    const  dispatch = useDispatch()
    
     useEffect(()=>{
         dispatch(listProducts())
      },[dispatch])
    return ( 
        <div>  
             <NewProducts products={products.filter((product)=> product.brand==='New')} title="Dresses"/>
        </div>
     );
} 
export default NewproductList;