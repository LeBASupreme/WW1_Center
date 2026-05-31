import Stripe from 'stripe';
import pool from '../config/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
    const { amount, customerName, customerEmail, productName } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: customerEmail,
            shipping_address_collection: { allowed_countries: ['GB', 'FR'] },
            line_items: [{
                price_data: {
                    currency: 'gbp',
                    product_data: { name: productName || 'Shop Article' },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/shop`,
        });

        await pool.query(
            `INSERT INTO orders (customer_name, customer_email, product_name, total, stripe_session_id, status)
             VALUES ($1, $2, $3, $4, $5, 'PENDING')`,
            [customerName, customerEmail, productName, amount, session.id]
        );

        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
};

export const confirmOrder = async (req, res) => {
    const { sessionId } = req.body;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log('shipping_details:', JSON.stringify(session.shipping_details));
        console.log('shipping:', JSON.stringify(session.shipping));
        if (session.payment_status !== 'paid') {
            return res.status(400).json({ error: 'Payment not completed' });
        }

        const shipping = session.shipping_details?.address || session.shipping?.address;
        const address = shipping
            ? [shipping.line1, shipping.line2, shipping.city, shipping.postal_code, shipping.country]
                .filter(Boolean).join(', ')
            : null;

        await pool.query(
            `UPDATE orders SET status = 'PAID', customer_address = $1 WHERE stripe_session_id = $2`,
            [address, sessionId]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error confirming order:', error);
        res.status(500).json({ error: 'Failed to confirm order' });
    }
};

export const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.status(400).json({ error: `Webhook error: ${err.message}` });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const shipping = session.shipping_details?.address || session.shipping?.address;
        const address = shipping
            ? [shipping.line1, shipping.line2, shipping.city, shipping.postal_code, shipping.country]
                .filter(Boolean).join(', ')
            : null;

        await pool.query(
            `UPDATE orders SET status = 'PAID', customer_address = $1 WHERE stripe_session_id = $2`,
            [address, session.id]
        );
    }

    res.json({ received: true });
};

export const createDonation = async (req, res) => {
    const { amount } = req.body;
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'gbp',
                    product_data: { name: 'Donation — WW1 Remembrance Centre' },
                    unit_amount: Math.round(amount * 100),
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/donate/success`,
            cancel_url: `${process.env.FRONTEND_URL}/donate`,
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error('Error creating donation session:', error);
        res.status(500).json({ error: 'Failed to create donation session' });
    }
};
