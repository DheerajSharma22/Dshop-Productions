import React from 'react'
import ReactStars from "react-rating-stars-component";
import { FaTrash } from "react-icons/fa";

const CartCard = ({ item }) => {
    return (
        <div className="flex justify-between gap-5 sm:flex-nowrap flex-wrap">
            <div className="flex items-start gap-3 xl:flex-row flex-col">
                <img
                    src={item.img}
                    alt=""
                    className="rounded-md w-[250px] h-[130px] object-cover"
                />
                <div className="flex flex-col gap-1">
                    <p className="text-lg font-semibold">{item.title}</p>
                    <p className="text-richblack-300">{item.category}</p>
                    <div className="flex items-center gap-3">
                        <p>{item.ratings}</p>
                        <div className='z-0'>
                            <ReactStars
                                count={5}
                                value={item.ratings}
                                edit={false}
                                isHalf={true}
                                size={24}
                                activeColor="#ffd700"
                            />
                        </div>
                        <p>{item.reviewCount}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5">
                <button className="bg-richblack-800 text-pink-300 flex items-center gap-1 px-6 py-3 rounded-md">
                    <FaTrash />
                    Remove
                </button>
                <p className="text-2xl text-yellow-50">
                    Rs. {item.price.toLocaleString()}
                </p>
            </div>
        </div>
    )
}

export default CartCard
