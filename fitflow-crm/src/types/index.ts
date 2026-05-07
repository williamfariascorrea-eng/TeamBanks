export interface User {
  id: string
  email: string
  name: string
  avatar_url?: string
  created_at: string
}

export interface Lead {
  id: string
  user_id: string
  name: string
  phone: string
  email: string
  city: string
  goal: string
  source: string
  notes: string
  status: 'novo' | 'contato' | 'avaliacao' | 'fechou' | 'perdido'
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  user_id: string
  name: string
  phone: string
  email: string
  photo?: string
  weight?: number
  height?: number
  goal: string
  body_fat?: number
  plan: string
  plan_price: number
  status: 'ativo' | 'inativo' | 'pausado'
  notes: string
  start_date: string
  created_at: string
  updated_at: string
}

export interface Measurement {
  id: string
  student_id: string
  date: string
  weight?: number
  height?: number
  body_fat?: number
  chest?: number
  waist?: number
  hips?: number
  arms?: number
  thighs?: number
  photo_before?: string
  photo_after?: string
  notes: string
}

export interface Appointment {
  id: string
  user_id: string
  student_id?: string
  title: string
  description: string
  type: 'sessao' | 'avaliacao' | 'vencimento' | 'outro'
  date: string
  time: string
  duration: number
  status: 'agendado' | 'realizado' | 'cancelado'
  created_at: string
}

export interface Payment {
  id: string
  student_id: string
  user_id: string
  amount: number
  due_date: string
  paid_date?: string
  status: 'pendente' | 'pago' | 'atrasado'
  description: string
  created_at: string
}

export interface DashboardStats {
  total_students: number
  new_leads: number
  monthly_revenue: number
  inactive_students: number
  conversion_rate: number
}