import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const VideoDetails = () => {
  const { courseEntireData, courseSectionData, completedLectures } = useSelector(state => state.viewCourse);
  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const videoPlayerRef = useRef();

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData || !courseSectionData.length) return;
      if (!courseId || !sectionId || !subSectionId) {
        navigate('/dashboard/enrolled-courses');
        return;
      }

      const filteredData = courseSectionData?.filter((section) => section?._id === sectionId);

      const filterVideoData = filteredData?.[0]?.SubSection?.filter(data => data?._id === subSectionId);

      setVideoData(filterVideoData?.[0]);
      setVideoEnded(false);
    }

    setVideoSpecificDetails();
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(data => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.SubSection?.findIndex(data => data._id === sectionId);

    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  }
  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData?.findIndex(data => data._id === sectionId);
    const currentSubSectionIndex = courseSectionData[currentSectionIndex]?.SubSection?.findIndex(data => data._id === sectionId);

    return currentSectionIndex === courseSectionData?.length - 1 && currentSubSectionIndex === courseSectionData[currentSectionIndex]?.SubSection?.length - 1;
  }
  const goToNextVideo = () => {

  }
  const goToPrevVideo = () => { }
  const handleLectureCompletion = () => { }
  
  return (
    <div>

    </div>
  )
}

export default VideoDetails
