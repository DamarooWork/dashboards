import { NextResponse } from 'next/server'
import { Pool } from 'pg'

const pool = new Pool({
  host: '82.202.128.65',
  port: 5432,
  database: 'ip_ppm',
  user: process.env.DB_USER, // Укажите в .env.local
  password: process.env.DB_PASSWORD, // Укажите в .env.local
  ssl: false, // Попробуйте без SSL
})

export async function GET() {
  try {
    const client = await pool.connect()
    try {
      const result = await client.query('SELECT * FROM your_table LIMIT 100')
      return NextResponse.json({
        success: true,
        data: result.rows,
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Ошибка БД:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Ошибка подключения',
      },
      { status: 500 }
    )
  }
}
