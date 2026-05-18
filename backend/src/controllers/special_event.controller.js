import pool from '../config/db.js';

export async function getAllSpecialEvents(req, res) {
    const { rows } = await pool.query(
        'SELECT * FROM special_events WHERE is_active = TRUE ORDER BY created_at DESC'
    );
    res.json(rows);
}

export async function createSpecialEvent(req, res) {
    const { title, description, event_date, location } = req.body;
    const { rows } = await pool.query(
        `INSERT INTO special_events (title, description, event_date, location)
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, description, event_date, location]
    );
    res.status(201).json(rows[0]);
}

export async function updateSpecialEvent(req, res) {
    const { id } = req.params;
    const { title , description, event_date, location, is_active } = req.body;
    const { rows } = await pool.query(
        `UPDATE special_events
            SET title=$1, description=$2, event_date=$3, location=$4, is_active=$5
            WHERE id=$6 RETURNING *`,
        [title, description, event_date, location, is_active, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Événement spécial introuvable' });
    res.json(rows[0]);
}

export async function deleteSpecialEvent(req, res) {
    const { id } = req.params;
    await pool.query('UPDATE special_events SET is_active = FALSE WHERE id = $1', [id]);
    res.json({ message: 'Événement spécial désactivé' });
}

