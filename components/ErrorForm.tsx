import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface ErrorFormProps {
	message?: string
}

export const ErrorForm = ({ message }: ErrorFormProps) => {
	if (!message) {
		return null
	}

	return (
		<div className='flex items-center bg-red-100 text-red-600 p-3 rounded-md gap-x-2 text-sm'>
			<ExclamationTriangleIcon className='size-4' />
			<p>{message}</p>
		</div>
	)
}
