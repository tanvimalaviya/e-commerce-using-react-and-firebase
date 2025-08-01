import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";
import { addTocart, deleteFromCart } from "../../redux/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const Category = () => {
  const { categoryname } = useParams();
  const context = useContext(MyContext);
  const { getAllProduct, Loading } = context;

  const navigate = useNavigate();

  //filter product

  const filterProduct = getAllProduct.filter((obj) =>
    obj.category.includes(categoryname)
  );

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addTocart(item));
    toast.success("add to cart");
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.success("delete from cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <div>
      <Layout>
        <div className="mt-10">
          <div className="">
            <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">
              {categoryname}
            </h1>
          </div>
          {Loading ? (
            <div className="flex justify-center">
              <Loader></Loader>
            </div>
          ) : (
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-5 mx-auto">
                <div className="flex justify-center">
                  {Loading && <Loader></Loader>}
                </div>
                <div className="flex flex-wrap -m-4 justify-center">
                  {filterProduct.length > 0 ? (
                    <>
                      {filterProduct.map((item, index) => {
                        const { id, title, price, productImageUrl } = item;
                        return (
                          <div key={index} className="p-4 w-full md:w-1/4">
                            <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                              <img
                                onClick={() => navigate(`/productinfo/${id}`)}
                                src={productImageUrl}
                                alt="img"
                                className="lg:h-80 h-96 w-full"
                              ></img>
                              <div className="p-6">
                                <h2 className="tracking-widset text-xs title-font font-medium text-gray-400 mb-1">
                                  E-bharat
                                </h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                  {title.substring(0, 25)}
                                </h1>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                  ₹{price}
                                </h1>
                                <div className="flex justify-center ">
                                  {cartItems?.some((p) => p.id === item.id) ? (
                                    <button
                                      onClick={() => deleteCart(item)}
                                      className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                    >
                                      Delete from cart
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => addCart(item)}
                                      className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                    >
                                      Add to cart
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <div>
                      <div className="flex justify-center">
                        <img
                          className=" mb-2"
                          src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                          alt=""
                        />
                      </div>
                      <h1 className=" text-black text-xl">
                        No {categoryname} product found
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Category;
