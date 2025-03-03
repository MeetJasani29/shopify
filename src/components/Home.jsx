

import React from 'react'
import './Home.css'
import hero from '../assets/images/hero.webp';
import { RiRefund2Line } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { MdSupportAgent } from "react-icons/md";
import { RiDiscountPercentLine } from "react-icons/ri";
import Product from './product';

function Home() {
    return (
        <>
            <div className='hero d-flex flex-column justify-content-center mt-5'>
                <div className='container '>
                    <div className="row ">
                        <div className="col-12 col-lg-6 py-5 ">
                            <div className='banner-left-side'>
                                <p className='fw-bold fs-5'>Starting At $999</p>
                                <h2 className=''>The best notebook collection 2024</h2>
                                <h4>Exclusive offer <span className='text-danger'>-10%</span> off this week</h4>
                                <button type='button bg-white'  > Shop Now</button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 py-5">
                            <div className='hero-img'>
                                <img src={hero} alt="hero-image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='services container'>
                <div className="row ">
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className='services-conten  d-flex '>
                            <span><TbTruckDelivery /></span>
                            <div >
                                <h2>Free Delivery</h2>
                                <p className='text-light-emphasis'>Orders from all items</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className='services-conten  d-flex'>
                            <span><RiRefund2Line /></span>
                            <div >
                                <h2>Return & Refund</h2>
                                <p className='text-light-emphasis'>Money back guarantee</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className='services-conten  d-flex'>
                            <span><RiDiscountPercentLine /></span>
                            <div >
                                <h2>Member Discount</h2>
                                <p className='text-light-emphasis'>On order over $99</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div className='services-conten  d-flex'>
                            <span><MdSupportAgent /></span>
                            <div >
                                <h2>Support 24/7</h2>
                                <p className='text-light-emphasis'>Contact us 24 hours a day</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Product />
        </>
    )
}

export default Home
