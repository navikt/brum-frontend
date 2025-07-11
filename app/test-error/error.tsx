export async function getServerSideProps() {
  throw new Error("Simulated server error");
}

export default function TestErrorPage() {
  return <div>This should never be rendered</div>;
}
