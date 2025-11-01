"use client"

import ConfirmEmailClient from "./confirm-email-client"

export default function ConfirmEmailPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {

    return (
        <ConfirmEmailClient searchParams={searchParams} />
    )
}
