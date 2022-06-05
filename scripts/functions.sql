create or replace function handle_new_user() 
returns trigger as $$
begin
  insert into public.user_profile (user_profile_id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- trigger the handle_new_user function every time a user is created
-- this inserts a row into public.profiles with the new profile_id
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();