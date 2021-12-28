import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listProductDetails,updateProduct} from '../actions/productActions'
import {PRODUCT_UPDATE_RESET} from '../constants/productConstants'
function ProductEditScreen({match,history}) {
  //lets get our product id
    const productId = match.params.id 

    //we set the two sets
    const [name,setName] = useState('')
    const [price,setPrice] = useState(0)
    const [image,setImage] = useState('')
    const [brand,setBrand] = useState('')
    const [category,setCategory] = useState('')
    const [countInStock,setCountInStock] = useState(0)
    const [description,setDescription] = useState('')
    const [uploading,setUploading] =useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    //we want to destructure that
    const {error,loading,product} = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const {error:errorUpdate,loading:loadingUpdate,success:successUpdate} = productUpdate
    //here we want to get our updated user
    // const userUpdate = useSelector(state => state.userUpdate)
    // const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate

    useEffect(() => {

            if(successUpdate){
                dispatch({type:PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            }else{
                if (!product.name || product._id !== Number(productId)) {
                    dispatch(listProductDetails(productId))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setBrand(product.brand)
                    setCategory(product.category)
                    setCountInStock(product.countInStock)
                    setDescription(product.description)
    
                }

            }

    }, [dispatch,product, productId, history,successUpdate])
    const submitHandler =(e) =>{
        e.preventDefault()
        //console.log('Submitted')
        dispatch(updateProduct({
            _id:productId,
            name,
            price,
            image,
            brand,
            category,
            countInStock,
            description
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('product_id', productId)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/products/upload/', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            setUploading(false)
        }
    }
    return (
        <div>
            <Link to='/admin/productlist'> Go Back</Link>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader/>}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader/> :error ?<Message variant='danger'>{error}</Message> 
                :(
                    <Form onSubmit={submitHandler}
                    >
                        <Form.Group controlid='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)} 
                            >
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlid='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                            type='Number'
                            placeholder='Enter Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)} 
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlid='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter Image'
                            value={image}
                            onChange={(e) => setImage(e.target.value)} 
                            >
                            </Form.Control>
                            <div>
                            <input type="file" onChange={uploadFileHandler}/>
                            </div>
                            {loading && <Loader/>}
                        </Form.Group>
                        <Form.Group controlid='brand'>
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter Brand'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)} 
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlid='category'>
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)} 
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlid='countinstock'>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                            type='number'
                            placeholder='Enter Stock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)} 
                            >
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlid='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                            type='text'
                            placeholder='Enter Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} 
                            >
                            </Form.Control>
                        </Form.Group>
                        

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}

        </FormContainer>
    </div>
    )
}

export default ProductEditScreen
