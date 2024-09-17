import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSuppliedDetails, clearErrors } from "../../actions/productActions";
import Loader from "../layout/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Table, Card } from "react-bootstrap"; // Import Bootstrap components

const SuppliedDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { error, loading, supplied: suppliedDetails } = useSelector((state) => state.suppliedDetails);

    const errMsg = (message = "") =>
        toast.error(message, {
            position: toast.POSITION.BOTTOM_CENTER,
        });

    useEffect(() => {
        dispatch(getSuppliedDetails(id));
        if (error) {
            errMsg(error);
            dispatch(clearErrors());
        }
    }, [dispatch, error, id, navigate]);

    if (loading || !suppliedDetails) {
        return <Loader />;
    }

    const totalPrice = suppliedDetails.products?.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0) || 0;

    return (
        <Container>
            <Fragment>
                <h2 className="my-4">Supplied Details</h2>
                <Card className="mb-4">
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Product Name</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {suppliedDetails.products?.map((product, index) => (
                                    <tr key={index}>
                                        <td>{product.productName}</td>
                                        <td>{product.brandName}</td>
                                        <td>₱ {product.price}</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
                <Row className="justify-content-end">
                    <Col sm={6} md={4} lg={3} className="text-end">
                        <h5>Grand Total: ₱ {totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}</h5>
                    </Col>
                </Row>
            </Fragment>
        </Container>
    );
}

export default SuppliedDetails;
