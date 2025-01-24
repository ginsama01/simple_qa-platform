CREATE TABLE courses {
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
};

CREATE TABLE questions {
    id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(id),
    content TEXT NOT NULL,
    user_uuid TEXT NOT NULL,
    last_upvote TIMESTAMP WITH TIME ZONE DEFAULT NOW()
};

CREATE TABLE answers {
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id)
    content TEXT NOT NULL,
    user_uuid TEXT,
    last_upvote TIMESTAMP WITH TIME ZONE DEFAULT NOW()
};

CREATE TABLE upvotes {
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES questions(id),
    answer_id INTEGER REFERENCES answers(id),
    user_uuid TEXT NOT NULL
};
