-- CRIA TABELA USERS

CREATE TABLE
    users (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (DATETIME())
    );

-- CRIA TABELA POSTS

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL DEFAULT(0),
        dislikes INTEGER NOT NULL DEFAULT(0),
        created_at TEXT NOT NULL DEFAULT(DATETIME()),
        updated_at TEXT NOT NULL DEFAULT(DATETIME()),
        FOREIGN KEY (creator_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
    );

-- CRIA TABELA LIKES DESLIKES

CREATE TABLE
    likes_dislikes (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );