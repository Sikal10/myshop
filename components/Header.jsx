import Link from "next/link";
import {ShoppingCartIcon, UserIcon} from "@heroicons/react/solid";

const Header = () => {
    return (
        <header className={"bg-gray-800"}>
           <nav className={"justify-between flex items-center py-7 max-w-6xl mx-auto"}>
               {/*logo*/}
               <Link href={"/"}>
                   <h2 className={"font-semibold cursor-pointer text-lg text-white"}>MYSHOP</h2>
               </Link>

               <article className={"flex items-center space-x-3"}>
                   <Link href={"/cart"}>
                       <div className={"flex cursor-pointer space-x-1 items-center"}>
                           <ShoppingCartIcon className={"h-5 text-gray-300"}/>
                           <p className={"font-semibold font-serif text-xs text-gray-300"}>CART</p>
                       </div>
                   </Link>

                   <Link href={"/auth/signin"}>
                       <div className={"flex cursor-pointer space-x-1 items-center"}>
                           <UserIcon className={"h-5 text-gray-300"}/>
                           <p className={"font-semibold font-serif text-xs text-gray-300"}>SIGN IN</p>
                       </div>
                   </Link>
               </article>
           </nav>
        </header>
    );
};

export default Header;