export type AppointmentEntity = {
  id: string
  user_id: string
  date_time: string
  title: string
  description: string
  created_at: string
  updated_at: string
};

export type CreateAppointmentDto = {
  user_id: string
  date_time: string
  title: string
  description: string
};