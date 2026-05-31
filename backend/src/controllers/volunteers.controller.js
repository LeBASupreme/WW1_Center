import pool from '../config/db.js';

export async function createVolunteer(req, res) {
    const { name, email, phone, availability } = req.body;
    const { rows } = await pool.query(
        `INSERT INTO volunteers (name, email, phone, availability)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, phone, availability]
    );
    res.status(201).json(rows[0]);
}

export async function getAllVolunteers(req, res) {
    const { rows } = await pool.query('SELECT * FROM volunteers ORDER BY created_at DESC');
    res.json(rows);
}

export async function updateVolunteer(req, res) {
    const { id } = req.params;
    const { name, email, phone, availability } = req.body;
    const { rows } = await pool.query(
        `UPDATE volunteers
         SET name=$1, email=$2, phone=$3, availability=$4
         WHERE id=$5 RETURNING *`,
        [name, email, phone, availability, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Volunteer introuvable' });
    res.json(rows[0]);
}

export async function updateVolunteerStatus(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }
    const { rows } = await pool.query(
        `UPDATE volunteers SET status=$1 WHERE id=$2 RETURNING *`,
        [status, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'Volunteer introuvable' });
    res.json(rows[0]);
}

export async function deleteVolunteer(req, res) {
    const { id } = req.params;
    await pool.query('DELETE FROM volunteers WHERE id = $1', [id]);
    res.json({ message: 'Volunteer supprimé' });
}
