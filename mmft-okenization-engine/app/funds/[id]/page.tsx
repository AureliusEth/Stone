import { notFound } from 'next/navigation'
import FundActions from '@/components/fund-actions'

const funds = [
  { id: 1, name: 'Global Money Market Fund', nav: 1.0025, aum: 1000000000, description: 'A diversified global money market fund' },
  { id: 2, name: 'US Treasury Fund', nav: 1.0015, aum: 750000000, description: 'Invests primarily in US Treasury securities' },
  { id: 3, name: 'Euro Liquidity Fund', nav: 0.9995, aum: 500000000, description: 'Focuses on Euro-denominated money market instruments' },
]

export default function FundPage({ params }: { params: { id: string } }) {
  const fund = funds.find(f => f.id === parseInt(params.id))

  if (!fund) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">{fund.name}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Fund Details</h2>
          <p><strong>Fund ID:</strong> {fund.id}</p>
          <p><strong>NAV:</strong> ${fund.nav.toFixed(4)}</p>
          <p><strong>AUM:</strong> ${fund.aum.toLocaleString()}</p>
          <p><strong>Description:</strong> {fund.description}</p>
        </div>
        <FundActions fundId={fund.id} />
      </div>
    </div>
  )
}

