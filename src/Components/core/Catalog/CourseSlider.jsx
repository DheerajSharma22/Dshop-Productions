import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination } from 'swiper';
import COURSE_CARD from './Course_Card';

const CourseSlider = ({ courses }) => {
    if (!courses) return <div className='custom-loader'></div>;

    return (
        <div>
            {courses && courses.length === 0 ? <p>No Course Found</p> : (
                <Swiper
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },

                    }}>
                    {courses?.map((course) => {
                        return <SwiperSlide key={course?._id}>
                            <COURSE_CARD course={course} height={"220px"} />
                        </SwiperSlide>
                    })}
                </Swiper>
            )}
        </div>
    )
}

export default CourseSlider
