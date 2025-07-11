export const dynamic = "force-dynamic";

export default async function TestErrorPage() {
  throw new Error("Simulated server error");

  return (
    <div>This won’t render.</div>
  );
}
