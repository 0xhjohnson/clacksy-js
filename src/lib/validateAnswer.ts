import { ValidateAnswer } from '@/types'

export async function validateAnswer(answer: ValidateAnswer) {
  const response = await fetch('/api/validate-answer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(answer)
  })

  return response.json()
}
