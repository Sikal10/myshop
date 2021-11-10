import {useRouter} from "next/router";
import Link from "next/link";
import Rating from "./Rating";
import {useEffect, useState} from "react";
import {getAProduct} from "../redux/slices/productSlices/productAPI";
import {useSelector, useDispatch} from "react-redux";
import {selectProducts} from "../redux/slices/productSlices/productSlice";
import {CgSpinner} from "react-icons/cg";

const SpecificProduct = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const id = router.query.id;

    const {loading, product} = useSelector(selectProducts);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        if (!router.isReady) return;
        
        dispatch(getAProduct(id));
    }, [dispatch, id, router.isReady]);

    if (loading === "loading") {
        return <div className={"grid h-[60vh] place-items-center"}>
            <CgSpinner className={"text-6xl animate-spin"}/>
        </div>
    }

    const addToCartHandler = async () => {
        await router.push(`/cart/${id}?qty=${qty}`);
    }

    return (
        <>
            {loading === "loaded" &&
                <section>
                    <Link href={"/"}>
                        <button className={"mt-7 hover:bg-gray-800 hover:text-white px-3 py-2 rounded-md"}>Go back
                        </button>
                    </Link>

                    <div className={"grid grid-cols-12 mt-14"}>
                        <img className={"col-span-6 w-[90%] object-cover object-center h-[400px]"} src={product.image}
                             alt=""/>
                        <div className={"col-span-3 px-4 pt-7 space-y-3"}>
                            <h2 className={"text-2xl font-bold text-gray-500"}>{product.name}</h2>
                            <hr/>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                            <hr/>
                            <p className={"text-gray-600 font-semibold"}>Price: <span
                                className={"text-[16px]"}>${product.price}</span></p>
                            <hr/>
                            <p className={"text-gray-600 font-semibold text-sm"}>Description: {product.description}</p>
                        </div>

                        <article className={"col-span-3 col-start-10 "}>
                            <div className={"border space-y-3 py-3"}>
                                <p className={"text-gray-600 space-x-7 font-semibold px-5"}><span>Price:</span> <span
                                    className={"text-[16px]"}>${product.price}</span></p>
                                <hr/>
                                <p className={"text-gray-600 space-x-7 font-semibold px-5"}><span>Status:</span>
                                    <span>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</span></p>
                                <hr/>

                                {product.countInStock > 0 && <div className={"text-gray-600 space-x-7 font-semibold px-5"}><span>Quantity:</span>
                                    <select className={"border px-3 py-1 outline-none"} onChange={e => setQty(e.target.value)} value={qty}>{[...Array(product.countInStock).keys()].map(p =>
                                        <option key={p+1} value={p+1}>
                                        {p+1}
                                    </option>)}</select>
                                </div> }

                                <hr/>
                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className={"disabled:opacity-50 disabled:cursor-default block bg-gray-800 w-[85%] mx-auto text-white px-5 py-3"}>
                                    Add To Cart
                                </button>
                            </div>
                        </article>
                    </div>
                </section>
            }
        </>
    );
};

export default SpecificProduct;