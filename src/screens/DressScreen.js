import {React,useState,useEffect} from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import Allproducts from '../components/Allproducts'
import { listProducts} from '../actions/productActions'
const Dresses = () => {
    const productList = useSelector(state => state.productList)
	const {products} =productList
    const  dispatch = useDispatch()
    
     useEffect(()=>{
         dispatch(listProducts())
      },[dispatch])
    return ( 
        <div>  
             <Allproducts products={products.filter((product)=> product.category==='Dress')} title="Dresses"/>
        </div>
     );
}
export default Dresses;