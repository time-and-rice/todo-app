CREATE TYPE task_status as ENUM ('Incomplete', 'Complete');

CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    status task_status DEFAULT 'Incomplete',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);