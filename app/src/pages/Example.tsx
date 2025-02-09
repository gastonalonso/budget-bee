import { useEffect, useState } from 'react'

function Example() {
  const [data, setData] = useState<string>('')

  useEffect(() => {
    fetch('/api/example')
      .then((response) => response.text())
      .then((text) => setData(text))
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  return <h2>{data || 'Loading...'}</h2>
}

export default Example
