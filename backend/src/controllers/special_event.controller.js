import pool from '../config/db.js';

export async function getAllSpecialEvents(req, res) {
    const { rows } = await pool.query(
        'SELECT * FROM special_events WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    res.json(rows);
}

export async function createSpecialEvent(req, res) {
    const { title, description, event_date, location, image_url } = req.body;
    const { rows } = await pool.query(
        `INSERT INTO special_events (title, description, event_date, location, image_url)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, description, event_date, location, image_url || null]
    );
    res.status(201).json(rows[0]);
}

export async function updateSpecialEvent(req, res) {
    const { id } = req.params;
    const { title, description, event_date, location, image_url, is_active } = req.body;
    const { rows } = await pool.query(
        `UPDATE special_events
            SET title=$1, description=$2, event_date=$3, location=$4, image_url=$5, is_active=$6
            WHERE id=$7 RETURNING *`,
        [title, description, event_date, location, image_url || null, is_active, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Événement spécial introuvable' });
    res.json(rows[0]);
}

export async function deleteSpecialEvent(req, res) {
    const { id } = req.params;
    await pool.query('UPDATE special_events SET is_active = FALSE WHERE id = $1', [id]);
    res.json({ message: 'Événement spécial désactivé' });
}

