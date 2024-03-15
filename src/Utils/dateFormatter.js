export default function formattedDate(data) {
    return new Date(data).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}