/*
 * gender_pronoun
 */
create table gender_pronoun (
  gender_pronoun_id uuid primary key default uuid_generate_v4(),
  name text,
  popularity smallint
);

insert into gender_pronoun (name, popularity)
values
  ('He/him/his', 1),
  ('She/her/hers', 2),
  ('They/them/theirs', 3),
  ('Ze/hir/hir', 4),
  ('Name only', 5);

/*
 * user_profile
 */
create table user_profile (
  user_profile_id uuid references auth.users on delete cascade not null,
  name text,
  username text,
  gender_pronoun_id uuid references pronouns,
  primary key (profile_id),
  unique(username),
  constraint username_length check (char_length(username) >= 3),
  constraint username_format check (username ~ '^[a-z_0-9]+$')
);

/*
 * sound_test
 */
create table sound_test (
  sound_test_id uuid primary key default uuid_generate_v4(),
  url text not null,
  uploaded timestamptz not null,
  last_updated timestamptz default now(),
  keyboard_id uuid references keyboard not null,
  plate_material_id uuid references plate_material not null,
  keycap_id uuid references keycap not null,
  keyswitch_id uuid references keyswitch not null,
  owner_id uuid references auth.users on delete cascade not null
);

/*
 * vote
 */
create table vote (
  sound_test_id uuid references sound_test not null,
  vote_type smallint default 0 not null,
  timestamp timestamptz default now(),
  owner_id uuid references auth.users not null,
  primary key (sound_test_id, owner_id),
  check(vote_type = -1 or vote_type = 0 or vote_type = 1)
);

/*
 * keyboard
 */
create table keyboard (
  keyboard_id uuid primary key default uuid_generate_v4(),
  name text not null
);

/*
 * plate_material
 */
create table plate_material (
  plate_material_id uuid primary key default uuid_generate_v4(),
  name text not null
);

/*
 * keycap
 */
create table keycap (
  keycap_id uuid primary key default uuid_generate_v4(),
  name text not null
);

/*
 * keyswitch
 */
create table keyswitch (
  keyswitch_id uuid primary key default uuid_generate_v4(),
  name text not null
);