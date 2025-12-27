import { localSupabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { clientId, status } = req.query

  try {
    let query = localSupabase
      .from('disputes')
      .select('*')
      .order('created_at', { ascending: false })

    if (clientId) {
      query = query.eq('client_id', clientId)
    }

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    // Transform snake_case to camelCase for frontend
    const disputes = data.map(d => ({
      id: d.id,
      clientId: d.client_id,
      bureau: d.bureau,
      creditor: d.creditor,
      accountNumber: d.account_number,
      amount: d.amount,
      reason: d.reason,
      status: d.status,
      letterType: d.letter_type,
      letterUrl: d.letter_url,
      createdAt: d.created_at,
      updatedAt: d.updated_at,
    }))

    res.status(200).json(disputes)
  } catch (err) {
    console.error('Failed to fetch disputes:', err)
    res.status(500).json({ error: 'Failed to fetch disputes' })
  }
}
