CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    content TEXT NOT NULL,
    user_uuid TEXT NOT NULL,
    create_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_upvote TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE answers (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    content TEXT NOT NULL,
    user_uuid TEXT,
    create_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_upvote TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE upvotes (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    answer_id INTEGER REFERENCES answers(id),
    user_uuid TEXT NOT NULL
);

CREATE INDEX ques_user_uuid_co_id_idx ON 
    questions (user_uuid, course_id);

CREATE INDEX ans_user_uuid_ques_id_idx ON
    answers (user_uuid, question_id);