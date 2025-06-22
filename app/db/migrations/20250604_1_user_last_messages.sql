CREATE TABLE if not exists user_last_messages (
    id varchar(255) primary key,
    user_id varchar(255),
    sender varchar(255),
    content TEXT,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON user_last_messages
FOR EACH ROW
EXECUTE FUNCTION updated_at_column();