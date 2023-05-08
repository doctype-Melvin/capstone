import Link from 'next/link'

export default function Home() {
  return (
    <>
      <main >
          {/* <div>
            <Link href="/exercises">Go to exercises</Link>
          </div>
          <div>
            <Link href="/plans">Go to plans</Link>
          </div> */}
          <div>
            <Link href="/create">Create plan</Link>
          </div>
      </main>
    </>
  )
}
