/*
 * pronouns
 */
create table pronouns (
  pronoun_id uuid primary key default uuid_generate_v4(),
  name text,
  popularity smallint
);

insert into pronouns (name, popularity)
values
  ('He/him/his', 1),
  ('She/her/hers', 2),
  ('They/them/theirs', 3),
  ('Ze/hir/hir', 4),
  ('Name only', 5);

/*
 * profiles
 */
create table profiles (
  profile_id uuid references auth.users on delete cascade not null,
  name text,
  username text,
  pronoun_id uuid references pronouns,
  primary key (profile_id),
  unique(username),
  constraint username_length check (char_length(username) >= 3),
  constraint username_format check (username ~ '^[a-z_0-9]+$')
);

/*
 * sound_tests
 */
create table sound_tests (
  sound_test_id uuid primary key default uuid_generate_v4(),
  url text not null,
  uploaded timestamptz not null,
  last_updated timestamptz default now(),
  owner_id uuid references auth.users on delete cascade not null
);

/*
 * votes
 */
create table votes (
  sound_test_id uuid references sound_tests not null,
  vote_type smallint default 0 not null,
  timestamp timestamptz default now(),
  owner_id uuid references auth.users not null,
  primary key (sound_test_id, owner_id),
  check(vote_type = -1 or vote_type = 0 or vote_type = 1)
);
