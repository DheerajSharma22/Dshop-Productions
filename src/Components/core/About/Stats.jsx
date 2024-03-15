import React from 'react'

const statistics = [
    {
        title: "5K",
        desc: "Active Students",
    },
    {
        title: "10+",
        desc: "Mentors",
    },
    {
        title: "200+",
        desc: "Courses",
    },
    {
        title: "50+",
        desc: "Awards",
    }

];

const Stats = () => {
    return (
        <div className="bg-richblack-700 w-full py-14">
            <div className="w-11/12 max-w-maxContent mx-auto grid grid-cols-2 sm:grid-cols-4 gap-16">

                {statistics.map((stat, index) => (
                    <div className="text-center text-white" key={index}>
                        <h3 className="text-2xl lg:text-4xl font-bold mb-2">{stat.title}</h3>
                        <p className="text-lg text-richblack-300 font-semibold">{stat.desc}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Stats
