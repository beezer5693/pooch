type PasswordValidationProgressProps = {
	percentage: number
}

const PasswordValidationProgress = ({ percentage }: PasswordValidationProgressProps) => {
	return (
		<div
			className="radial-progress text-destructive"
			style={{ "--value": percentage, "--size": ".75rem", "--thickness": "1.5px" }}
		></div>
	)
}

export default PasswordValidationProgress
