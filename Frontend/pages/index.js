import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome</h1>
      <div>
        <Link href="/rooms">
          See Rooms
        </Link>
      </div>
      <div>
        <Link href="/admin/createRoom">
          Create New Room
        </Link>
      </div>
    </div>
  );
}
