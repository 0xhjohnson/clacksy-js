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

alter table pronouns enable row level security;

create policy "Pronoun options are viewable by everyone."
  on pronouns for select
  using ( true );

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

alter table profiles enable row level security;

create policy "Profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = profile_id );

create policy "Users can delete own profile."
  on profiles for delete
  using ( auth.uid() = profile_id );