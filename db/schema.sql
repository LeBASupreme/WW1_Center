-- WW1 Remembrance Centre — Database Schema

-- Admin users
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('SUPER_ADMIN', 'VOLUNTEER')),
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS time_slots (
  id                SERIAL PRIMARY KEY,
  slot_date         DATE NOT NULL UNIQUE,
  max_capacity      INT NOT NULL DEFAULT 25,
  is_outreach       BOOLEAN NOT NULL DEFAULT FALSE,
  outreach_location TEXT,
  is_cancelled      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS school_groups (
  id            SERIAL PRIMARY KEY,
  school_name   TEXT NOT NULL,
  contact_name  TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  contact_phone TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bookings (
  id              SERIAL PRIMARY KEY,
  slot_id         INT NOT NULL REFERENCES time_slots(id) ON DELETE CASCADE,
  visitor_name    TEXT NOT NULL,
  visitor_email   TEXT NOT NULL,
  visitor_count   INT NOT NULL DEFAULT 1 CHECK (visitor_count >= 1),
  qr_code         TEXT UNIQUE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'CONFIRMED'
                    CHECK (status IN ('CONFIRMED', 'CANCELLED', 'CHECKED_IN')),
  school_group_id INT REFERENCES school_groups(id),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS special_events (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT,
  event_date  DATE NOT NULL,
  location    TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Souvenir shop
CREATE TABLE IF NOT EXISTS products (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC(8,2) NOT NULL CHECK (price >= 0),
  stock       INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
  image_url   TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id             SERIAL PRIMARY KEY,
  customer_name  TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total          NUMERIC(8,2) NOT NULL,
  status         TEXT NOT NULL DEFAULT 'PENDING'
                   CHECK (status IN ('PENDING', 'PAID', 'CANCELLED')),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id         SERIAL PRIMARY KEY,
  order_id   INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity   INT NOT NULL CHECK (quantity >= 1),
  unit_price NUMERIC(8,2) NOT NULL
);



CREATE TABLE IF NOT EXISTS volunteers (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT UNIQUE NOT NULL,
  phone       TEXT,
  availability TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS battlefield_trips (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT,
  trip_date    DATE NOT NULL,
  max_capacity INT NOT NULL DEFAULT 20,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news(
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  image_url   TEXT,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);




-- View: remaining capacity per slot
CREATE OR REPLACE VIEW slot_availability AS
  SELECT
    ts.id,
    ts.slot_date,
    ts.max_capacity,
    COALESCE(SUM(b.visitor_count) FILTER (WHERE b.status = 'CONFIRMED'), 0) AS booked,
    ts.max_capacity - COALESCE(SUM(b.visitor_count) FILTER (WHERE b.status = 'CONFIRMED'), 0) AS remaining
  FROM time_slots ts
  LEFT JOIN bookings b ON b.slot_id = ts.id
  GROUP BY ts.id;



