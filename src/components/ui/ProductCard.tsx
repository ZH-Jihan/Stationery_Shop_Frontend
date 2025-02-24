/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDeleteProductMutation } from "@/redux/features/admin/productManagementApi";
import { useAppSelector } from "@/redux/hooks";
import { TProductResponse } from "@/types/productType";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { TUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

interface CardProps {
  p: TProductResponse;
}

const ProductCard: React.FC<CardProps> = ({ p }) => {
  const [openModal, setOpenModal] = useState(false);
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  const [deleteProduct] = useDeleteProductMutation();
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProduct(id).unwrap();
      if (res.success === true) {
        toast.success(res.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="w-full max-w-md space-y-4 rounded-lg bg-white  p-5 shadow-lg ">
      <div className="flex flex-col space-y-1.5">
        <h3 className="text-2xl font-semibold ">{p?.name}</h3>
        <p className="text-sm text-gray-500 dark:/60">
          {p?.description?.slice(0, 50)}...
        </p>
      </div>
      <img
        width={400}
        height={300}
        className="h-[200px] w-full rounded-lg bg-gray-600 object-cover"
        src={`${p?.image}`}
        alt="card navigate ui"
      />
      <div className="w-full flex  items-center justify-between md:gap-5 gap-10">
        <Link
          to={`/${(user as TUser)?.role}/update-product/${p?._id}`}
          className="w-full flex text-white items-center justify-center rounded-lg bg-black px-4 py-2 text-[12px] font-semibold  hover:bg-[#f7c788] sm:text-sm md:text-base"
        >
          Edit
        </Link>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full flex text-white items-center justify-center rounded-lg bg-black px-4 py-2 text-[12px] font-semibold  hover:bg-[#f7c788] sm:text-sm md:text-base"
        >
          Delete
        </button>
        {openModal && (
          <div
            onClick={() => setOpenModal(false)}
            className="fixed z-[100] flex items-center justify-center inset-0 bg-black/20 backdrop-blur-sm duration-100"
          >
            <div
              onClick={(e_) => e_.stopPropagation()}
              className="absolute w-80 rounded-lg bg-white p-6 text-center drop-shadow-2xl dark:bg-gray-800 dark:text-white opacity-100 transform duration-300"
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                  className="w-16 stroke-rose-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M12 7.75V13"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    opacity="0.4"
                    d="M12 16.2002V16.3002"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <h6 className="text-center text-sm font-medium opacity-70">
                  Are you sure? You want to delete this item
                </h6>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setOpenModal(false);
                      handleDelete(p?._id as string);
                    }}
                    className="rounded-md bg-indigo-600 px-6 py-2 text-sm text-white"
                  >
                    Yes Delete
                  </button>
                  <button
                    onClick={() => setOpenModal(false)}
                    className="rounded-md border border-rose-600 px-6 py-2 text-sm text-rose-600 hover:bg-rose-600 hover:text-white"
                  >
                    Not Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
