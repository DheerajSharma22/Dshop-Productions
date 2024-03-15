export default function GetAvgRating(ratingArr) {
    if (ratingArr.length === 0) return 0;
    const totalRatingCount = ratingArr.reduce((prev, curr) => prev += curr.rating, 0);
    const multiplier = Math.pow(10, 1);
    return Math.round((totalRatingCount / ratingArr?.length) * multiplier) / multiplier;
}