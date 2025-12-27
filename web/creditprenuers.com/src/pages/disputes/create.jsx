import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const BUREAUS = ['Equifax', 'Experian', 'TransUnion']

const LETTER_TYPES = [
  { id: 'debtValidation', name: 'Debt Validation', desc: 'Request proof the debt is valid and collectible' },
  { id: 'methodOfVerification', name: 'Method of Verification', desc: 'Ask how the bureau verified the information' },
  { id: 'goodwillRequest', name: 'Goodwill Request', desc: 'Request removal as a courtesy for isolated incidents' },
  { id: 'payForDelete', name: 'Pay for Delete', desc: 'Negotiate payment in exchange for removal' },
  { id: 'fcraViolation', name: 'FCRA Violation', desc: 'Formal notice of Fair Credit Reporting Act violation' },
]

const DISPUTE_REASONS = [
  'Not my account',
  'Account paid in full',
  'Account settled',
  'Duplicate account',
  'Incorrect balance',
  'Incorrect payment history',
  'Account closed by consumer',
  'Identity theft / Fraud',
  'Outdated information (7+ years)',
  'Never late on this account',
  'Other'
]

export default function CreateDispute() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    bureau: '',
    creditor: '',
    accountNumber: '',
    amount: '',
    reason: '',
    customReason: '',
    letterType: '',
  })

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/disputes/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          reason: formData.reason === 'Other' ? formData.customReason : formData.reason,
        }),
      })

      if (!response.ok) throw new Error('Failed to create dispute')
      
      const dispute = await response.json()
      router.push(`/disputes/${dispute.id}`)
    } catch (err) {
      console.error(err)
      alert('Failed to create dispute. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Create Dispute | Credtegy</title>
      </Head>

      <div className="min-h-screen bg-gray-900 text-gray-100">
        {/* Navigation */}
        <nav className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/credtegy" className="flex items-center gap-3">
              <span className="text-xl font-bold text-yellow-400">Credtegy</span>
              <span className="text-gray-400">|</span>
              <span className="text-white">Dispute Center</span>
            </Link>
            <Link href="/disputes" className="text-gray-400 hover:text-white">
              ← Back to Disputes
            </Link>
          </div>
        </nav>

        <div className="max-w-3xl mx-auto px-6 py-8">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  step >= num ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-400'
                }`}>
                  {num}
                </div>
                <span className={`ml-2 text-sm hidden sm:block ${step >= num ? 'text-white' : 'text-gray-500'}`}>
                  {num === 1 ? 'Account Info' : num === 2 ? 'Dispute Reason' : 'Letter Type'}
                </span>
                {num < 3 && <div className={`w-12 sm:w-24 h-1 mx-2 ${step > num ? 'bg-yellow-500' : 'bg-gray-700'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Information */}
            {step === 1 && (
              <div className="bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Account Information</h2>
                
                <div className="space-y-6">
                  {/* Bureau Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                      Select Bureau *
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {BUREAUS.map(bureau => (
                        <button
                          key={bureau}
                          type="button"
                          onClick={() => updateField('bureau', bureau)}
                          className={`p-4 rounded-lg border-2 transition-all text-center ${
                            formData.bureau === bureau
                              ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                              : 'border-gray-700 bg-gray-700/50 text-gray-300 hover:border-gray-600'
                          }`}
                        >
                          {bureau}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Creditor Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Creditor / Furnisher Name *
                    </label>
                    <input
                      type="text"
                      value={formData.creditor}
                      onChange={(e) => updateField('creditor', e.target.value)}
                      placeholder="e.g., Capital One, Midland Credit"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                      required
                    />
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Account Number (optional)
                    </label>
                    <input
                      type="text"
                      value={formData.accountNumber}
                      onChange={(e) => updateField('accountNumber', e.target.value)}
                      placeholder="Last 4 digits or full number"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    />
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Amount (optional)
                    </label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => updateField('amount', e.target.value)}
                      placeholder="$0.00"
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.bureau || !formData.creditor}
                    className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold px-8 py-3 rounded-lg transition-all"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Dispute Reason */}
            {step === 2 && (
              <div className="bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Dispute Reason</h2>
                
                <div className="space-y-3">
                  {DISPUTE_REASONS.map(reason => (
                    <button
                      key={reason}
                      type="button"
                      onClick={() => updateField('reason', reason)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.reason === reason
                          ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                          : 'border-gray-700 bg-gray-700/50 text-gray-300 hover:border-gray-600'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>

                {formData.reason === 'Other' && (
                  <div className="mt-4">
                    <textarea
                      value={formData.customReason}
                      onChange={(e) => updateField('customReason', e.target.value)}
                      placeholder="Describe your reason for disputing..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none"
                      required
                    />
                  </div>
                )}

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-gray-400 hover:text-white font-medium px-6 py-3"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.reason || (formData.reason === 'Other' && !formData.customReason)}
                    className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold px-8 py-3 rounded-lg transition-all"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Letter Type */}
            {step === 3 && (
              <div className="bg-gray-800 rounded-xl p-6 md:p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Select Letter Type</h2>
                
                <div className="space-y-3">
                  {LETTER_TYPES.map(letter => (
                    <button
                      key={letter.id}
                      type="button"
                      onClick={() => updateField('letterType', letter.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.letterType === letter.id
                          ? 'border-yellow-500 bg-yellow-500/10'
                          : 'border-gray-700 bg-gray-700/50 hover:border-gray-600'
                      }`}
                    >
                      <div className={`font-semibold ${formData.letterType === letter.id ? 'text-yellow-400' : 'text-white'}`}>
                        {letter.name}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">{letter.desc}</div>
                    </button>
                  ))}
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-gray-700/50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Dispute Summary</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Bureau:</div>
                    <div className="text-white">{formData.bureau}</div>
                    <div className="text-gray-400">Creditor:</div>
                    <div className="text-white">{formData.creditor}</div>
                    <div className="text-gray-400">Reason:</div>
                    <div className="text-white">{formData.reason}</div>
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-gray-400 hover:text-white font-medium px-6 py-3"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    disabled={!formData.letterType || loading}
                    className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold px-8 py-3 rounded-lg transition-all"
                  >
                    {loading ? 'Creating...' : 'Create Dispute →'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  )
}
