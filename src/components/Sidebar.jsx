import React, { useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { IoMdArrowForward } from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import CartItem from "./CartItem";
import { CartContext } from "../contexts/CartContext";
import { useState } from "react";

const Sidebar = () => {
  const [checkout, setCheckout] = useState(false);

  const { isOpen, setIsOpen, handleClose } = useContext(SidebarContext);

  const { cart, clearCart, total, itemAmount } = useContext(CartContext);

  const onSubmitOrder = () => {
    clearCart();
    setCheckout(true);
    setTimeout(() => {
      setCheckout(false);
    }, 2000);
  };

  return (
    <div
      className={`${
        isOpen ? "right-0 overflow-y-auto" : "-right-full"
      } w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div className="uppercase text-sm font-semibold">
          Shopping Bag ({itemAmount})
        </div>
        <div
          onClick={handleClose}
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 overflow-x-hidden border-b">
        {cart.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="flex flex-col gap-y-3 py-4 mt-4">
        <div className="w-full flex justify-between items-center">
          {/* total price of all items */}
          <div className="uppercase font-semibold">
            <span className="mr-2">Total:</span>$ {parseFloat(total).toFixed(2)}
          </div>
          <div
            onClick={() => clearCart()}
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          disabled={!total}
          onClick={onSubmitOrder}
          className="bg-primary flex p-4 justify-center items-center text-white w-full font-medium"
        >
          Checkout
        </button>
        {checkout ? (
          <h2 className="text-center">Thank you for your order.</h2>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Sidebar;
