import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory]=useState('')
    const [brand, setBrand]=useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        } else {
            if  (!product.name || product._id !== productId) {
               dispatch(listProductDetails(productId))
              } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setCategory(product.category)
                setBrand(product.brand)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
}, [dispatch, history, productId, product, successUpdate])
    
const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

    const submitHandler = (e) => {
        e.preventDefault()
       dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            brand,
            countInStock,
            description
        }))
    }


  return (

    <>
        <Link to='/admin/productlist' className='btn btn-light py-3'>
            Nazad
        </Link>

        <FormContainer>
        <h1>Promeni proizvod</h1>
        <br></br>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Naziv proizvoda:</Form.Label>
                <Form.Control
                    type='name'
                     placeholder='Upisi naziv'
                     value={name}
                     onChange={(e) => setName(e.target.value)}>     
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
                <Form.Label>Cena:</Form.Label>
                <Form.Control
                    type='number'
                     placeholder='Upisi cenu'
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}>     
                </Form.Control>
            </Form.Group>


            <Form.Group controlId='image'>
            <Form.Label>Fotografija:</Form.Label>
            <Form.Control
                type='text'
                placeholder='Kopiraj url slike'
                value={image}
                onChange={(e) => setImage(e.target.value)}>     
            </Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
            <Form.Label>Brend:</Form.Label>
            <Form.Control
                type='text'
                placeholder='Unesi brend'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}>     
            </Form.Control>
            </Form.Group>

           
            <Form.Group controlId='countInStock'>
                <Form.Label>Na stanju:</Form.Label>
                <Form.Control
                    type='number'
                     placeholder='Upisi broj na stanju'
                     value={countInStock}
                     onChange={(e) => setCountInStock(e.target.value)}>     
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
            <Form.Label>Kategorija:</Form.Label>
            <Form.Control
                type='text'
                placeholder='unesi kategoriju'
                value={category}
                onChange={(e) => setCategory(e.target.value)}>     
            </Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
            <Form.Label>Opis:</Form.Label>
            <Form.Control
                type='text'
                placeholder='Upisi opis proizvoda'
                value={description}
                onChange={(e) => setDescription(e.target.value)}>     
            </Form.Control>
            </Form.Group>



<br></br>
            <Button type='submit' variant='primary'>
                Promeni
            </Button>

        </Form>
        )}

        
    </FormContainer>
    </>
  )
}

export default ProductEditScreen
