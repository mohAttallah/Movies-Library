create table if not exists movie_libarys (
    id serial primary key, 
    title varchar(255),
    poster_path varchar(10000),
    image varchar(255)
);

insert into movie_libarys(title, poster_path,image) values('test' ,'anything', ' http://mohAttallah.com')