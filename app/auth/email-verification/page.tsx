import EmailVerificationPage from "@/app/auth/email-verification/email-verification";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;

  return <EmailVerificationPage token={params.token ?? null} />;
}
