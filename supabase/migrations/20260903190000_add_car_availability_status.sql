alter table public.cars
add column availability_status text not null default 'available';

alter table public.cars
add constraint cars_availability_status_check
check (availability_status in ('available', 'sold'));
