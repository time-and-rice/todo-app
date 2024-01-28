CREATE TYPE task_status as ENUM ('Incomplete', 'Complete');

CREATE TABLE IF NOT EXISTS tasks(
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    status task_status NOT NULL DEFAULT 'Incomplete',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    auth_user_id TEXT NOT NULL
);