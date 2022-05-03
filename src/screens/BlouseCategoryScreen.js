import {React,useState,useEffect} from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import Allproducts from '../components/Allproducts'
import { listProducts} from '../actions/productActions'
const Blouse = () => {
    const productList = useSelector(state => state.productList)
	const {products} =productList
    const  dispatch = useDispatch()
    useEffect(()=>{
        dispatch(listProducts())
     },[dispatch])
    return ( 
        <div>
            <Allproducts products={products.filter((product)=> product.category==='Blouse')} title="Blouses"/>
        </div>
     );
}
export default Blouse;





