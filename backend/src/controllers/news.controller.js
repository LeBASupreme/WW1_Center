import pool from '../config/db.js';


export async function getAllNews(req, res) {
    const { rows } = await pool.query(
        'SELECT * FROM news ORDER BY created_at DESC'
    );
    res.json(rows);
}

export async function createNews(req, res) {
    const { title, content, image_url } = req.body;
    const { rows } = await pool.query(
        `INSERT INTO news (title, content, image_url)
         VALUES ($1, $2, $3) RETURNING *`,
        [title, content, image_url || null]
    );
    res.status(201).json(rows[0]);
}

export async function updateNews(req, res) {
    const { id } = req.params;
    const { title, content, image_url } = req.body;
    const { rows } = await pool.query(
        `UPDATE news
            SET title=$1, content=$2, image_url=$3
            WHERE id=$4 RETURNING *`,
        [title, content, image_url || null, id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'News introuvable' });
    res.json(rows[0]);
}

export async function deleteNews(req, res) {
    const { id } = req.params;
    await pool.query('DELETE FROM news WHERE id = $1', [id]);
    res.json({ message: 'News supprimé' });
}