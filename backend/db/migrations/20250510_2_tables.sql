CREATE TABLE if not exists users (
    id varchar(255) primary key,
    name varchar(255),
    phone varchar(255),
    email varchar(255),
    relation_with_master text,
    what_likes text,
    what_knows text,
    what_does text,
    conversation_state varchar(255),
    created_at timestamp default now(),
    updated_at timestamp default now()
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION updated_at_column();

CREATE TABLE if not exists appointments (
    id varchar(255) primary key,
    user_id varchar(255),
    when timestamp,
    title text,
    description text,
    created_at timestamp default now(),
    updated_at timestamp default now(),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON appointments
FOR EACH ROW
EXECUTE FUNCTION updated_at_column();
