import pool from '../config/db.js';


export async function getAllProducts(req, res) {
  const { rows } = await pool.query(
    'SELECT * FROM products WHERE is_active = TRUE ORDER BY created_at DESC'
  );
  res.json(rows);
}

export async function createProduct(req, res) {
  const { name, description, price, stock, image_url } = req.body;
  const { rows } = await pool.query(
    `INSERT INTO products (name, description, price, stock, image_url)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, description, price, stock, image_url]
  );
  res.status(201).json(rows[0]);
}

export async function updateProduct(req, res) {
  const { id } = req.params;
  const { name, description, price, stock, image_url, is_active } = req.body;
  const { rows } = await pool.query(
    `UPDATE products
     SET name=$1, description=$2, price=$3, stock=$4, image_url=$5, is_active=$6
     WHERE id=$7 RETURNING *`,
    [name, description, price, stock, image_url, is_active, id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'Produit introuvable' });
  res.json(rows[0]);
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  await pool.query('UPDATE products SET is_active = FALSE WHERE id = $1', [id]);
  res.json({ message: 'Produit désactivé' });
}
