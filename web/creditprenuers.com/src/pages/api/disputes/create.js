import { localSupabase } from '@/lib/supabase'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { bureau, creditor, accountNumber, amount, reason, letterType, clientId } = req.body

  if (!bureau || !creditor || !reason || !letterType) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    const { data, error } = await localSupabase
      .from('disputes')
      .insert({
        client_id: clientId || null,
        bureau,
        creditor,
        account_number: accountNumber || null,
        amount: amount ? parseFloat(amount) : null,
        reason,
        letter_type: letterType,
        status: 'Pending',
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    res.status(200).json(data)
  } catch (err) {
    console.error('Failed to create dispute:', err)
    res.status(500).json({ error: 'Failed to create dispute' })
  }
}
