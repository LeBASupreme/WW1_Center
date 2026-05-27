
INSERT INTO users (name, email, password_hash, role) VALUES
  ('Admin',   'admin@admin.com',        '$2b$10$RPU7AHvjVjLrnLubmVHhKec1Wi3vkop7hT.6JvZORpb1XkwimYpjG', 'SUPER_ADMIN'),
  ('Charles', 'charles@ww1centre.org', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SUPER_ADMIN'),
  ('Sarah',   'sarah@ww1centre.org',   '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'VOLUNTEER');

INSERT INTO time_slots (slot_date) VALUES
  ('2026-05-14'),
  ('2026-05-17'),
  ('2026-05-19'),
  ('2026-05-20'),
  ('2026-05-21'),
  ('2026-05-24');

INSERT INTO products (name, description, price, stock, image_url) VALUES
  ('WW1 Postcard Set',       'Set of 6 historical postcards from the Western Front',  4.99,  50, '/images/postcard-set.jpg'),
  ('Remembrance Pin',        'Enamel pin with WW1 poppy design',                       2.50, 100, '/images/pin.jpg'),
  ('History Book',           '"The Great War — Portsmouth''s Story", 120 pages',       12.99,  20, '/images/book.jpg'),
  ('Ceramic Mug',            'WW1 Centre branded mug with commemorative artwork',      8.99,  30, '/images/mug.jpg'),
  ('Tote Bag',               'Canvas tote bag with WW1 Centre logo',                   6.99,  40, '/images/tote.jpg'),
  ('Commemorative Medal',    'Replica service medal in presentation box',             15.99,  15, '/images/medal.jpg');
