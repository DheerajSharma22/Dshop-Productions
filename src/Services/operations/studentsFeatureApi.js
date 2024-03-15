import toast from 'react-hot-toast';
import { apiConnector } from '../apiconnector';
import { paymentEndPoints } from '../apis';
import rzpLogo from '../../assets/Logo/rzp_logo.png';
import { setPaymentLoading } from '../../Redux/Slices/courseSlice';

const loadRazorpayScript = async (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })
}

const sendPaymentSuccessEmail = async (response, amount) => {
    const toastId = toast.loading("Loading...");
    try {
        await apiConnector("POST", paymentEndPoints.SEND_PAYMENT_SUCCESS_MAIL_API, {
            amount,
            orderId: response?.razorpay_order_id, paymentId: response?.razorpay_payment_id
        });
        
    } catch (error) {
        console.log("error in sending payment success mail", error);
    }
    toast.dismiss(toastId);
}

const verifyPayment = async (response, navigate, dispatch) => { 
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    try {
        const res = await apiConnector("POST", paymentEndPoints.VERIFY_PAYMENT_API, response);
        if (!res.data.success) 
            throw new Error(res?.data?.message);

        toast.success("Payment Successfull");
        navigate("/dashboard/enrolled-courses");
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }

    dispatch(setPaymentLoading(true));
    toast.dismiss(toastId);
}

export const buyCourse = (courses, navigate, userDetails) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            // Load the script
            const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

            if (!res) {
                toast.error("Unable to load razorpay script");
                return;
            }

            // Create order by calling backend api
            const orderResponse = await apiConnector("POST", paymentEndPoints.CAPTURE_PAYMENT_API, { courses });

            if (!orderResponse.data.success)
                toast.error(orderResponse?.data?.message);

            // Create options for razorpay modal
            const options = {
                key: orderResponse.data.razorpay_key,
                amount: orderResponse.data.response.amount,
                currency: orderResponse.data.response.currency,
                name: "Study Notion",
                description: "Thank you for puchasing the course",
                image: rzpLogo,
                order_id: orderResponse.data.response.id,
                handler: async function (response) {
                    // Send Payment Success Mail
                    await sendPaymentSuccessEmail(response, orderResponse.data.response.amount);

                    // // Verify Payment
                    await verifyPayment({ ...response, courses }, navigate, dispatch);
                },
                prefill: {
                    name: userDetails?.firstName + " " + userDetails?.lastName,
                    email: userDetails?.email,
                },
                theme: {
                    color: "#3399cc"
                }
            }

            const razorpay = window.Razorpay(options);
            razorpay.open();
            razorpay.on("payment.failed", () => {
                toast.error("Error Payment Failed")
            })

        } catch (error) {
            console.log(error.response);
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}