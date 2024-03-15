import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../Redux/Slices/courseSlice';
import { getFullCourseDetails } from '../../../../Services/operations/courseApi';

const EditCourse = () => {
    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullCourseDetails(courseId);
            if (result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result));
            }
            setLoading(false);
        }

        populateCourseDetails();
        // eslint-disable-next-line
    }, [])
    
    if (loading) return <div className='custom-loader'></div>;
    return (
        <div className="px-5 lg:px-14 py-3 text-white">
            <h1 className="text-3xl font-semibold mb-10">Edit Course</h1>

            <div>
                {
                    course ? <RenderSteps /> : <p className='text-center text-4xl'>Course Not Found</p>
                }
            </div>

        </div>
    )
}

export default EditCourse
