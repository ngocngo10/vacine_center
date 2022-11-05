CREATE DATABASE vacine_center;
CREATE USER test_user WITH PASSWORD 'abcd1234';
GRANT ALL PRIVILEGES ON DATABASE "vacine_center" to test_user;
GRANT USAGE ON SCHEMA public TO test_user;
