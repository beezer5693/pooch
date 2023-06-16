import * as Tooltip from "@radix-ui/react-tooltip"

type TooltipProps = {
	children: React.ReactNode
	showPassword: boolean
}

export default function TooltipDemo({ children, showPassword }: TooltipProps) {
	return (
		<Tooltip.Provider delayDuration={100}>
			<Tooltip.Root>
				<Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
				<Tooltip.Portal>
					<Tooltip.Content
						className="rounded bg-primary p-2 text-xs font-medium text-primary-foreground shadow-md"
						sideOffset={3}
					>
						{showPassword ? "Hide password" : "Show password"}
						<Tooltip.Arrow className="fill-primary" />
					</Tooltip.Content>
				</Tooltip.Portal>
			</Tooltip.Root>
		</Tooltip.Provider>
	)
}
