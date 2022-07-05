import {useEffect, useState} from "react";

export default function Students() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/students')
            .then((res) => res.json())
            .then((d) => {
                console.log(d)
                setData(d)
                setLoading(false)

            })

    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <div>
            <h1>{data[1].full_name}</h1>

        </div>
    )
}