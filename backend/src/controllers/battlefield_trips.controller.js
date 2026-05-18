import pool from '../config/db.js';

export async function getAllTrips(req, res) {
    const { rows } = await pool.query(
        'SELECT * FROM battlefield_trips ORDER BY trip_date ASC'
    );
    res.json(rows);
}

export async function createTrip(req, res) {
    const { title, description, trip_date, max_capacity } = req.body;
    const { rows } = await pool.query(
        `INSERT INTO battlefield_trips (title, description, trip_date, max_capacity)
            VALUES ($1, $2, $3, $4) RETURNING *`,
        [title, description, trip_date, max_capacity]
    );
    res.status(201).json(rows[0]);
}

export async function updateTrip(req, res) {
    const { id } = req.params;
    const { title, description, trip_date, max_capacity } = req.body;
    const { rows } = await pool.query(
        `UPDATE battlefield_trips
            SET title=$1, description=$2, trip_date=$3, max_capacity=$4
            WHERE id=$5 RETURNING *`,
        [title, description, trip_date, max_capacity, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Trip introuvable' });
    res.json(rows[0]);
}

export async function deleteTrip(req, res) {
    const { id } = req.params;
    await pool.query('DELETE FROM battlefield_trips WHERE id = $1', [id]);
    res.json({ message: 'Trip supprimé' });
}

