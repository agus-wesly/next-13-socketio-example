'use client'

type Props = {}

export default function Component({}: Props) {
  async function handlePay() {
    let resp = await fetch('/api/pay', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })
    let responseToken = await resp.json()

    console.log({ responseToken })

    // @ts-expect-error
    window.snap.pay(responseToken.token)
  }

  return (
    <div>
      <button onClick={handlePay}>Bayar ngabsssss</button>
    </div>
  )
}
