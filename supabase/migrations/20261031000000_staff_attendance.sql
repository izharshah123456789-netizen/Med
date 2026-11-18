create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('patient', 'reception', 'doctor', 'owner')),
  display_name text not null,
  phone text,
  created_at timestamptz not null default now()
);

create table public.staff_doctor_assignments (
  staff_user_id uuid not null references public.profiles (id) on delete cascade,
  doctor_user_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (staff_user_id, doctor_user_id),
  check (staff_user_id <> doctor_user_id)
);

create table public.staff_attendance (
  id uuid primary key default gen_random_uuid(),
  staff_user_id uuid not null references public.profiles (id) on delete cascade,
  doctor_user_id uuid not null references public.profiles (id) on delete cascade,
  checked_in_at timestamptz not null default now()
);

create index staff_attendance_doctor_time_idx
  on public.staff_attendance (doctor_user_id, checked_in_at desc);

alter table public.profiles enable row level security;
alter table public.staff_doctor_assignments enable row level security;
alter table public.staff_attendance enable row level security;

grant select on public.profiles to authenticated;
grant select on public.staff_doctor_assignments to authenticated;
grant select, insert on public.staff_attendance to authenticated;

create policy "Profiles are visible to the account and assigned people"
  on public.profiles
  for select
  to authenticated
  using (
    id = auth.uid()
    or exists (
      select 1
      from public.staff_doctor_assignments assignment
      where assignment.staff_user_id = auth.uid()
        and assignment.doctor_user_id = profiles.id
    )
    or exists (
      select 1
      from public.staff_doctor_assignments assignment
      where assignment.doctor_user_id = auth.uid()
        and assignment.staff_user_id = profiles.id
    )
  );

create policy "Accounts can read their own doctor assignments"
  on public.staff_doctor_assignments
  for select
  to authenticated
  using (
    staff_user_id = auth.uid()
    or doctor_user_id = auth.uid()
  );

create policy "Accounts can read their own attendance"
  on public.staff_attendance
  for select
  to authenticated
  using (
    staff_user_id = auth.uid()
    or doctor_user_id = auth.uid()
  );

create policy "Assigned staff can record attendance"
  on public.staff_attendance
  for insert
  to authenticated
  with check (
    staff_user_id = auth.uid()
    and exists (
      select 1
      from public.profiles staff_profile
      where staff_profile.id = auth.uid()
        and staff_profile.role = 'reception'
    )
    and exists (
      select 1
      from public.profiles doctor_profile
      where doctor_profile.id = staff_attendance.doctor_user_id
        and doctor_profile.role = 'doctor'
    )
    and exists (
      select 1
      from public.staff_doctor_assignments assignment
      where assignment.staff_user_id = auth.uid()
        and assignment.doctor_user_id = staff_attendance.doctor_user_id
    )
  );
