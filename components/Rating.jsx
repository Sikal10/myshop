import {BsStarFill, BsStar, BsStarHalf} from "react-icons/bs";

const Rating = ({value, text}) => {
    return (
        <div className={"flex items-center"}>
            <span>{value >= 1 ? <BsStarFill className={"text-[#f8e825]"}/> : value >= 0.5 ? <BsStarHalf className={"text-[#f8e825]"} /> : <BsStar className={"text-[#f8e825]"} /> }</span>
            <span>{value >= 2 ? <BsStarFill className={"text-[#f8e825]"}/> : value >= 1.5 ? <BsStarHalf className={"text-[#f8e825]"} /> : <BsStar className={"text-[#f8e825]"} /> }</span>
            <span>{value >= 3 ? <BsStarFill className={"text-[#f8e825]"}/> : value >= 2.5 ? <BsStarHalf className={"text-[#f8e825]"} /> : <BsStar className={"text-[#f8e825]"} /> }</span>
            <span>{value >= 4 ? <BsStarFill className={"text-[#f8e825]"}/> : value >= 3.5 ? <BsStarHalf className={"text-[#f8e825]"} /> : <BsStar className={"text-[#f8e825]"} /> }</span>
            <span>{value >= 5 ? <BsStarFill className={"text-[#f8e825]"}/> : value >= 4.5 ? <BsStarHalf className={"text-[#f8e825]"} /> : <BsStar className={"text-[#f8e825]"} /> }</span>
            <span className={"ml-3 text-sm text-gray-500 font-semibold"}>{text && text}</span>
        </div>
    );
};

export default Rating;