const Razorpay = require('razorpay');
const crypto = require('crypto');
const instance = new Razorpay({
    key_id: 'rzp_test_fdUdrX0kEzotSX',
    key_secret: 'ewz65oKH0ydzcsKAnaqa4h1N',
});

exports.checkout = async (req, res) => {
    try {
        console.log("i am hit")
        const options = {
            amount: Number(req.body.amount * 100),
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        
        console.log(order);
        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error('Error in checkout:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong in checkout',
        });
    }
};

exports.paymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
            .update(body.toString())
            .digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {
            // Database logic comes here
            // await Payment.create({
            //     razorpay_order_id,
            //     razorpay_payment_id,
            //     razorpay_signature,
            // });

            res.redirect(
                `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
            );
        } else {
            res.status(400).json({
                success: false,
                message: 'Payment verification failed',
            });
        }
    } catch (error) {
        console.error('Error in payment verification:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong in payment verification',
        });
    }
};
