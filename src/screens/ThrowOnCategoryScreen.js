import {React,useState,useEffect} from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import Allproducts from '../components/Allproducts'
import { listProducts} from '../actions/productActions'
const ThrowOn = () => {
    const productList = useSelector(state => state.productList)
	const {products} =productList
    const  dispatch = useDispatch()
    useEffect(()=>{
        dispatch(listProducts())
     },[dispatch])
    return ( 
        <div>
            <Allproducts products={products.filter((product)=> product.category==='Throw-on')} title="Throw-ons"/>
        </div>
     );
}
export default ThrowOn;




