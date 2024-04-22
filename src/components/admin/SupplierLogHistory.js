//** Best as of march 17 12:53 new schema with brandname and updating stock of each product*/
import React, { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supplierlogHistory, clearErrors } from '../../actions/productActions';
import { SUPPLIER_HISTORY_RESET } from '../../constants/supplierLogsConstants';
import { viewAllUsers } from '../../actions/userActions';
import { getAllProducts } from '../../actions/productActions';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    Textarea
} from '@chakra-ui/react';
import MetaData from '../layout/MetaData';

const SupplierHistory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState('');
    const [productInfo, setProductInfo] = useState([]);
    const [invoiceId, setInvoiceId] = useState('');
    const [notes, setNotes] = useState('');
    const [dateDelivered, setDateDelivered] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const { loading, error, success } = useSelector((state) => state.supplierLog);
    const { users } = useSelector((state) => state.allUsers);
    const { products: allProducts } = useSelector((state) => state.allProducts);
    const { handleSubmit, formState: { errors } } = useForm();

    const successMsg = (message = "") =>
        toast.success(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    const notify = (error = "") =>
        toast.error(error, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        dispatch(viewAllUsers());
        dispatch(getAllProducts());
        if (error) {
            notify(error);
            dispatch(clearErrors());
        }
        if (success) {
            successMsg("Log Successfully");
            dispatch({ type: SUPPLIER_HISTORY_RESET });
            navigate('/profile');
        }
    }, [dispatch, error, success, navigate]);

    const handleProductChange = (productId, field, value) => {
        setProductInfo(prevState =>
            prevState.map(product =>
                product._id === productId ? { ...product, [field]: value } : product
            )
        );
    };

    const removeProduct = (productId) => {
        setProductInfo(prevState =>
            prevState.filter(product => product._id !== productId)
        );
    };

    const computeTotalPrice = () => {
        const totalPrice = productInfo.reduce((total, product) => {
            return total + (product.price * product.quantity);
        }, 0);
        setTotalPrice(totalPrice);
    };

    const submitHandler = async () => {
        const formData = {
            supplier,
            products: productInfo.map(product => ({
                productId: product._id,
                productName: product.name,
                brandName: product.brand.name,
                quantity: product.quantity,
                price: product.price,
            })),
            invoiceId,
            notes,
            dateDelivered,
            totalPrice,
        };
        dispatch(supplierlogHistory(formData));
    };


    return (
        <Fragment>
            <MetaData title={'Create brand'} />
            <Box p={4}>
                <h1>Log transaction</h1>
                <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                        <FormControl mb={4} flex="1" mr={4}>
                            <FormLabel htmlFor="supplier_field">Supplier</FormLabel>
                            <Select
                                id="supplier_field"
                                placeholder='Choose a Supplier...'
                                value={supplier}
                                onChange={(e) => setSupplier(e.target.value)}
                            >
                                {users.filter(user => user.role === 'supplier').map(supplierUser => (
                                    <option key={supplierUser._id} value={supplierUser._id}>{supplierUser.firstname}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl mb={4} flex="1" mr={4}>
                            <FormLabel htmlFor="dateDelivered_field">Date Delivered</FormLabel>
                            <Input
                                type="date"
                                id="dateDelivered_field"
                                value={dateDelivered}
                                onChange={(e) => setDateDelivered(e.target.value)}
                            />
                        </FormControl>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
                        <FormControl mb={4} flex="1" mr={4}>
                            <FormLabel htmlFor="invoiceId_field">Invoice ID</FormLabel>
                            <Input
                                type="text"
                                id="invoiceId_field"
                                value={invoiceId}
                                onChange={(e) => setInvoiceId(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mb={4} flex="1">
                            <FormLabel htmlFor="totalPrice_field">Total Price</FormLabel>
                            <Input
                                type="number"
                                id="totalPrice_field"
                                value={totalPrice}
                                readOnly
                            />
                        </FormControl>
                    </Box>
                    <FormControl mb={4} flex="1">
                        <FormLabel htmlFor="product_field">Choose Product</FormLabel>
                        <Select
                            id="product_field"
                            placeholder='Choose a product...'
                            onChange={(e) => {
                                const productId = e.target.value;
                                const selectedProduct = allProducts.find(product => product._id === productId);
                                if (selectedProduct) {
                                    setProductInfo(prevProductInfo => [
                                        ...prevProductInfo,
                                        { ...selectedProduct, quantity: 1, price: 0 }
                                    ]);
                                }
                            }}
                        >
                            {allProducts.map(product => (
                                <option key={product._id} value={product._id}>{product.name} ({product.brand.name})</option>
                            ))}
                        </Select>
                    </FormControl>
                    <Table variant="striped" colorScheme="gray" size="md">
                        <Thead>
                            <Tr>
                                <Th>Product Name</Th>
                                <Th>Brand</Th>
                                <Th>Price</Th>
                                <Th>Quantity</Th>
                                <Th>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {productInfo.map(product => (
                                <Tr key={product._id}>
                                    <Td>{product.name}</Td>
                                    <Td>{product.brand.name}</Td>
                                    <Td>
                                        <Input
                                            type="number"
                                            value={product.price || ''}
                                            onChange={(e) => handleProductChange(product._id, 'price', e.target.value)}
                                        />
                                    </Td>
                                    <Td>
                                        <Input
                                            type="number"
                                            value={product.quantity || ''}
                                            onChange={(e) => handleProductChange(product._id, 'quantity', e.target.value)}
                                        />
                                    </Td>
                                    <Td>
                                        <Button
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() => removeProduct(product._id)}
                                        >
                                            Remove
                                        </Button>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                    <FormControl mb={4} flex="1">
                        <FormLabel htmlFor="notes_field">Notes</FormLabel>
                        <Textarea
                            id="notes_field"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </FormControl>
                    <Box display="flex" justifyContent="space-between">
                        <Button
                            type="button"
                            onClick={computeTotalPrice}
                            colorScheme="teal"
                            mb={4}
                        >
                            Compute Total Price
                        </Button>
                        <Button type="submit" colorScheme="teal">Submit</Button>
                    </Box>
                </form>
            </Box>
        </Fragment>
    );

}

export default SupplierHistory;
