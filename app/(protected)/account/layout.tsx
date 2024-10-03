import React from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-300 to-green-900'>
			{children}
		</div>
	)
}

export default ProtectedLayout
