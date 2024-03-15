const instance  = require("../Config/razorpay");
const Course = require("../Models/Course");
const User = require("../Models/User");
const mailSender = require("../Utils/mailSender");
const crypto = require('crypto');

// Capture the payment and initiate the razorpay order
exports.capturePayment = async (req, res) => {
    try {
        const { courses } = req.body;
        const userId = req.user?.id;

        // Validate courses received
        if (!courses || courses.length === 0) return res.status(400).json({
            success: false,
            message: "Courses not received...",
        });

        // Count total amount
        let totalAmount = 0;

        for (const courseId of courses) {
            try {
                // Fetch course details.
                const course = await Course.findById(courseId);

                // validate course
                if (!course) return res.status(400).json({
                    success: false,
                    message: "Course not found " + courseId,
                });

                // Check if student is already enrolled.
                if (course.studentsEnrolled.includes(userId)) {
                    return res.status(400).json({
                        success: false,
                        message: "User is already enrolled in this course",
                    })
                }

                // Update total amount.
                totalAmount += course?.price;
            } catch (error) {
                return res.status(500).json({
                    success: false,
                    message: error,
                })
            }

        }

        // Create options for order
        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: Date.now().toString(),
        }


        // Create order
        const orderResponse = await instance.orders.create(options);


        // Send response
        return res.status(200).json({
            success: true,
            response: orderResponse,
            razorpay_key: process.env.RAZORPAY_KEY,
            message: "Order created successfully...",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        })
    }
}


const enrollStudent = async (userId, courses, res) => {
    try {
        for (const courseId of courses) {
            // Fetch every single course and update userId in enrolledStudents field
            const enrolledCourse = await Course.findByIdAndUpdate(courseId, {
                $push: { studentsEnrolled: userId },
            }, { new: true });


            // Validate
            if (!enrolledCourse) return res.status.json({
                success: false,
                message: "Failed to enroll student! course not found",
            });

            // Update user's courses field
            const enrolledStudent = await User.findByIdAndUpdate(userId, {
                $push: { courses: courseId },
            }, { new: true });

            // Send mail
            await mailSender(enrolledStudent?.email, `Congratulations! You're enrolled in the ${enrolledCourse?.courseName} course successfully...`, "Successfully enrolled");
        }
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: error.message,
        })
    }
}

exports.verifyPaymentSignature = async (req, res) => {
    try {
        const razorpay_order_id = req.body?.razorpay_order_id;
        const razorpay_payment_id = req.body?.razorpay_payment_id;
        const razorpay_signature = req.body?.razorpay_signature;
        const courses = req.body?.courses;
        const userId = req.user.id;

        // Validate
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) return res.status(400).json({
            success: false,
            message: "Could not make payment ! Something is missing",
        })

        // create body
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        // create expected signature
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

        // Verify signature
        if (expectedSignature === razorpay_signature) {
            // Enroll the student 
            enrollStudent(userId, courses, res);

            // Send response
            return res.status(200).json({
                success: true,
                message: "Payment Successfull",
            })
        }

        return res.status(400).json({
            success: false,
            message: "Payment Failed",
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.sendPaymentSuccessMail = async (req, res) => {
    try {
        const { orderId, paymentId, amount } = req.body;
        const userId = req.user.id;

        // Validate 
        if (!orderId || !paymentId || !amount || !userId) return res.status(400).json({
            success: false,
            message: "Failed to send mail!",
        });

        // Find the user details
        const userDetails = await User.findById(userId);

        // Send the mail
        await mailSender(userDetails.email, "Payment Received Successfully...", `
            <h1>Payment Received: ${amount / 100}</h1>
            <p>Order Id: ${orderId}</p>
            <p>Payment Id: ${paymentId}</p>
        `);

        return res.status(200).json({
            success: true,
            message: "Mail sended successfully..."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in send payment success mail " + error.message,
        })
    }
}