"use client"

import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/Toast"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"

export function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast key={id} {...props}>
						<div className="flex justify-center gap-1">
							{title && (
								<div className="flex gap-3">
									{props.variant === "destructive" && (
										<div className="pb-2.5">
											<AlertCircle size={20} className="text-white" />
										</div>
									)}
									<div className="space-y-1">
										<ToastTitle>{title}</ToastTitle>
										{description && <ToastDescription>{description}</ToastDescription>}
									</div>
								</div>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				)
			})}
			<ToastViewport />
		</ToastProvider>
	)
}
