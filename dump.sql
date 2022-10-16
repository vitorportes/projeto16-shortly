--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT '2022-10-11 10:23:32.755787'::timestamp without time zone NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    "shortUrl" text NOT NULL,
    url text NOT NULL,
    "userId" integer NOT NULL,
    "visitCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, 'edb7897a-1aa0-491a-8f76-6e782fa629ba', 4, '2022-10-12 12:00:42.991164');
INSERT INTO public.sessions VALUES (2, 'bdd3a512-342b-4095-99cc-9aac9b57a36b', 4, '2022-10-12 13:59:44.180341');
INSERT INTO public.sessions VALUES (3, '431352b1-21f2-4f76-ad9e-e4c15ccc5cae', 4, '2022-10-12 14:00:34.252908');
INSERT INTO public.sessions VALUES (4, '51a81bcb-5613-46cf-88fc-87daea4a7c94', 4, '2022-10-12 14:01:27.358733');
INSERT INTO public.sessions VALUES (5, '2e84ae24-bdf3-435b-8b48-c87c014043f7', 4, '2022-10-12 14:03:17.251328');
INSERT INTO public.sessions VALUES (6, 'da05caf2-e41c-4d05-bc5e-7d61154ecf56', 4, '2022-10-12 14:03:33.51195');
INSERT INTO public.sessions VALUES (7, '6f28296c-a1f4-4420-9196-b9065b92c612', 4, '2022-10-12 14:04:23.183905');
INSERT INTO public.sessions VALUES (8, '358b0b5a-438d-4af2-a839-1429c1375a3b', 4, '2022-10-12 14:05:00.39218');
INSERT INTO public.sessions VALUES (9, '898c8130-7295-4c0c-bc7b-8cbf290d7b6c', 4, '2022-10-12 14:05:36.87324');
INSERT INTO public.sessions VALUES (10, '60896e3c-84d0-4a93-ab8f-f197e85291af', 4, '2022-10-12 14:06:43.678826');
INSERT INTO public.sessions VALUES (11, 'd09c9c8c-d05d-4aa0-9098-44d79a530740', 4, '2022-10-12 16:42:27.587429');
INSERT INTO public.sessions VALUES (12, '8f52043e-db6f-4bbd-9b0d-bd47b1b72f4c', 4, '2022-10-12 16:45:15.065879');
INSERT INTO public.sessions VALUES (13, '9b83538c-ba58-44d3-a92f-4fc32858cedb', 4, '2022-10-12 16:47:30.709978');
INSERT INTO public.sessions VALUES (14, '9fe5ccec-8f60-46b9-a7bc-1e229e429a23', 4, '2022-10-12 16:48:10.264536');
INSERT INTO public.sessions VALUES (15, '558a48a0-f554-4859-aa35-2e365021b7df', 4, '2022-10-12 17:10:37.528904');
INSERT INTO public.sessions VALUES (16, '6c0d51f1-4c25-4667-b0ee-09017a2a327c', 4, '2022-10-12 17:27:24.59807');
INSERT INTO public.sessions VALUES (17, 'adfee833-922f-4a5e-87a4-e103e69831a7', 4, '2022-10-12 17:27:38.774264');
INSERT INTO public.sessions VALUES (18, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpdG9ycG9ydG5veUBnbWFpbC5jb20iLCJpYXQiOjE2NjU4NDE2MDR9.4fLY7mMYZmQE0kQnm7Eta1Bd3LXDt6ETPkRcQDd8uoE', 4, '2022-10-15 10:46:44.713143');
INSERT INTO public.sessions VALUES (19, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2NTkyNjQ3N30.C_2Vpbpi0seoqQIgKEB0sdNVtJANnblxFTD3ueQXh98', 1, '2022-10-16 10:21:17.854289');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (2, 'aBoDAiLX', 'https://bootcampra.notion.site/Artigo-Autentica-o-com-JWT-2e54d82b5a414bfe83ee8fb9294ff304', 1, 0, '2022-10-16 11:08:27.08801');
INSERT INTO public.urls VALUES (4, '8sTwdxA7', 'https://www.instagram.com/', 1, 0, '2022-10-16 11:10:02.662398');
INSERT INTO public.urls VALUES (1, 'c-Ip4Bgw', 'https://bootcampra.notion.site/Artigo-Autentica-o-com-JWT-2e54d82b5a414bfe83ee8fb9294ff304', 1, 2, '2022-10-16 11:07:55.167525');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', 'driven');
INSERT INTO public.users VALUES (2, 'Vitor', 'vitor@driven.com.br', '123456');
INSERT INTO public.users VALUES (4, 'Vitor Portes', 'vitorportnoy@gmail.com', '12345632');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 19, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 4, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: sessions sessions_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_token_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_key UNIQUE (token);


--
-- Name: urls urls_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pk PRIMARY KEY (id);


--
-- Name: urls urls_shortUrl_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_shortUrl_key" UNIQUE ("shortUrl");


--
-- Name: users users_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);


--
-- Name: sessions sessions_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- Name: urls urls_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_fk0 FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

