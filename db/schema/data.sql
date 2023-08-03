-- Drop and recreate tables
DROP TABLE IF EXISTS categories CASCADE;
CREATE TABLE categories(
  id INTEGER PRIMARY KEY NOT NULL,
  category VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS todos CASCADE;
CREATE TABLE todos(
  id SERIAL PRIMARY KEY NOT NULL,
  name_of_todo VARCHAR(255),
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE ON UPDATE CASCADE,
  completed BOOLEAN NOT NULL,
  date_added DATE NOT NULL,
  date_completed DATE
);
