import { localSupabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { disputeId, status } = req.body

  if (!disputeId || !status) {
    return res.status(400).json({ error: 'Missing disputeId or status' })
  }

  const validStatuses = ['Pending', 'Sent', 'Replied', 'Deleted', 'Won', 'Lost']
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' })
  }

  try {
    const { data, error } = await localSupabase
      .from('disputes')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', disputeId)
      .select()
      .single()

    if (error) throw error

    res.status(200).json(data)
  } catch (err) {
    console.error('Failed to update dispute status:', err)
    res.status(500).json({ error: 'Failed to update dispute status' })
  }
}
