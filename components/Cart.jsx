import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {addToCart} from "../redux/slices/cartSlices/cartAPI";
import {selectFromCart} from "../redux/slices/cartSlices/cartSlice";
import Link from "next/link";
import {MdDelete} from "react-icons/md";
import {removeFromCart} from "../redux/slices/cartSlices/cartAPI";

const Cart = () => {
    const router = useRouter();
    const qty = router.query.qty;
    const dispatch = useDispatch();
    const {cartItems} = useSelector(selectFromCart);

    useEffect(() => {
        if (!router.isReady) return;
        const id = router.query.cart[1];

        if (id) {
            dispatch(addToCart({id, qty}))
        }
    }, [dispatch, qty, router.isReady, router.query.cart]);

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    const checkoutHandler = async () => {
        console.log("checkout")
        await router.push("/login?redirect=shipping")

    }

    return (
        <main className={"mt-2 space-x-5 grid grid-cols-12"}>
            {/*product*/}
            <section className={"col-span-8"}>
                <h2 className={"text-3xl tracking-wider mt-5 font-serif font-medium text-gray-700"}>SHOPPING CART</h2>
                {cartItems.length === 0 ?
                    <h3 className={"font-semibold text-blue-500 text-base rounded-sm w-[70%] p-3 mt-3 bg-blue-100"}>
                        Your shopping cart is empty. <Link href={"/"}>
                        <button className={"ml-1 text-gray-900"}>Go Back</button>
                    </Link>
                    </h3> : <div className={"mt-7"}>
                        {cartItems.map((cartItem) => <div className={"my-2 grid grid-cols-12 space-x-2"}
                                                          key={cartItem.productId}>
                                <figure className={"col-span-2"}>
                                    <Link href={`/products/${cartItem.productId}`}>
                                        <img className={"h-16 cursor-pointer w-20 ml-5 object-cover rounded-lg"} src={cartItem.image} alt={cartItem.name}/>
                                    </Link>
                                </figure>

                                <div className={"col-span-3"}>
                                    <Link href={`/products/${cartItem.productId}`}>
                                        <p className={"text-base cursor-pointer font-semibold text-gray-600"}>{cartItem.name}</p>
                                    </Link>
                                </div>
                                <div className={"col-start-7 col-end-8 col-span-2"}>
                                    <p className={"text-base font-semibold text-gray-600"}>${cartItem.price}</p>
                                </div>
                                <div className={"col-span-2 col-start-9"}>
                                    <select className={"bg-gray-50 border-none outline-none px-2 w-[75px] h-[40px]"}
                                            onChange={e => dispatch(addToCart({
                                                id: cartItem.productId,
                                                qty: Number(e.target.value)
                                            }))}
                                            value={cartItem.qty}>
                                        {[...Array(cartItem.countInStock).keys()].map(p => <option key={p + 1}
                                                                                                   value={p + 1}>
                                                {p + 1}
                                            </option>
                                        )}</select>
                                </div>
                                <div className={"col-start-11"}>
                                        <MdDelete onClick={() => removeFromCartHandler(cartItem.productId)} className={"text-xl cursor-pointer mt-3 ml-3 text-gray-500"} />
                                    {/*remove-button*/}
                                </div>
                                <hr className={"col-span-full my-2"}/>
                            </div>
                        )}
                    </div>}
            </section>

            {/*checkout*/}
            <section className={"col-span-4 mt-2"}>
                <div className={"px-5 py-3 border border-gray-300"}>
                    <h2 className={"uppercase text-2xl font-medium tracking-wider text-gray-600 font-serif"}>Subtotal ({cartItems.reduce((total, currentItem) => total + currentItem.qty, 0)}) items</h2>
                    <p className={"text-gray-500 mt-2 font-medium text-lg"}>${cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.qty, 0).toFixed(2)}</p>
                </div>

                <div className={"border border-gray-300 px-7 py-3"}>
                    <button className={"uppercase block bg-gray-900 text-white w-full p-4"} disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to Checkout</button>
                </div>

            </section>
        </main>
    );
};

export default Cart;