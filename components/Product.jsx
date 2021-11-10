import Link from "next/link";
import Rating from "./Rating";

const Product = ({product}) => {
    const {name, image, price, numReviews, _id, rating} = product;

    return (
        <Link href={`/products/${_id}`}>
            <section className={"border hover:shadow-md cursor-pointer border-gray-100 shadow-sm space-y-3 p-3"}>
                <img src={image} className={"w-[300px] h-[200px] object-cover object-center"} alt=""/>
                <p className={"text-gray-600 text-sm font-bold"}>{name}</p>
                <Rating value={rating} text={`${numReviews} reviews`} />
                <p className={"font-bold text-xl pb-4"}>${price}</p>
            </section>
        </Link>
    );
};

export default Product;