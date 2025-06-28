CREATE TABLE if not exists accesses (
    id varchar(255) primary key,
    email varchar(255),
    password varchar(255),
    created_at timestamp default now(),
    updated_at timestamp default now()
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON accesses
FOR EACH ROW
EXECUTE FUNCTION updated_at_column();

INSERT INTO accesses (id, email, password) VALUES ('1', 'admin@admin.com', 'admin');