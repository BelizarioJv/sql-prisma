-- Consulta sql para de movier os titles dos filmes
SELECT * FROM movies ORDER BY title;

SELECT * FROM movies WHERE box_office > 500000000.00;

--selecionadno os dados da tabela series ordenando por ano de lançamento
SELECT id, title, release_year, genre, seasons, episodes, rating, status
FROM tvseries ORDER BY release_year DESC;

-- selecionando os dados da tabela movies ordenando por avaliação
SELECT id, title, release_year, genre, rating FROM movies ORDER BY rating DESC;

-- selecionando os dados da tabela movies calculando a média de avaliação para filmes com duração menor ou igual a 2 horas e para filmes com duração maior que 2 horas
SELECT
    AVG(CASE WHEN duration <= 120 THEN rating ELSE NULL END) AS avg_rating_up_to_2_hours,
    AVG(CASE WHEN duration > 120 THEN rating ELSE NULL END) AS avg_rating_over_2_hours
FROM movies;


SELECT id, title, release_year, rating, (box_office - production_cost) AS profit FROM movies ORDER BY profit DESC;