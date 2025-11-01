"use client"

import { use, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function ConfirmEmailClient({
    searchParams,
}: {
    searchParams: Promise<{ email?: string }>
}) {
    const router = useRouter()
    const params = use(searchParams)
    const email = params.email || ""
    const [canResend, setCanResend] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const { toast } = useToast()

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000)
            return () => clearTimeout(timer)
        } else {
            setCanResend(true)
        }
    }, [resendCooldown])

    const handleResendEmail = () => {
        setCanResend(false)
        setResendCooldown(60)
        toast({
            title: "Email Resent!",
            description: `Confirmation email has been sent to ${email}. Check your inbox and spam folder.`,
            duration: 4000,
        })
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-linear-to-r from-accent to-primary rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-foreground mb-2">Check Your Email</h1>
                        <p className="text-muted-foreground">
                            We sent a confirmation link to <span className="font-semibold text-accent">{email}</span>
                        </p>
                    </div>

                    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                        <p className="text-sm text-foreground">
                            <span className="font-semibold block mb-2">Next steps:</span>
                            <span className="text-muted-foreground">
                                1. Open your email and click the confirmation link
                                <br />
                                2. Your account will be verified
                                <br />
                                3. You can then log in and start tracking giveaways
                            </span>
                        </p>
                    </div>

                    <div className="space-y-3">
                        <p className="text-sm text-center text-muted-foreground">
                            Didn't receive the email? Check your spam folder or resend it.
                        </p>

                        <Button
                            onClick={handleResendEmail}
                            disabled={!canResend}
                            className="w-full bg-linear-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-accent-foreground font-semibold disabled:opacity-50"
                        >
                            {canResend ? "Resend Email" : `Resend in ${resendCooldown}s`}
                        </Button>

                        <Button
                            onClick={() => router.push("/login")}
                            variant="outline"
                            className="w-full border-border/50 hover:bg-card/50"
                        >
                            Back to Login
                        </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/30 text-center">
                        <p className="text-sm text-muted-foreground">
                            Already confirmed?{" "}
                            <Link href="/login" className="text-accent hover:text-accent/80 font-semibold transition-colors">
                                Sign in here
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    )
}
