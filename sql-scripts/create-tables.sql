create extension if not exists "uuid-ossp";

CREATE type statuses AS ENUM ('OPEN', 'ORDERED');

create table if not exists cart (
 id uuid not null default uuid_generate_v4() primary key,
 user_id uuid not null default uuid_generate_v4(),
 created_at date not null,
 updated_at date not null,
 status statuses
);

create table if not exists cart_items (
 product_id uuid not null default uuid_generate_v4() primary key,
 count_ integer 
);

alter table cart_items add column cart_id uuid references cart(id);
