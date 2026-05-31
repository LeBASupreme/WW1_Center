import pool from '../config/db.js';

export const getOrders = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT id, customer_name, customer_email, customer_address, product_name, total, status, created_at
             FROM orders
             ORDER BY created_at DESC
             LIMIT 50`
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};