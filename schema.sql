CREATE TABLE IF NOT EXISTS movie_libarys (
    id serial primary key, 
    title varchar(255),
    poster_path varchar(10000),
    image varchar(255),
    comments varchar(10000)
);


INSERT INTO movie_libarys (title, poster_path,image, comments) VALUES ('test', 'anything', 'http://mohAttallah.com', 'Nice Movie');
