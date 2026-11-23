-- Run once in Supabase SQL Editor. No service-role key is used by ChemEase.
create table if not exists public.chemease_workspaces (
  owner_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null check (revision > 0),
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  constraint workspace_owner_matches check ((payload->>'ownerId' = owner_id::text) is true),
  constraint workspace_schema check (((payload->>'schemaVersion')::int = 1) is true),
  constraint workspace_revision_matches check (((payload->>'revision')::bigint = revision) is true),
  constraint workspace_size check (octet_length(payload::text) <= 20971520)
);
alter table public.chemease_workspaces enable row level security;
revoke all on public.chemease_workspaces from anon, authenticated;
grant select, insert, update on public.chemease_workspaces to authenticated;
create policy "Read own ChemEase workspace" on public.chemease_workspaces
  for select to authenticated using (owner_id = (select auth.uid()));
create policy "Create own ChemEase workspace" on public.chemease_workspaces
  for insert to authenticated with check (owner_id = (select auth.uid()));
create policy "Update own ChemEase workspace" on public.chemease_workspaces
  for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));

-- An atomic compare-and-swap prevents silent overwrites between devices/tabs.
create or replace function public.save_chemease_workspace(expected_revision bigint, document jsonb)
returns void language plpgsql security invoker set search_path = '' as $$
declare changed integer;
begin
  if auth.uid() is null or document->>'ownerId' is distinct from auth.uid()::text then
    raise exception 'Workspace owner mismatch' using errcode = '42501';
  end if;
  if expected_revision < 0 or (document->>'revision')::bigint is distinct from expected_revision + 1 then
    raise exception 'Invalid workspace revision' using errcode = '22023';
  end if;
  if expected_revision = 0 then
    insert into public.chemease_workspaces(owner_id, revision, payload)
      values(auth.uid(), 1, document) on conflict (owner_id) do nothing;
  else
    update public.chemease_workspaces set revision = expected_revision + 1, payload = document, updated_at = now()
      where owner_id = auth.uid() and revision = expected_revision;
  end if;
  get diagnostics changed = row_count;
  if changed <> 1 then raise exception 'Workspace changed on another device' using errcode = '40001'; end if;
end;
$$;
revoke all on function public.save_chemease_workspace(bigint,jsonb) from public, anon;
grant execute on function public.save_chemease_workspace(bigint,jsonb) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('chemease-docking','chemease-docking',false,52428800,array['application/json'])
on conflict (id) do nothing;
create policy "Read own ChemEase docking files" on storage.objects for select to authenticated
  using (bucket_id = 'chemease-docking' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Upload own ChemEase docking files" on storage.objects for insert to authenticated
  with check (bucket_id = 'chemease-docking' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "Update own ChemEase docking files" on storage.objects for update to authenticated
  using (bucket_id = 'chemease-docking' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'chemease-docking' and (storage.foldername(name))[1] = (select auth.uid())::text);
