-- Script para configurar sequências no Supabase
-- Execute este script no SQL Editor do Supabase para configurar auto-increment nos IDs

-- Configurar sequência para a tabela music
CREATE SEQUENCE IF NOT EXISTS music_id_seq;
ALTER TABLE music ALTER COLUMN id SET DEFAULT nextval('music_id_seq');
ALTER SEQUENCE music_id_seq OWNED BY music.id;

-- Configurar sequência para a tabela playlist
CREATE SEQUENCE IF NOT EXISTS playlist_id_seq;
ALTER TABLE playlist ALTER COLUMN id SET DEFAULT nextval('playlist_id_seq');
ALTER SEQUENCE playlist_id_seq OWNED BY playlist.id;

-- Configurar sequência para a tabela user
CREATE SEQUENCE IF NOT EXISTS user_id_seq;
ALTER TABLE "user" ALTER COLUMN id SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "user".id;

-- Configurar sequência para a tabela playlist_music
CREATE SEQUENCE IF NOT EXISTS playlist_music_id_seq;
ALTER TABLE playlist_music ALTER COLUMN id SET DEFAULT nextval('playlist_music_id_seq');
ALTER SEQUENCE playlist_music_id_seq OWNED BY playlist_music.id;

-- Configurar sequência para a tabela user_playlist
CREATE SEQUENCE IF NOT EXISTS user_playlist_id_seq;
ALTER TABLE user_playlist ALTER COLUMN id SET DEFAULT nextval('user_playlist_id_seq');
ALTER SEQUENCE user_playlist_id_seq OWNED BY user_playlist.id;

-- Ajustar o valor inicial das sequências baseado nos dados existentes (se houver)
-- Descomente e ajuste se já tiver dados nas tabelas:
-- SELECT setval('music_id_seq', COALESCE((SELECT MAX(id) FROM music), 1), true);
-- SELECT setval('playlist_id_seq', COALESCE((SELECT MAX(id) FROM playlist), 1), true);
-- SELECT setval('user_id_seq', COALESCE((SELECT MAX(id) FROM "user"), 1), true);
-- SELECT setval('playlist_music_id_seq', COALESCE((SELECT MAX(id) FROM playlist_music), 1), true);
-- SELECT setval('user_playlist_id_seq', COALESCE((SELECT MAX(id) FROM user_playlist), 1), true);

