import { CheckCircledIcon } from '@radix-ui/react-icons'

interface SuccessFormProps {
	message?: string
}

export const SuccessForm = ({ message }: SuccessFormProps) => {
	if (!message) {
		return null
	}

	return (
		<div className='flex items-center bg-green-100 text-green-600 p-3 rounded-md gap-x-2 text-sm'>
			<CheckCircledIcon className='size-4' />
			<p>{message}</p>
		</div>
	)
}
