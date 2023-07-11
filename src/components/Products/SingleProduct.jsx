import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useGetProductQuery} from "../../features/api/apiSlice";
import {ROUTES} from "../../Utils/routes";
import Product from "./Product";
import Products from "./Products";
import {useDispatch, useSelector} from "react-redux";
import {getRelatedProducts} from "../../features/products/productsSlice";

const SingleProduct = () => {

    const {id} = useParams()
    const navigate = useNavigate()
    const {data, isLoading, isFetching, isSuccess} = useGetProductQuery({id})
    const {list, related} = useSelector( ({ products }) => products)
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.Home)
        }
    }, [isLoading, isFetching, isSuccess])

    useEffect(() => {
        if (!data || !list.length) return;

        dispatch(getRelatedProducts(data.category.id));
    }, [data, dispatch, list.length]);

    return !data ? (
        <section className="preloader">Loading...</section>
    ) : (
        <>
            <Product {...data} />
            <Products products={related} amount={5} title={"Related Products"}/>
        </>
    );
};

export default SingleProduct;