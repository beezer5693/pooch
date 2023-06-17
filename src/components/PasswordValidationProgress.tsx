"use client"

import { CheckCircle2 } from "lucide-react"
import { useTheme } from "next-themes"
import { UseThemeProps } from "next-themes/dist/types"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

type PasswordValidationProgressProps = {
	percentage: number
	password: string
}

const PasswordValidationProgress = ({ percentage, password }: PasswordValidationProgressProps) => {
	const { theme }: UseThemeProps = useTheme()
	return (
		<div className="flex items-center gap-1.5">
			<p className="text-xs text-muted-foreground">{percentage === 100 ? "Strong" : "Too weak"}</p>
			{percentage === 100 ? (
				<CheckCircle2 size={16} className="text-success" />
			) : (
				<div style={{ width: 14, height: 14 }}>
					<CircularProgressbar
						styles={buildStyles({
							pathColor: `rgba(239, 68, 68)`,
							trailColor: theme === "dark" ? "#595959" : "#E5E5E5",
						})}
						strokeWidth={17}
						value={percentage}
					/>
				</div>
			)}
		</div>
	)
}

export default PasswordValidationProgress
