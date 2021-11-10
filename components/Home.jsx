import Product from "./Product";
import {getAllProducts} from "../redux/slices/productSlices/productAPI";
import {useSelector, useDispatch} from "react-redux";
import {selectProducts} from "../redux/slices/productSlices/productSlice";
import {useEffect} from "react";
import {CgSpinner} from "react-icons/cg";

const Home = () => {
    const dispatch = useDispatch();
    const {loading, products} = useSelector(selectProducts);

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    if (loading === "loading") {
        return <div className={"grid h-[60vh] place-items-center"}>
            <CgSpinner className={"text-6xl animate-spin"} />
        </div>
    }

    return (
        <main className={"my-10 max-w-6xl mx-auto"}>
             <div className={"grid grid-cols-4 gap-5"}>
                {products.map((product, index) => <Product key={index} product={product} />)}
            </div>
        </main>
    );
};

export default Home;