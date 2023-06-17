import { useEffect, useState } from "react"

type ValidationType = {
	regex: RegExp
	isValidated: boolean
}

export const usePasswordValidation = (password: string) => {
	const [passwordValidationCheck, setPasswordValidationCheck] = useState<ValidationType[]>([
		{ regex: /[A-Z]/, isValidated: false },
		{ regex: /[a-z]/, isValidated: false },
		{ regex: /[0-9]/, isValidated: false },
		{ regex: /[^A-Za-z0-9]/, isValidated: false },
		{ regex: /.{8,}/, isValidated: false },
	])

	useEffect(() => {
		const updatedPasswordValidationCheck = passwordValidationCheck.map(item => {
			return {
				...item,
				isValidated: item.regex.test(password),
			}
		})
		setPasswordValidationCheck(updatedPasswordValidationCheck)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [password])

	return passwordValidationCheck
}
