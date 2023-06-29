import { useEffect, useRef, useState } from 'react'

const workerHandler = (fn) => {
    onmessage = (event) => {
        postMessage(fn(event.data))
    }
}

export const useWebworker = (fn) => {
    const [result, setResult] = useState(null)

    const workerRef = useRef(null)

    useEffect(() => {
        const worker = new Worker(
            URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
        )
        workerRef.current = worker
        worker.onmessage = (event) => setResult(event.data)
        return () => {
            worker.terminate()
        }
    }, [fn])

    return {
        result,
        run: (value) => workerRef.current.postMessage(value),
    }
}

export const useDisposableWebworker = (fn) => {
    const [result, setResult] = useState(null)

    const run = (value) => {
        const worker = new Worker(
            URL.createObjectURL(new Blob([`(${workerHandler})(${fn})`]))
        )
        worker.onmessage = (event) => {
            setResult(event.data)
            worker.terminate()
        }
        worker.onerror = (error) => {
            worker.terminate()
        }
        worker.postMessage(value)
    }

    return {
        result,
        run,
    }
}